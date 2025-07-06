import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../../Components/Header';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function PaymentPending() {
    const [isChecking, setIsChecking] = useState(false);
    const [orderID, setOrderID] = useState('');
    const [lastChecked, setLastChecked] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('info'); // 'success', 'error', 'info'
    const [redirectUrl, setRedirectUrl] = useState('');
    const [transactionData, setTransactionData] = useState(null);

    // Function to show minimal alert
    const showMinimalAlert = (message, type = 'info') => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    useEffect(() => {
        // Get order_id from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('order_id');
        if (orderId) {
            setOrderID(orderId);
            // Also get redirect URL for continuing payment
            fetchRedirectUrl(orderId);
        }
    }, []);

    // Function to get redirect URL from Midtrans
    const fetchRedirectUrl = async (orderId) => {
        try {
            // First try to get status which might include redirect URL
            const statusResponse = await fetch(`/api/payment/status/${orderId}`);
            const statusData = await statusResponse.json();
            
            if (statusData.success && statusData.transaction) {
                setTransactionData(statusData.transaction);
                
                // Try to get redirect URL from transaction data or metadata
                if (statusData.transaction.redirect_url) {
                    setRedirectUrl(statusData.transaction.redirect_url);
                    return;
                } else if (statusData.transaction.payment_url) {
                    setRedirectUrl(statusData.transaction.payment_url);
                    return;
                } else if (statusData.transaction.metadata && statusData.transaction.metadata.redirect_url) {
                    setRedirectUrl(statusData.transaction.metadata.redirect_url);
                    return;
                }
            }

            // If no redirect URL from status, try the dedicated redirect endpoint
            const redirectResponse = await fetch(`/api/payment/redirect/${orderId}`);
            const redirectData = await redirectResponse.json();
            
            if (redirectData.success && redirectData.redirect_url) {
                setRedirectUrl(redirectData.redirect_url);
            }
        } catch (error) {
            console.error('Error fetching redirect URL:', error);
        }
    };

    // Function to continue payment - try to get fresh redirect URL
    const continuePayment = async () => {
        if (redirectUrl) {
            // If we already have redirect URL, use it
            window.open(redirectUrl, '_blank');
            return;
        }

        // If no redirect URL, try to get a fresh one from API
        try {
            const response = await fetch(`/api/payment/redirect/${orderID}`);
            const data = await response.json();
            
            if (data.success && data.redirect_url) {
                window.open(data.redirect_url, '_blank');
            } else {
                showMinimalAlert('Tidak dapat menemukan link pembayaran. Silakan ganti metode pembayaran.', 'error');
            }
        } catch (error) {
            console.error('Error getting payment redirect:', error);
            showMinimalAlert('Gagal mendapatkan link pembayaran. Silakan coba ganti metode pembayaran.', 'error');
        }
    };

    // Function to change payment method
    const changePaymentMethod = () => {
        if (transactionData && transactionData.booking_data) {
            // Redirect back to booking with same data to choose different payment method
            const bookingData = transactionData.booking_data;
            const params = new URLSearchParams({
                apartment_id: bookingData.apartment_id,
                checkIn: bookingData.check_in_date,
                checkOut: bookingData.check_out_date,
                guests: bookingData.guests,
                // Add other necessary parameters
            });
            
            window.location.href = `/booking/${bookingData.apartment_id}?${params.toString()}`;
        } else {
            // Fallback to main booking page
            window.location.href = '/booking';
        }
    };

    const checkPaymentStatus = async (showAlert = true) => {
        if (!orderID) {
            if (showAlert) showMinimalAlert('Order ID tidak ditemukan', 'error');
            return false;
        }

        setIsChecking(true);
        setLastChecked(new Date());
        
        try {
            const response = await fetch(`/api/payment/status/${orderID}`);
            const data = await response.json();
            
            if (data.success && data.transaction) {
                if (data.transaction.status === 'settlement') {
                    if (showAlert) {
                        showMinimalAlert('Pembayaran berhasil! Mengarahkan ke halaman booking...', 'success');
                        setTimeout(() => {
                            window.location.href = `/booking/detail/${orderID}`;
                        }, 1500);
                    } else {
                        window.location.href = `/booking/detail/${orderID}`;
                    }
                    return true;
                } else if (data.transaction.status === 'pending') {
                    if (showAlert) showMinimalAlert('Pembayaran masih dalam proses. Silakan coba lagi nanti.', 'info');
                    return false;
                } else {
                    if (showAlert) {
                        showMinimalAlert(`Status pembayaran: ${data.transaction.status}`, 'error');
                        setTimeout(() => {
                            window.location.href = `/payment/error?order_id=${orderID}`;
                        }, 1500);
                    } else {
                        window.location.href = `/payment/error?order_id=${orderID}`;
                    }
                    return true;
                }
            } else {
                if (showAlert) showMinimalAlert('Gagal mengecek status pembayaran', 'error');
                return false;
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            if (showAlert) showMinimalAlert('Terjadi kesalahan saat mengecek status pembayaran', 'error');
            return false;
        } finally {
            setIsChecking(false);
        }
    };

    // Auto-polling when component mounts
    useEffect(() => {
        if (!orderID) return;

        // Check immediately
        checkPaymentStatus(false);

        // Then check every 5 seconds for 2 minutes
        const quickInterval = setInterval(() => {
            checkPaymentStatus(false);
        }, 5000);

        // After 2 minutes, switch to every 15 seconds
        const slowTimeout = setTimeout(() => {
            clearInterval(quickInterval);
            const slowInterval = setInterval(() => {
                checkPaymentStatus(false);
            }, 15000);

            // Stop after 10 minutes total
            setTimeout(() => {
                clearInterval(slowInterval);
            }, 480000); // 8 more minutes
        }, 120000); // 2 minutes

        return () => {
            clearInterval(quickInterval);
            clearTimeout(slowTimeout);
        };
    }, [orderID]);

    return (
        <>
            <Head title="Menunggu Pembayaran - Lilo Apart" />
            
            {/* Minimal Alert Popup */}
            {showAlert && (
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    <div className="absolute top-4 right-4 pointer-events-auto">
                        <div className={`rounded-lg p-4 shadow-xl border-2 transition-all duration-300 transform animate-in slide-in-from-top-2 ${
                            alertType === 'success' ? 'bg-green-50 border-green-300 text-green-800' :
                            alertType === 'error' ? 'bg-red-50 border-red-300 text-red-800' :
                            'bg-blue-50 border-blue-300 text-blue-800'
                        }`} style={{ minWidth: '300px' }}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {alertType === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                    {alertType === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                                    {alertType === 'info' && <RefreshCw className="w-5 h-5 text-blue-600" />}
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium">{alertMessage}</p>
                                </div>
                                <div className="ml-3">
                                    <button
                                        onClick={() => setShowAlert(false)}
                                        className="inline-flex rounded-md p-1 hover:bg-gray-200 focus:outline-none transition-colors"
                                    >
                                        <span className="text-lg font-bold">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="min-h-screen bg-gray-50 font-['Poppins']">
                <Header />
                
                <div className="max-w-2xl mx-auto pt-24 p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Clock className="w-8 h-8 text-yellow-600" />
                            </div>
                        </div>
                        
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Menunggu Pembayaran
                        </h1>
                        
                        <p className="text-gray-600 mb-6">
                            Pembayaran Anda sedang diproses. Status akan otomatis diperbarui 
                            setelah pembayaran berhasil (mengecek setiap 5 detik).
                        </p>
                        
                        {orderID && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-sm font-medium text-blue-800">Opsi Pembayaran</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Klik "Bayar Sekarang" untuk melanjutkan pembayaran di Midtrans, atau pilih "Ganti Metode Pembayaran" untuk mengubah cara bayar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {lastChecked && (
                            <div className="bg-blue-50 rounded-lg p-3 mb-6">
                                <p className="text-sm text-blue-700">
                                    <RefreshCw className="w-4 h-4 inline mr-1" />
                                    Terakhir dicek: {lastChecked.toLocaleTimeString('id-ID')}
                                </p>
                            </div>
                        )}
                        
                        {orderID && (
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600 mb-1">Order ID:</p>
                                <p className="font-mono text-sm font-semibold text-gray-800">{orderID}</p>
                            </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => checkPaymentStatus(true)}
                                disabled={isChecking}
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isChecking ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Mengecek Status...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Cek Status Manual
                                    </>
                                )}
                            </button>
                            
                            {orderID && (
                                <button
                                    onClick={continuePayment}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Bayar Sekarang
                                </button>
                            )}
                            
                            <button
                                onClick={changePaymentMethod}
                                className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                                Ganti Metode Pembayaran
                            </button>
                            
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Kembali ke Beranda
                            </Link>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Jika pembayaran sudah selesai tetapi status belum berubah, 
                                silakan tunggu beberapa menit atau hubungi customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
