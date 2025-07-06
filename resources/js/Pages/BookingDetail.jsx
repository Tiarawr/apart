import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Header from '../Components/Header';

export default function BookingDetail() {
    const { props } = usePage();
    const { booking, transaction, error } = props;
    const [paymentStatus, setPaymentStatus] = useState(transaction?.status || 'pending');
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Function to refresh status from Midtrans
    const refreshStatus = async () => {
        if (!transaction?.order_id) return;
        
        setIsRefreshing(true);
        try {
            const response = await fetch(`/api/payment/status/${transaction.order_id}`);
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
            console.error('Error refreshing status:', error);
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
        if (paymentStatus === 'pending') {
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
                                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-red-800">Terjadi Kesalahan</h1>
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
                                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-yellow-800">Booking Tidak Ditemukan</h1>
                                <p className="text-yellow-600 mt-1">Data booking tidak ditemukan. Mungkin pembayaran belum diproses atau terjadi kesalahan.</p>
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
    const isNewPendingTransaction = paymentStatus === 'pending' && 
        transaction?.created_at && 
        new Date(transaction.created_at).getTime() > (Date.now() - 5 * 60 * 1000); // 5 menit terakhir

    const getStatusColor = (status) => {
        switch (status) {
            case 'settlement':
            case 'capture':
                return 'bg-green-50 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            case 'deny':
            case 'cancel':
            case 'expire':
                return 'bg-red-50 text-red-800 border-red-200';
            default:
                return 'bg-gray-50 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'settlement':
            case 'capture':
                return 'Pembayaran Berhasil';
            case 'pending':
                return 'Menunggu Pembayaran';
            case 'deny':
                return 'Pembayaran Ditolak';
            case 'cancel':
                return 'Pembayaran Dibatalkan';
            case 'expire':
                return 'Pembayaran Kadaluarsa';
            default:
                return 'Status Tidak Diketahui';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'settlement':
            case 'capture':
                return (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'pending':
                return (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Detail Pemesanan" />
            <div className="no-print">
                <Header />
            </div>
            
            <div className="max-w-4xl mx-auto px-4 py-8 pt-24 print-container">
                {/* Print-Optimized Voucher - Hidden on screen, visible when printing */}
                <div className="hidden print:block print-voucher">
                    {/* Voucher Header */}
                    <div className="print-header">
                        <div className="print-logo">LILO APART</div>
                        <div className="print-title">VOUCHER PEMESANAN</div>
                        <div className="text-sm">Order ID: {transaction?.order_id || 'N/A'}</div>
                    </div>

                    {/* Status Badge */}
                    {(paymentStatus === 'settlement' || paymentStatus === 'capture') && (
                        <div className="print-status mb-6">
                            ✓ PEMBAYARAN BERHASIL - VOUCHER VALID
                        </div>
                    )}

                    {/* Booking Information */}
                    <div className="print-section">
                        <div className="print-section-title">INFORMASI PEMESANAN</div>
                        <div className="print-info-row">
                            <span className="print-info-label">Apartemen:</span>
                            <span className="print-info-value">{booking?.apartment_name || 'N/A'}</span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">Check-in:</span>
                            <span className="print-info-value">{booking?.check_in_date || 'N/A'}</span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">Check-out:</span>
                            <span className="print-info-value">{booking?.check_out_date || 'N/A'}</span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">Durasi:</span>
                            <span className="print-info-value">{booking?.duration || 'N/A'} malam</span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">Jumlah Tamu:</span>
                            <span className="print-info-value">{booking?.guests || 'N/A'} orang</span>
                        </div>
                    </div>

                    {/* Guest Information */}
                    <div className="print-section">
                        <div className="print-section-title">INFORMASI TAMU</div>
                        <div className="print-info-row">
                            <span className="print-info-label">Nama:</span>
                            <span className="print-info-value">{booking?.guest_name || 'N/A'}</span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">Email:</span>
                            <span className="print-info-value">{booking?.guest_email || 'N/A'}</span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">No. Telepon:</span>
                            <span className="print-info-value">{booking?.guest_phone || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="print-section">
                        <div className="print-section-title">INFORMASI PEMBAYARAN</div>
                        <div className="print-info-row">
                            <span className="print-info-label">Metode Pembayaran:</span>
                            <span className="print-info-value">
                                {transaction?.payment_method ? 
                                    transaction.payment_method.toUpperCase() + 
                                    (transaction?.payment_provider ? ` - ${transaction.payment_provider.toUpperCase()}` : '') 
                                    : 'N/A'
                                }
                            </span>
                        </div>
                        <div className="print-info-row">
                            <span className="print-info-label">Status Pembayaran:</span>
                            <span className="print-info-value">{getStatusText(paymentStatus)}</span>
                        </div>
                        <div className="print-total mt-4">
                            TOTAL: Rp {booking?.total_price?.toLocaleString('id-ID') || 'N/A'}
                        </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="print-qr">
                        <div className="text-center">
                            <div className="font-bold mb-2">KODE VOUCHER</div>
                            <div className="font-mono text-lg border p-3 inline-block">
                                {transaction?.order_id || 'N/A'}
                            </div>
                            <div className="text-xs mt-2">Tunjukkan kode ini saat check-in</div>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="print-footer">
                        <div className="font-bold mb-2">SYARAT DAN KETENTUAN</div>
                        <div className="text-left text-xs space-y-1">
                            <div>• Voucher ini valid sesuai tanggal check-in yang tertera</div>
                            <div>• Tunjukkan voucher ini beserta identitas diri saat check-in</div>
                            <div>• Check-in dimulai pukul 14:00, check-out maksimal pukul 12:00</div>
                            <div>• Untuk pertanyaan hubungi customer service kami</div>
                        </div>
                        <div className="mt-4 text-center font-bold">
                            Terima kasih telah memilih Lilo Apart!
                        </div>
                    </div>
                </div>

                {/* Regular Screen Content */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Detail Pemesanan
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Order ID: <span className="font-mono font-semibold text-gray-900">{transaction?.order_id || 'N/A'}</span>
                            </p>
                        </div>
                        <div className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold border-2 ${getStatusColor(paymentStatus)}`}>
                            {getStatusIcon(paymentStatus)}
                            {getStatusText(paymentStatus)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Booking & Guest Info */}
                    <div className="space-y-6">
                        {/* Booking Details */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Informasi Pemesanan
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Apartemen:</span>
                                    <span className="font-semibold text-gray-900">{booking?.apartment_name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Check-in:</span>
                                    <span className="font-semibold text-gray-900">{booking?.check_in_date || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Check-out:</span>
                                    <span className="font-semibold text-gray-900">{booking?.check_out_date || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Durasi:</span>
                                    <span className="font-semibold text-gray-900">{booking?.duration || 'N/A'} malam</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Jumlah Tamu:</span>
                                    <span className="font-semibold text-gray-900">{booking?.guests || 'N/A'} orang</span>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <span className="text-gray-600">Total Harga:</span>
                                    <span className="font-bold text-green-600 text-lg">
                                        Rp {booking?.total_price?.toLocaleString('id-ID') || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Guest Details */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Informasi Tamu
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Nama:</span>
                                    <span className="font-semibold text-gray-900">{booking?.guest_name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-semibold text-gray-900">{booking?.guest_email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">No. Telepon:</span>
                                    <span className="font-semibold text-gray-900">{booking?.guest_phone || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Permintaan Khusus:</span>
                                    <span className="font-semibold text-gray-900">{booking?.special_requests || 'Tidak ada'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Info */}
                    <div className="space-y-6">
                        {/* Payment Details */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Informasi Pembayaran
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Metode Pembayaran:</span>
                                    <span className="font-semibold text-gray-900">
                                        {transaction?.payment_method ? 
                                            transaction.payment_method.toUpperCase() + 
                                            (transaction.payment_provider ? ` (${transaction.payment_provider})` : '') 
                                            : 'N/A'
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tanggal Pembayaran:</span>
                                    <span className="font-semibold text-gray-900">
                                        {transaction?.created_at ? 
                                            new Date(transaction.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'N/A'
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <span className="text-gray-600">Total Pembayaran:</span>
                                    <span className="font-bold text-green-600 text-lg">
                                        Rp {transaction?.amount?.toLocaleString('id-ID') || 'N/A'}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-gray-600">Transaction ID:</span>
                                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                        <code className="text-sm font-mono text-gray-900">
                                            {transaction?.order_id || 'N/A'}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Messages */}
                        {paymentStatus === 'settlement' || paymentStatus === 'capture' ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">
                                            Pembayaran berhasil! Voucher Anda siap digunakan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : paymentStatus === 'pending' ? (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-yellow-800">
                                            Menunggu pembayaran. Status akan diperbarui otomatis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">
                                            Pembayaran gagal atau dibatalkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 no-print">
                            <Link 
                                href="/" 
                                className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Kembali ke Beranda
                            </Link>
                            {(paymentStatus === 'settlement' || paymentStatus === 'capture') && (
                                <button 
                                    onClick={() => window.print()}
                                    className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors print-show"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14H4v-2h1v2zm1 0v2h6v-2H6zm9 0h1v-2h-1v2z" clipRule="evenodd" />
                                    </svg>
                                    Cetak Voucher
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}