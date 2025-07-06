import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import { ArrowLeft, QrCode, Clock, CheckCircle2, Copy } from "lucide-react";
import { useState, useEffect } from "react";

export default function QRIS() {
    const [bookingData, setBookingData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit dalam detik
    const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, success, expired
    const [qrCodeUrl] = useState(
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126580014ID.CO.QRIS.WWW0118ID10200000000000000215ID20200000000000303UMI51440014ID.CO.QRIS.WWW0118ID10200000000000000215ID20200000000000303UMI5204539953033605802ID5910LILO APART6007JAKARTA61051234862070703A0163046D7A"
    );

    useEffect(() => {
        // Ambil data booking dari localStorage
        const savedBookingData = localStorage.getItem("bookingData");
        if (savedBookingData) {
            setBookingData(JSON.parse(savedBookingData));
        }
    }, []);

    // Simulasi data booking dari query params
    const bookingId =
        new URLSearchParams(window.location.search).get("booking_id") ||
        "12345";
    const amount = bookingData?.totalPrice || 475000;

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
        const successTimer = setTimeout(() => {
            setPaymentStatus("success");
        }, 10000);

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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Nomor pembayaran berhasil disalin!");
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
                                            QRIS
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
            <Head title="Pembayaran QRIS - Lilo Apart" />
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
                                <QrCode size={32} className="text-gray-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-black mb-2">
                                Pembayaran QRIS
                            </h1>
                            <p className="text-gray-600">
                                Scan QR Code di bawah untuk melakukan pembayaran
                            </p>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <Clock size={20} className="text-orange-600" />
                            <span className="text-orange-700 font-medium">
                                Waktu tersisa: {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* QR Code */}
                        <div className="text-center mb-8">
                            <div className="inline-block p-6 bg-white border-2 border-gray-200 rounded-lg">
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code Pembayaran"
                                    className="w-64 h-64 mx-auto"
                                />
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
                                    <span className="text-gray-600">
                                        Metode Pembayaran
                                    </span>
                                    <span className="font-medium text-black">
                                        QRIS
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
                                    1. Buka aplikasi e-wallet atau mobile
                                    banking yang mendukung QRIS
                                </li>
                                <li>
                                    2. Pilih menu "Scan QR" atau "Bayar dengan
                                    QRIS"
                                </li>
                                <li>3. Arahkan kamera ke QR Code di atas</li>
                                <li>
                                    4. Periksa detail pembayaran dan konfirmasi
                                </li>
                                <li>
                                    5. Masukkan PIN untuk menyelesaikan
                                    pembayaran
                                </li>
                            </ol>
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

                            {/* Tombol Testing - Hapus di production */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-2">
                                    Mode Testing:
                                </p>
                                <button
                                    onClick={simulateSuccess}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                >
                                    Simulasi Pembayaran Sukses
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
