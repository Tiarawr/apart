import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import { ArrowLeft, Building2, Clock, CheckCircle2, Copy } from "lucide-react";
import { useState, useEffect } from "react";

export default function VirtualAccount() {
    const [bookingData, setBookingData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 jam dalam detik
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
    const provider = bookingData?.paymentProvider || "bca";
    const amount = bookingData?.totalPrice || 475000;

    // Virtual Account Number berdasarkan provider
    const vaNumbers = {
        bca: "7777812345678901",
        mandiri: "8888812345678901",
        bni: "9999812345678901",
        bri: "6666812345678901",
        permata: "5555812345678901",
    };

    const providerNames = {
        bca: "BCA",
        mandiri: "Mandiri",
        bni: "BNI",
        bri: "BRI",
        permata: "Permata",
    };

    const vaNumber = vaNumbers[provider] || vaNumbers.bca;
    const providerName = providerNames[provider] || providerNames.bca;

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

        // Simulasi pembayaran berhasil setelah 10 detik (untuk demo)
        const successTimer = setTimeout(() => {
            setPaymentStatus("success");
        }, 10000);

        return () => {
            clearInterval(timer);
            clearTimeout(successTimer);
        };
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Nomor Virtual Account berhasil disalin!");
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
                                            Virtual Account {providerName}
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
            <Head
                title={`Pembayaran Virtual Account ${providerName} - Lilo Apart`}
            />
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
                                <Building2
                                    size={32}
                                    className="text-gray-600"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-black mb-2">
                                Virtual Account {providerName}
                            </h1>
                            <p className="text-gray-600">
                                Transfer ke nomor Virtual Account di bawah
                            </p>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <Clock size={20} className="text-orange-600" />
                            <span className="text-orange-700 font-medium">
                                Waktu tersisa: {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* Virtual Account Number */}
                        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">
                                    Nomor Virtual Account
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                    <p className="text-2xl font-mono font-bold text-black tracking-wider">
                                        {vaNumber}
                                    </p>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(vaNumber)
                                        }
                                        className="p-2 text-gray-500 hover:text-black transition-colors"
                                        title="Salin nomor"
                                    >
                                        <Copy size={20} />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Klik ikon untuk menyalin nomor
                                </p>
                            </div>
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
                                    <span className="text-gray-600">Bank</span>
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
                            <div className="space-y-4 text-sm text-gray-700">
                                <div>
                                    <p className="font-medium text-black mb-2">
                                        Melalui ATM {providerName}:
                                    </p>
                                    <ol className="space-y-1 ml-4">
                                        <li>1. Masukkan kartu ATM dan PIN</li>
                                        <li>2. Pilih menu "Transfer"</li>
                                        <li>3. Pilih "Virtual Account"</li>
                                        <li>
                                            4. Masukkan nomor Virtual Account:{" "}
                                            <span className="font-mono font-bold">
                                                {vaNumber}
                                            </span>
                                        </li>
                                        <li>
                                            5. Masukkan nominal:{" "}
                                            <span className="font-bold">
                                                {formatCurrency(amount)}
                                            </span>
                                        </li>
                                        <li>6. Konfirmasi pembayaran</li>
                                    </ol>
                                </div>

                                <div>
                                    <p className="font-medium text-black mb-2">
                                        Melalui Internet Banking:
                                    </p>
                                    <ol className="space-y-1 ml-4">
                                        <li>
                                            1. Login ke internet banking{" "}
                                            {providerName}
                                        </li>
                                        <li>2. Pilih menu "Transfer"</li>
                                        <li>3. Pilih "Virtual Account"</li>
                                        <li>
                                            4. Masukkan nomor Virtual Account
                                            dan nominal
                                        </li>
                                        <li>
                                            5. Konfirmasi dengan token/SMS OTP
                                        </li>
                                    </ol>
                                </div>
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
