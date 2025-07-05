import { Head, Link } from "@inertiajs/react";
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
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Booking({ apartment, checkIn, checkOut }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        note: "",
        paymentMethod: "",
        paymentProvider: "",
    });

    const [currentStep, setCurrentStep] = useState(1);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get tomorrow's date in YYYY-MM-DD format
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    // Calculate number of nights
    const calculateNights = () => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
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
        const date = new Date(dateString);
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
    };

    const paymentMethods = [
        {
            id: "credit_card",
            name: "Credit Card",
            description: "Bayar dengan kartu kredit",
        },
        {
            id: "paypal",
            name: "Paypal",
            description: "Bayar dengan PayPal",
        },
        {
            id: "apple_pay",
            name: "Apple Pay",
            description: "Bayar dengan Apple Pay",
        },
        {
            id: "google_pay",
            name: "Google Pay",
            description: "Bayar dengan Google Pay",
        },
    ];

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

        const checkinDate = new Date(formData.checkIn);
        const minCheckout = new Date(checkinDate);
        minCheckout.setDate(minCheckout.getDate() + 1);
        return minCheckout.toISOString().split("T")[0];
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi form
        if (
            !formData.name ||
            !formData.email ||
            !formData.checkIn ||
            !formData.checkOut ||
            !formData.paymentMethod
        ) {
            alert("Mohon lengkapi semua data yang diperlukan");
            return;
        }

        // Simulasi proses booking
        console.log("Booking data:", formData);
        alert("Booking berhasil dibuat!");
    };

    return (
        <>
            <Head
                title={`Booking ${
                    apartmentData.name || "Apartemen"
                } - Lilo Apart`}
            />
            <div
                className="min-h-screen bg-white font-['Poppins']"
                data-theme="light"
            >
                <Header />

                <div className="px-4 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[1440px] mx-auto">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={`/apartments/${apartmentData.id}`}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Kembali ke Detail Apartemen
                        </Link>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center space-x-8">
                            <div
                                className={`flex items-center gap-2 ${
                                    currentStep >= 1
                                        ? "text-black"
                                        : "text-gray-400"
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        currentStep >= 1
                                            ? "bg-black text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    1
                                </div>
                                <span className="font-medium">
                                    Data Pribadi
                                </span>
                            </div>
                            <div
                                className={`w-16 h-0.5 ${
                                    currentStep >= 2
                                        ? "bg-black"
                                        : "bg-gray-200"
                                }`}
                            ></div>
                            <div
                                className={`flex items-center gap-2 ${
                                    currentStep >= 2
                                        ? "text-black"
                                        : "text-gray-400"
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        currentStep >= 2
                                            ? "bg-black text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    2
                                </div>
                                <span className="font-medium">Pembayaran</span>
                            </div>
                            <div
                                className={`w-16 h-0.5 ${
                                    currentStep >= 3
                                        ? "bg-black"
                                        : "bg-gray-200"
                                }`}
                            ></div>
                            <div
                                className={`flex items-center gap-2 ${
                                    currentStep >= 3
                                        ? "text-black"
                                        : "text-gray-400"
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        currentStep >= 3
                                            ? "bg-black text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    3
                                </div>
                                <span className="font-medium">Konfirmasi</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                                <h1 className="text-2xl font-bold text-black mb-6">
                                    Booking Apartemen
                                </h1>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Step 1: Data Pribadi */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <h2 className="text-lg font-semibold text-black mb-4">
                                                Data Pribadi & Tanggal
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nama Lengkap *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={
                                                                formData.name
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            required
                                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                            placeholder="Masukkan nama lengkap"
                                                        />
                                                        <User
                                                            size={18}
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={
                                                                formData.email
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            required
                                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                            placeholder="nama@email.com"
                                                        />
                                                        <Mail
                                                            size={18}
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Check-in *
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            name="checkIn"
                                                            value={
                                                                formData.checkIn
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            min={today}
                                                            required
                                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                        <Calendar
                                                            size={18}
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                                                            value={
                                                                formData.checkOut
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            min={getMinCheckoutDate()}
                                                            required
                                                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                        />
                                                        <Calendar
                                                            size={18}
                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                                                    placeholder="Tambahkan catatan khusus untuk booking Anda (maksimal 200 karakter)"
                                                    maxLength="200"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {formData.note.length}/200
                                                    karakter
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                                >
                                                    Lanjutkan
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Metode Pembayaran */}
                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <h2 className="text-lg font-semibold text-black mb-4">
                                                Pilih Metode Pembayaran
                                            </h2>

                                            <div className="space-y-3">
                                                {paymentMethods.map(
                                                    (method) => (
                                                        <button
                                                            key={method.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        paymentMethod:
                                                                            method.id,
                                                                        paymentProvider:
                                                                            "",
                                                                    })
                                                                );
                                                            }}
                                                            className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-gray-300 ${
                                                                formData.paymentMethod ===
                                                                method.id
                                                                    ? "border-blue-500 bg-blue-50"
                                                                    : "border-gray-200 bg-white"
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        method.name
                                                                    }
                                                                </span>
                                                                <div
                                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                                        formData.paymentMethod ===
                                                                        method.id
                                                                            ? "border-blue-500 bg-blue-500"
                                                                            : "border-gray-300"
                                                                    }`}
                                                                >
                                                                    {formData.paymentMethod ===
                                                                        method.id && (
                                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </button>
                                                    )
                                                )}
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
                                                        !formData.paymentMethod
                                                    }
                                                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                >
                                                    Lanjutkan
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Konfirmasi */}
                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <h2 className="text-lg font-semibold text-black mb-4">
                                                Konfirmasi Booking
                                            </h2>

                                            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
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
                                                        Check-in:{" "}
                                                        {formatDate(
                                                            formData.checkIn
                                                        )}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        Check-out:{" "}
                                                        {formatDate(
                                                            formData.checkOut
                                                        )}
                                                    </p>
                                                    {calculateNights() > 0 && (
                                                        <p className="text-gray-600">
                                                            Jumlah malam:{" "}
                                                            {calculateNights()}{" "}
                                                            malam
                                                        </p>
                                                    )}
                                                </div>

                                                {formData.note && (
                                                    <div>
                                                        <h3 className="font-semibold text-black mb-2">
                                                            Catatan
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {formData.note}
                                                        </p>
                                                    </div>
                                                )}

                                                <div>
                                                    <h3 className="font-semibold text-black mb-2">
                                                        Metode Pembayaran
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {
                                                            paymentMethods.find(
                                                                (m) =>
                                                                    m.id ===
                                                                    formData.paymentMethod
                                                            )?.name
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                                <CheckCircle
                                                    size={20}
                                                    className="text-green-600"
                                                />
                                                <p className="text-sm text-green-700">
                                                    Dengan melanjutkan, Anda
                                                    menyetujui syarat dan
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
                                                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                                                >
                                                    Konfirmasi Booking
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Booking Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-32">
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
                                            <MapPin size={14} />
                                            {apartmentData.location}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <Star
                                                size={14}
                                                className="text-black fill-current"
                                            />
                                            <span>{apartmentData.rating}</span>
                                            <span>
                                                ({apartmentData.reviews} ulasan)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                            <span>Harga per malam</span>
                                            <span>
                                                {formatPrice(
                                                    apartmentData.price ||
                                                        450000
                                                )}
                                            </span>
                                        </div>
                                        {calculateNights() > 0 && (
                                            <>
                                                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                                    <span>Jumlah malam</span>
                                                    <span>
                                                        {calculateNights()}{" "}
                                                        malam
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                                    <span>Subtotal</span>
                                                    <span>
                                                        {formatPrice(
                                                            calculateNights() *
                                                                (apartmentData.price ||
                                                                    450000)
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
                                                    ? formatPrice(
                                                          calculateTotal()
                                                      )
                                                    : formatPrice(
                                                          (apartmentData.price ||
                                                              450000) + 25000
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
