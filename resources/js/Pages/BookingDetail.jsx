import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Header from "../Components/Header";

export default function BookingDetail() {
  const { props } = usePage();
  const { booking, transaction, error } = props;
  const [paymentStatus, setPaymentStatus] = useState(
    transaction?.status || "pending"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to format currency properly
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Function to refresh status from Midtrans
  const refreshStatus = async () => {
    if (!transaction?.order_id) return;

    setIsRefreshing(true);
    try {
      const response = await fetch(
        `/api/payment/status/${transaction.order_id}`
      );
      const data = await response.json();

      if (data.success && data.transaction) {
        setPaymentStatus(data.transaction.status);
        // If status changed, reload the page to get updated data
        if (data.transaction.status !== transaction.status) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error refreshing status:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Update paymentStatus ketika transaction berubah
  useEffect(() => {
    if (transaction?.status) {
      setPaymentStatus(transaction.status);
    }
  }, [transaction]);

  useEffect(() => {
    // Auto refresh status dari Midtrans untuk status pending
    if (paymentStatus === "pending") {
      // Polling yang lebih cepat - setiap 5 detik untuk 2 menit pertama
      const quickInterval = setInterval(() => {
        refreshStatus();
      }, 5000);

      // Setelah 2 menit, ganti ke polling 15 detik
      const slowTimeout = setTimeout(() => {
        clearInterval(quickInterval);
        const slowInterval = setInterval(() => {
          refreshStatus();
        }, 15000);

        // Stop polling setelah 10 menit total
        setTimeout(() => {
          clearInterval(slowInterval);
        }, 480000); // 8 menit lagi (total 10 menit)
      }, 120000); // 2 menit

      return () => {
        clearInterval(quickInterval);
        clearTimeout(slowTimeout);
      };
    }
  }, [paymentStatus]);

  // Jika ada error, tampilkan pesan error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head title="Error - Booking Detail" />
        <Header />
        <div className="max-w-4xl mx-auto p-6 pt-24">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-red-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-800">
                  Terjadi Kesalahan
                </h1>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jika tidak ada booking atau transaction
  if (!booking || !transaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head title="Booking Tidak Ditemukan" />
        <Header />
        <div className="max-w-4xl mx-auto p-6 pt-24">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-yellow-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-800">
                  Booking Tidak Ditemukan
                </h1>
                <p className="text-yellow-600 mt-1">
                  Data booking tidak ditemukan. Mungkin pembayaran belum
                  diproses atau terjadi kesalahan.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jika status masih pending dan baru saja dibuat (belum dibayar), tampilkan pesan khusus
  const isNewPendingTransaction =
    paymentStatus === "pending" &&
    transaction?.created_at &&
    new Date(transaction.created_at).getTime() > Date.now() - 5 * 60 * 1000; // 5 menit terakhir

  const getStatusColor = (status) => {
    switch (status) {
      case "settlement":
      case "capture":
        return "bg-green-50 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "deny":
      case "cancel":
      case "expire":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "settlement":
      case "capture":
        return "Pembayaran Berhasil";
      case "pending":
        return "Menunggu Pembayaran";
      case "deny":
        return "Pembayaran Ditolak";
      case "cancel":
        return "Pembayaran Dibatalkan";
      case "expire":
        return "Pembayaran Kadaluarsa";
      default:
        return "Status Tidak Diketahui";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "settlement":
      case "capture":
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Head title="Detail Pemesanan" />
      <Header />

      <div className="max-w-4xl mx-auto p-6 pt-24">
        {/* Regular Screen Content - Minimalist Black & White Design */}
        <div className="bg-white border border-gray-200 mb-8">
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl font-light text-black mb-3 tracking-tight">
                  Detail Pemesanan
                </h1>
                <p className="text-gray-600 text-lg font-mono">
                  {transaction?.order_id || "N/A"}
                </p>
              </div>
              <div
                className={`inline-flex items-center px-6 py-3 text-sm font-medium border ${getStatusColor(
                  paymentStatus
                )}`}
              >
                {getStatusIcon(paymentStatus)}
                {getStatusText(paymentStatus)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Booking & Guest Info */}
          <div className="space-y-8">
            {/* Booking Details */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-light text-black tracking-tight">
                  Informasi Pemesanan
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Apartemen</span>
                  <span className="font-medium text-black">
                    {booking?.apartment_name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Check-in</span>
                  <span className="font-medium text-black">
                    {booking?.check_in_date || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Check-out</span>
                  <span className="font-medium text-black">
                    {booking?.check_out_date || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Durasi</span>
                  <span className="font-medium text-black">
                    {booking?.duration || "N/A"} malam
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Jumlah Tamu</span>
                  <span className="font-medium text-black">
                    {booking?.guests || "N/A"} orang
                  </span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <span className="text-black font-medium">Total Harga</span>
                  <span className="font-medium text-black text-xl">
                    {formatCurrency(booking?.total_price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-light text-black tracking-tight">
                  Informasi Tamu
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Nama</span>
                  <span className="font-medium text-black">
                    {booking?.guest_name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">Email</span>
                  <span className="font-medium text-black">
                    {booking?.guest_email || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">No. Telepon</span>
                  <span className="font-medium text-black">
                    {booking?.guest_phone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 font-light">
                    Permintaan Khusus
                  </span>
                  <span className="font-medium text-black text-right max-w-xs">
                    {booking?.special_requests || "Tidak ada"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Info */}
          <div className="space-y-8">
            {/* Payment Details */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-light text-black tracking-tight">
                  Informasi Pembayaran
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">
                    Metode Pembayaran
                  </span>
                  <span className="font-medium text-black">
                    {transaction?.payment_method
                      ? transaction.payment_method.toUpperCase() +
                        (transaction.payment_provider
                          ? ` (${transaction.payment_provider})`
                          : "")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-light">
                    Tanggal Pembayaran
                  </span>
                  <span className="font-medium text-black">
                    {transaction?.created_at
                      ? new Date(transaction.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <span className="text-black font-medium">
                    Total Pembayaran
                  </span>
                  <span className="font-medium text-black text-xl">
                    {formatCurrency(transaction?.amount)}
                  </span>
                </div>
                <div className="mt-6">
                  <span className="text-gray-600 font-light block mb-2">
                    Transaction ID
                  </span>
                  <div className="p-4 bg-gray-50 border border-gray-200">
                    <code className="text-sm font-mono text-black">
                      {transaction?.order_id || "N/A"}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {paymentStatus === "settlement" || paymentStatus === "capture" ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Pembayaran Berhasil!
                    </h3>
                  </div>
                </div>
              </div>
            ) : paymentStatus === "pending" ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-yellow-600 animate-spin"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Menunggu Pembayaran
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Pembayaran Anda sedang diproses. Status akan diperbarui
                        otomatis.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={refreshStatus}
                        disabled={isRefreshing}
                        className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                      >
                        {isRefreshing ? "Mengecek..." : "Refresh Status"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Pembayaran {getStatusText(paymentStatus)}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Mohon maaf, terjadi masalah dengan pembayaran Anda.
                        Silakan hubungi customer service untuk bantuan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
