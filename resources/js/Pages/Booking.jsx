// Helper to dynamically load Midtrans Snap.js if not present
function loadSnapJs(clientKey) {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve(window.snap);
      return;
    }
    // Prevent duplicate script
    if (document.getElementById('midtrans-snap-js')) {
      // Wait for it to load
      const check = setInterval(() => {
        if (window.snap) {
          clearInterval(check);
          resolve(window.snap);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(check);
        reject(new Error('Snap.js load timeout'));
      }, 5000);
      return;
    }
    const script = document.createElement('script');
    script.id = 'midtrans-snap-js';
    script.type = 'text/javascript';
    script.src =
      (import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true'
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js') +
      `?clientKey=${clientKey}`;
    script.onload = () => {
      if (window.snap) resolve(window.snap);
      else reject(new Error('Snap.js failed to load'));
    };
    script.onerror = () => reject(new Error('Snap.js failed to load'));
    document.body.appendChild(script);
  });
}
import { Head, Link, router } from "@inertiajs/react";
import Header from "@/Components/Header";
import {
  ArrowLeft,
  Building2,
  Smartphone,
  User,
  Mail,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  QrCode,
  ChevronDown,
  ChevronUp,
  Check,
  CreditCard,
  Wallet,
  DollarSign,
  Phone,
  Banknote,
  Car,
  ShoppingBag,
  University,
  Shield,
  Landmark,
  Zap,
  Coins,
  Link as LinkIcon,
} from "lucide-react";

// Map string icon names from backend to Lucide React components
const iconMap = {
  arrowleft: ArrowLeft,
  building2: Building2,
  smartphone: Smartphone,
  user: User,
  mail: Mail,
  calendar: Calendar,
  mappin: MapPin,
  star: Star,
  checkcircle: CheckCircle,
  qrcode: QrCode,
  chevrondown: ChevronDown,
  chevronup: ChevronUp,
  check: Check,
  creditcard: CreditCard,
  wallet: Wallet,
  dollarsign: DollarSign,
  phone: Phone,
  banknote: Banknote,
  car: Car,
  shoppingbag: ShoppingBag,
  university: University,
  shield: Shield,
  landmark: Landmark,
  zap: Zap,
  coins: Coins,
  link: LinkIcon,
};
import { useState, useEffect, useRef } from "react";

export default function Booking({ apartment, checkIn, checkOut }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    note: "",
    paymentMethod: "",
    paymentProvider: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [expandedMethods, setExpandedMethods] = useState({});
  const stepContentRef = useRef(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Scroll ke atas saat step berubah
  useEffect(() => {
    // Scroll ke atas form (universal, mobile & desktop)
    if (stepContentRef.current) {
      stepContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Fallback: scroll window ke atas jika scrollIntoView tidak efektif
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [currentStep]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get tomorrow's date in YYYY-MM-DD format
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Calculate number of nights
  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    // Parse dates properly to avoid timezone issues
    const [checkInYear, checkInMonth, checkInDay] = formData.checkIn.split("-");
    const [checkOutYear, checkOutMonth, checkOutDay] =
      formData.checkOut.split("-");

    const checkInDate = new Date(
      parseInt(checkInYear),
      parseInt(checkInMonth) - 1,
      parseInt(checkInDay)
    );
    const checkOutDate = new Date(
      parseInt(checkOutYear),
      parseInt(checkOutMonth) - 1,
      parseInt(checkOutDay)
    );

    const timeDiff = checkOutDate - checkInDate;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  // Format price helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate total price
  const calculateTotal = () => {
    const nights = calculateNights();
    const pricePerNight = apartmentData?.price || 450000;
    const serviceFee = 25000;
    const subtotal = nights * pricePerNight;
    return subtotal + serviceFee;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Parse date properly to avoid timezone issues
    const [year, month, day] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Default apartment data jika tidak ada dari backend
  const defaultApartmentData = {
    id: 1,
    name: "Malioboro co-living",
    location: "800 m dari Malioboro",
    price: 450000,
    pricePerNight: "per malam",
    rating: 4.8,
    reviews: 127,
    image: "https://placehold.co/800x600/f0f0f0/666666?text=Apartemen",
  };

  const apartmentData = {
    ...defaultApartmentData,
    ...(apartment || {}),
    // Pastikan rating dan reviews count dari data asli
    rating: apartment?.rating || defaultApartmentData.rating,
    reviews:
      apartment?.reviews?.length ||
      apartment?.reviews_count ||
      defaultApartmentData.reviews,
    // Gunakan foto dari database atau fallback
    image:
      apartment?.images?.[0] || apartment?.image || defaultApartmentData.image,
    // Format rating untuk tampilan
    formattedRating: apartment?.rating
      ? parseFloat(apartment.rating).toFixed(1)
      : defaultApartmentData.rating.toFixed(1),
  };

  useEffect(() => {
    fetch("/api/payment/methods")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.methods)) {
          // Map icon string to Lucide component for each method and provider
          const mapped = data.methods.map((method) => {
            const iconKey = (method.icon || "").toLowerCase();
            const icon = iconMap[iconKey] || Wallet; // fallback
            let providers = method.providers;
            if (Array.isArray(providers)) {
              providers = providers.map((provider) => {
                const provIconKey = (provider.icon || "").toLowerCase();
                return {
                  ...provider,
                  icon: iconMap[provIconKey] || Wallet,
                };
              });
            }
            return {
              ...method,
              icon,
              providers,
            };
          });
          setPaymentMethods(mapped);
        }
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Auto-set minimum checkout date when checkin changes
      if (name === "checkIn") {
        const checkinDate = new Date(value);
        const minCheckout = new Date(checkinDate);
        minCheckout.setDate(minCheckout.getDate() + 1);
        const minCheckoutStr = minCheckout.toISOString().split("T")[0];

        // If current checkout is before minimum, reset it
        if (prev.checkOut && prev.checkOut <= value) {
          newData.checkOut = minCheckoutStr;
        }
      }

      return newData;
    });
  };

  // Get minimum checkout date based on checkin
  const getMinCheckoutDate = () => {
    if (!formData.checkIn) return tomorrowStr;

    // Parse date properly to avoid timezone issues
    const [year, month, day] = formData.checkIn.split("-");
    const checkinDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const minCheckout = new Date(checkinDate);
    minCheckout.setDate(minCheckout.getDate() + 1);

    const minYear = minCheckout.getFullYear();
    const minMonth = String(minCheckout.getMonth() + 1).padStart(2, "0");
    const minDay = String(minCheckout.getDate()).padStart(2, "0");

    return `${minYear}-${minMonth}-${minDay}`;
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Validasi email
  const validateEmail = (email) => {
    if (!email) return "Email wajib diisi";
    if (!email.includes("@")) return "Email harus mengandung @";
    return "";
  };

  // Validasi nomor telepon
  const validatePhone = (phone) => {
    if (!phone) return "Nomor telepon wajib diisi";
    if (!phone.startsWith("08")) return "Nomor telepon harus dimulai dengan 08";
    if (phone.length < 10) return "Nomor telepon minimal 10 digit";
    return "";
  };

  // Validasi nama
  const validateName = (name) => {
    if (!name) return "Nama wajib diisi";
    if (name.length < 2) return "Nama minimal 2 karakter";
    return "";
  };

  // Function to check if form is valid
  const isFormValid = () => {
    return (
      validateName(formData.name) === "" &&
      validateEmail(formData.email) === "" &&
      validatePhone(formData.phone) === "" &&
      formData.checkIn &&
      formData.checkOut &&
      formData.paymentMethod &&
      (formData.paymentMethod === "qris" || formData.paymentProvider)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validasi form dasar
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.paymentMethod
    ) {
      setErrorMsg("Mohon lengkapi semua data yang wajib diisi.");
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMsg("Format email tidak valid.");
      return;
    }
    if (!formData.phone.startsWith("08")) {
      setErrorMsg("Nomor telepon harus dimulai dengan 08.");
      return;
    }
    if (
      (formData.paymentMethod === "ewallet" ||
        formData.paymentMethod === "va" ||
        formData.paymentMethod === "cstore") &&
      !formData.paymentProvider
    ) {
      setErrorMsg("Pilih provider pembayaran.");
      return;
    }

    try {
      const paymentData = {
        apartment_id: apartmentData.id,
        apartment_name: apartmentData.name,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        guests: formData.guests,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        payment_method: formData.paymentMethod,
        payment_provider: formData.paymentProvider,
        amount: calculateTotal(),
        nights: calculateNights(),
        notes: formData.note,
      };

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN":
            document
              .querySelector('meta[name="csrf-token"]')
              ?.getAttribute("content") || "",
        },
        body: JSON.stringify(paymentData),
      });

      let result;
      try {
        result = await response.json();
      } catch (err) {
        setErrorMsg("Gagal memproses response server. Silakan coba lagi.");
        return;
      }

      if (!response.ok || !result.success) {
        setErrorMsg(result.message || "Gagal membuat transaksi. Cek data Anda.");
        return;
      }

      // Simpan data booking untuk fallback
      localStorage.setItem(
        "bookingData",
        JSON.stringify({
          ...formData,
          apartment: apartmentData,
          totalPrice: calculateTotal(),
          nights: calculateNights(),
          orderId: result.order_id,
        })
      );

      // Redirect ke Midtrans Snap
      if (result.snap_token) {
        const apiOrderId = result.order_id;
        const checkPaymentStatus = async (orderId) => {
          try {
            const response = await fetch(`/api/payment/status/${orderId}`);
            const data = await response.json();
            if (data.success && data.transaction) {
              if (data.transaction.status === "settlement") {
                window.location.href = `/booking/detail/${orderId}`;
                return true;
              } else if (data.transaction.status === "pending") {
                return false;
              } else {
                window.location.href = `/payment/error?order_id=${orderId}`;
                return true;
              }
            }
            return false;
          } catch (error) {
            console.error("Error checking payment status:", error);
            return false;
          }
        };
        const startStatusPolling = (orderId) => {
          const interval = setInterval(async () => {
            const statusChecked = await checkPaymentStatus(orderId);
            if (statusChecked) {
              clearInterval(interval);
            }
          }, 10000);
          setTimeout(() => {
            clearInterval(interval);
          }, 300000);
        };
        const clientKey =
          import.meta.env.VITE_MIDTRANS_CLIENT_KEY ||
          (window.MIDTRANS_CLIENT_KEY || "Mid-client-NGufRNxUQIK3F8nq");
        loadSnapJs(clientKey)
          .then((snap) => {
            snap.pay(result.snap_token, {
              onSuccess: function (result) {
                window.location.href = `/booking/detail/${
                  result.order_id || apiOrderId
                }`;
              },
              onPending: function (result) {
                startStatusPolling(result.order_id || apiOrderId);
                window.location.href = `/payment/pending?order_id=${
                  result.order_id || apiOrderId
                }`;
              },
              onError: function (result) {
                window.location.href = `/payment/error?order_id=${
                  result.order_id || apiOrderId
                }`;
              },
              onClose: function () {
                window.location.href = `/payment/status?order_id=${apiOrderId}`;
              },
            });
          })
          .catch((err) => {
            setErrorMsg(
              "Gagal memuat pembayaran Midtrans. Silakan coba lagi atau hubungi admin. " +
                err.message
            );
          });
      } else {
        const paymentRoutes = {
          qris: "/payment/qris",
          ewallet: "/payment/ewallet",
          va: "/payment/va",
        };
        router.visit(
          paymentRoutes[formData.paymentMethod] +
            `?order_id=${result.order_id}`
        );
      }
    } catch (error) {
      setErrorMsg(
        error?.message ||
          "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi."
      );
    }
  };

  return (
    <>
      <Head
        title={`Booking ${apartmentData.name || "Apartemen"} - Lilo Apart`}
      />
      <div
        className="min-h-screen bg-white font-['Poppins']"
        data-theme="light"
      >
        <Header />
        <div className="px-4 sm:px-6 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[1440px] mx-auto">
          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <Link
              href={`/apartments/${apartmentData.id}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">
                Kembali ke Detail Apartemen
              </span>
              <span className="sm:hidden">Kembali</span>
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center justify-between sm:justify-center sm:space-x-6 lg:space-x-8 overflow-x-auto px-2 sm:px-4">
              <div
                className={`flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                  currentStep >= 1 ? "text-black" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    currentStep >= 1 ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  <span className="hidden sm:inline">Data</span>
                  <span className="sm:hidden">Data</span>
                </span>
              </div>
              <div
                className={`w-6 sm:w-8 lg:w-12 h-0.5 ${
                  currentStep >= 2 ? "bg-black" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                  currentStep >= 2 ? "text-black" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    currentStep >= 2 ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  <span className="hidden sm:inline">Pembayaran</span>
                  <span className="sm:hidden">Bayar</span>
                </span>
              </div>
              <div
                className={`w-6 sm:w-8 lg:w-12 h-0.5 ${
                  currentStep >= 3 ? "bg-black" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                  currentStep >= 3 ? "text-black" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    currentStep >= 3 ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  3
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  Konfirmasi
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-4 sm:mb-6">
                  Ringkasan Booking
                </h1>

                {/* Animated Step Content */}
                <div ref={stepContentRef} className="relative min-h-[400px]">
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      currentStep === 1
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 -translate-x-10 pointer-events-none absolute top-0 left-0 w-full"
                    }`}
                  >
                    {/* Step 1: Data Pribadi */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-black mb-4">
                          Data Pribadi & Tanggal
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nama Lengkap *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base ${
                                  validateName(formData.name) && formData.name
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200"
                                }`}
                                placeholder="Masukkan nama lengkap"
                              />
                              <User
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              />
                            </div>
                            {validateName(formData.name) && formData.name && (
                              <p className="text-red-500 text-xs mt-1">
                                {validateName(formData.name)}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base ${
                                  validateEmail(formData.email) &&
                                  formData.email
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200"
                                }`}
                                placeholder="nama@email.com"
                              />
                              <Mail
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              />
                            </div>
                            {validateEmail(formData.email) &&
                              formData.email && (
                                <p className="text-red-500 text-xs mt-1">
                                  {validateEmail(formData.email)}
                                </p>
                              )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nomor Telepon *
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base ${
                                  validatePhone(formData.phone) &&
                                  formData.phone
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200"
                                }`}
                                placeholder="08xxxxxxxxxx"
                              />
                              <Phone
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              />
                            </div>
                            {validatePhone(formData.phone) &&
                              formData.phone && (
                                <p className="text-red-500 text-xs mt-1">
                                  {validatePhone(formData.phone)}
                                </p>
                              )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Jumlah Tamu
                            </label>
                            <div className="relative">
                              <select
                                name="guests"
                                value={formData.guests || 1}
                                onChange={handleChange}
                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base appearance-none"
                              >
                                <option value={1}>1 Tamu</option>
                                <option value={2}>2 Tamu</option>
                                <option value={3}>3 Tamu</option>
                                <option value={4}>4 Tamu</option>
                              </select>
                              <User
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Check-in *
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleChange}
                                min={today}
                                required
                                className="w-full p-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base appearance-none date-input"
                                style={{
                                  backgroundImage: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "textfield",
                                }}
                              />
                              <Calendar
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Check-out *
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleChange}
                                min={getMinCheckoutDate()}
                                required
                                className="w-full p-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base appearance-none date-input"
                                style={{
                                  backgroundImage: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "textfield",
                                }}
                              />
                              <Calendar
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Catatan (Opsional)
                          </label>
                          <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-sm md:text-base"
                            placeholder="Tambahkan catatan khusus untuk booking Anda (maksimal 200 karakter)"
                            maxLength="200"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {formData.note.length}/200 karakter
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={nextStep}
                            disabled={
                              !formData.name ||
                              !formData.email ||
                              !formData.phone ||
                              !formData.checkIn ||
                              !formData.checkOut ||
                              validateName(formData.name) ||
                              validateEmail(formData.email) ||
                              validatePhone(formData.phone)
                            }
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                              formData.name &&
                              formData.email &&
                              formData.phone &&
                              formData.checkIn &&
                              formData.checkOut &&
                              !validateName(formData.name) &&
                              !validateEmail(formData.email) &&
                              !validatePhone(formData.phone)
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            Lanjutkan
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      currentStep === 2
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 translate-x-10 pointer-events-none absolute top-0 left-0 w-full"
                    }`}
                  >
                    {/* Step 2: Metode Pembayaran */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-black mb-4">
                          Pilih Metode Pembayaran
                        </h2>

                        <div className="space-y-4">
                          {paymentMethods.map((method) => (
                            <div key={method.id} className="space-y-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    paymentMethod: method.id,
                                    paymentProvider: method.providers
                                      ? ""
                                      : method.id,
                                  }));

                                  // Toggle expansion for methods with providers
                                  if (method.providers) {
                                    setExpandedMethods((prev) => ({
                                      ...prev,
                                      [method.id]: !prev[method.id],
                                    }));
                                  }
                                }}
                                className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-gray-300 ${
                                  formData.paymentMethod === method.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <method.icon
                                        size={18}
                                        className="text-gray-600"
                                      />
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-900 block">
                                        {method.name}
                                      </span>
                                      <span className="text-sm text-gray-600">
                                        {method.description}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {method.providers && (
                                      <ChevronDown
                                        size={16}
                                        className={`text-gray-400 transition-transform ${
                                          expandedMethods[method.id]
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                      />
                                    )}
                                    {!method.providers &&
                                      formData.paymentMethod === method.id && (
                                        <Check
                                          size={16}
                                          className="text-blue-500"
                                        />
                                      )}
                                  </div>
                                </div>
                              </button>

                              {/* Sub-options untuk E-Wallet dan VA */}
                              {formData.paymentMethod === method.id &&
                                method.providers &&
                                expandedMethods[method.id] && (
                                  <div className="ml-6 pl-4 border-l-2 border-gray-100 space-y-2">
                                    <div className="text-sm text-gray-600 mb-2">
                                      Pilih provider:
                                    </div>
                                    {method.providers.map((provider) => (
                                      <button
                                        key={provider.id}
                                        type="button"
                                        onClick={() => {
                                          setFormData((prev) => ({
                                            ...prev,
                                            paymentProvider: provider.id,
                                          }));
                                        }}
                                        className={`w-full p-3 border rounded-lg text-left transition-all hover:border-gray-300 ${
                                          formData.paymentProvider ===
                                          provider.id
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 bg-white"
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <div
                                              className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                                provider.bgColor ||
                                                "bg-gray-100"
                                              }`}
                                            >
                                              <provider.icon
                                                size={14}
                                                className={
                                                  provider.color ||
                                                  "text-gray-600"
                                                }
                                              />
                                            </div>
                                            <span className="font-medium text-gray-900">
                                              {provider.name}
                                            </span>
                                          </div>
                                          <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                              formData.paymentProvider ===
                                              provider.id
                                                ? "border-blue-500 bg-blue-500"
                                                : "border-gray-300"
                                            }`}
                                          >
                                            {formData.paymentProvider ===
                                              provider.id && (
                                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            )}
                                          </div>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                          >
                            Kembali
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            disabled={
                              !formData.paymentMethod ||
                              ((formData.paymentMethod === "ewallet" ||
                                formData.paymentMethod === "va") &&
                                !formData.paymentProvider)
                            }
                            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Lanjutkan
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      currentStep === 3
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 translate-x-10 pointer-events-none absolute top-0 left-0 w-full"
                    }`}
                  >
                    {/* Step 3: Konfirmasi */}
                    {currentStep === 3 && (
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold text-black mb-4">
                          Konfirmasi Booking
                        </h2>
                        {errorMsg && (
                          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                            {errorMsg}
                          </div>
                        )}

                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                          {/* Foto Apartemen */}
                          <div>
                            <h3 className="font-semibold text-black mb-2">
                              Detail Apartemen
                            </h3>
                            <div className="flex gap-4">
                              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={apartmentData.image}
                                  alt={apartmentData.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-black mb-1">
                                  {apartmentData.name}
                                </h4>
                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                                  <MapPin size={12} />
                                  {apartmentData.location}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Star
                                    size={12}
                                    className="text-yellow-500 fill-current"
                                  />
                                  <span>{apartmentData.formattedRating}</span>
                                  <span>({apartmentData.reviews} ulasan)</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-black mb-2">
                              Data Pribadi
                            </h3>
                            <p className="text-gray-600">
                              Nama: {formData.name}
                            </p>
                            <p className="text-gray-600">
                              Email: {formData.email}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-black mb-2">
                              Tanggal
                            </h3>
                            <p className="text-gray-600">
                              Check-in: {formatDate(formData.checkIn)}
                            </p>
                            <p className="text-gray-600">
                              Check-out: {formatDate(formData.checkOut)}
                            </p>
                            {calculateNights() > 0 && (
                              <p className="text-gray-600">
                                Jumlah malam: {calculateNights()} malam
                              </p>
                            )}
                          </div>

                          {formData.note && (
                            <div>
                              <h3 className="font-semibold text-black mb-2">
                                Catatan
                              </h3>
                              <p className="text-gray-600">{formData.note}</p>
                            </div>
                          )}

                          <div>
                            <h3 className="font-semibold text-black mb-2">
                              Metode Pembayaran
                            </h3>
                            <div className="flex items-center gap-2">
                              {(() => {
                                const selectedMethod = paymentMethods.find(
                                  (m) => m.id === formData.paymentMethod
                                );
                                const selectedProvider =
                                  selectedMethod?.providers?.find(
                                    (p) => p.id === formData.paymentProvider
                                  );

                                return (
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <selectedMethod.icon
                                        size={14}
                                        className="text-gray-600"
                                      />
                                    </div>
                                    <span>{selectedMethod?.name}</span>
                                    {selectedProvider && (
                                      <>
                                        <span>-</span>
                                        <div
                                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                            selectedProvider.bgColor ||
                                            "bg-gray-100"
                                          }`}
                                        >
                                          <selectedProvider.icon
                                            size={14}
                                            className={
                                              selectedProvider.color ||
                                              "text-gray-600"
                                            }
                                          />
                                        </div>
                                        <span>{selectedProvider.name}</span>
                                      </>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle size={20} className="text-green-600" />
                          <p className="text-sm text-green-700">
                            Dengan melanjutkan, Anda menyetujui syarat dan
                            ketentuan yang berlaku.
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                          >
                            Kembali
                          </button>
                          <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                              isFormValid()
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            Konfirmasi Booking
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm lg:sticky lg:top-32">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Ringkasan Booking
                </h3>

                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={apartmentData.image}
                      alt={apartmentData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-black mb-2">
                      {apartmentData.name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span className="truncate">{apartmentData.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star
                        size={14}
                        className="text-yellow-500 fill-current flex-shrink-0"
                      />
                      <span className="font-medium">
                        {apartmentData.formattedRating}
                      </span>
                      <span>({apartmentData.reviews} ulasan)</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <span>Harga per malam</span>
                      <span>{formatPrice(apartmentData.price || 450000)}</span>
                    </div>
                    {calculateNights() > 0 && (
                      <>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                          <span>Jumlah malam</span>
                          <span>{calculateNights()} malam</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                          <span>Subtotal</span>
                          <span>
                            {formatPrice(
                              calculateNights() *
                                (apartmentData.price || 450000)
                            )}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <span>Biaya layanan</span>
                      <span>Rp 25.000</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold text-black pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>
                        {calculateNights() > 0
                          ? formatPrice(calculateTotal())
                          : formatPrice(
                              (apartmentData.price || 450000) + 25000
                            )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
