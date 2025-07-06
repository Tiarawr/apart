import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import {
    ArrowLeft,
    Smartphone,
    Clock,
    CheckCircle2,
    ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function EWallet() {
    const [bookingData, setBookingData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit dalam detik
    const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, success, expired

    useEffect(() => {
        // Ambil data booking dari localStorage
        const savedBookingData = localStorage.getItem("bookingData");
        if (savedBookingData) {
            setBookingData(JSON.parse(savedBookingData));
        }
    }, []);

    // Simulasi data dari query params
    const bookingId =
        new URLSearchParams(window.location.search).get("booking_id") ||
        "12345";
    const provider = bookingData?.paymentProvider || "gopay";
    const amount = bookingData?.totalPrice || 475000;

    const providerNames = {
        gopay: "GoPay",
        ovo: "OVO",
        dana: "DANA",
        shopeepay: "ShopeePay",
        linkaja: "LinkAja",
    };

    const providerApps = {
        gopay: "Gojek",
        ovo: "OVO",
        dana: "DANA",
        shopeepay: "Shopee",
        linkaja: "LinkAja",
    };

    const providerName = providerNames[provider] || providerNames.gopay;
    const appName = providerApps[provider] || providerApps.gopay;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    setPaymentStatus("expired");
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Simulasi pembayaran berhasil setelah 8 detik (untuk demo)
        const successTimer = setTimeout(() => {
            setPaymentStatus("success");
        }, 12000);

        return () => {
            clearInterval(timer);
            clearTimeout(successTimer);
        };
    }, []);

    // Manual success trigger untuk testing
    const simulateSuccess = () => {
        setPaymentStatus("success");
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const openApp = () => {
        // Simulasi membuka aplikasi e-wallet
        alert(`Membuka aplikasi ${appName}...`);
        // Di implementasi nyata, ini akan membuka deep link ke aplikasi
        // window.location.href = `${provider}://payment?amount=${amount}&merchant=liloapart`;
    };

    if (paymentStatus === "success") {
        return (
            <>
                <Head title="Pembayaran Berhasil - Lilo Apart" />
                <div
                    className="min-h-screen bg-gray-50 font-['Poppins']"
                    data-theme="light"
                >
                    <Header auth={auth} />

                    <div className="px-4 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[800px] mx-auto">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2
                                    size={40}
                                    className="text-green-600"
                                />
                            </div>

                            <h1 className="text-2xl font-bold text-black mb-4">
                                Pembayaran Berhasil!
                            </h1>

                            <p className="text-gray-600 mb-6">
                                Terima kasih! Pembayaran Anda telah berhasil
                                diproses.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            ID Booking
                                        </p>
                                        <p className="font-semibold text-black">
                                            {bookingId}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Total Pembayaran
                                        </p>
                                        <p className="font-semibold text-black">
                                            {formatCurrency(amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Metode Pembayaran
                                        </p>
                                        <p className="font-semibold text-black">
                                            {providerName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Status
                                        </p>
                                        <p className="font-semibold text-green-600">
                                            Berhasil
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/apartments"
                                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (paymentStatus === "expired") {
        return (
            <>
                <Head title="Pembayaran Kadaluarsa - Lilo Apart" />
                <div
                    className="min-h-screen bg-gray-50 font-['Poppins']"
                    data-theme="light"
                >
                    <Header auth={auth} />

                    <div className="px-4 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[800px] mx-auto">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock size={40} className="text-red-600" />
                            </div>

                            <h1 className="text-2xl font-bold text-black mb-4">
                                Pembayaran Kadaluarsa
                            </h1>

                            <p className="text-gray-600 mb-6">
                                Maaf, waktu pembayaran telah habis. Silakan
                                ulangi proses booking.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/apartments"
                                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Booking Ulang
                                </Link>
                                <Link
                                    href="/apartments"
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`Pembayaran ${providerName} - Lilo Apart`} />
            <div
                className="min-h-screen bg-gray-50 font-['Poppins']"
                data-theme="light"
            >
                <Header auth={auth} />

                <div className="px-4 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[800px] mx-auto">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href="/apartments"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Kembali ke Beranda
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Smartphone
                                    size={32}
                                    className="text-gray-600"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-black mb-2">
                                Pembayaran {providerName}
                            </h1>
                            <p className="text-gray-600">
                                Lanjutkan pembayaran melalui aplikasi {appName}
                            </p>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <Clock size={20} className="text-orange-600" />
                            <span className="text-orange-700 font-medium">
                                Waktu tersisa: {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* Open App Button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={openApp}
                                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg"
                            >
                                <Smartphone size={24} />
                                Buka Aplikasi {appName}
                                <ExternalLink size={20} />
                            </button>
                            <p className="text-sm text-gray-600 mt-3">
                                Klik tombol di atas untuk membuka aplikasi dan
                                melanjutkan pembayaran
                            </p>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="font-semibold text-black mb-4">
                                Detail Pembayaran
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        ID Booking
                                    </span>
                                    <span className="font-medium text-black">
                                        {bookingId}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Metode Pembayaran
                                    </span>
                                    <span className="font-medium text-black">
                                        {providerName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Harga Kamar
                                    </span>
                                    <span className="font-medium text-black">
                                        Rp 450.000
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Biaya Layanan
                                    </span>
                                    <span className="font-medium text-black">
                                        Rp 25.000
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-black">
                                            Total Pembayaran
                                        </span>
                                        <span className="font-semibold text-black text-lg">
                                            {formatCurrency(amount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="font-semibold text-black mb-3">
                                Cara Pembayaran:
                            </h3>
                            <ol className="space-y-2 text-sm text-gray-700">
                                <li>
                                    1. Klik tombol "Buka Aplikasi {appName}" di
                                    atas
                                </li>
                                <li>2. Login ke akun {providerName} Anda</li>
                                <li>3. Periksa detail transaksi pembayaran</li>
                                <li>
                                    4. Pastikan saldo mencukupi untuk pembayaran
                                </li>
                                <li>
                                    5. Konfirmasi pembayaran dengan PIN atau
                                    biometrik
                                </li>
                                <li>
                                    6. Tunggu notifikasi pembayaran berhasil
                                </li>
                            </ol>

                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <strong>Catatan:</strong> Jika tombol tidak
                                    bekerja, buka aplikasi {appName} secara
                                    manual dan cari menu pembayaran/transfer.
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span className="text-gray-700 font-medium">
                                    Menunggu pembayaran...
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Halaman akan otomatis diperbarui setelah
                                pembayaran berhasil
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
