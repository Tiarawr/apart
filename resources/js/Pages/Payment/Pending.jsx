import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../../Components/Header';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function PaymentPending() {
    const [isChecking, setIsChecking] = useState(false);
    const [orderID, setOrderID] = useState('');
    const [lastChecked, setLastChecked] = useState(null);

    useEffect(() => {
        // Get order_id from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('order_id');
        if (orderId) {
            setOrderID(orderId);
        }
    }, []);

    const checkPaymentStatus = async (showAlert = true) => {
        if (!orderID) {
            if (showAlert) alert('Order ID tidak ditemukan');
            return false;
        }

        setIsChecking(true);
        setLastChecked(new Date());
        
        try {
            const response = await fetch(`/api/payment/status/${orderID}`);
            const data = await response.json();
            
            if (data.success && data.transaction) {
                if (data.transaction.status === 'settlement') {
                    if (showAlert) alert('Pembayaran berhasil! Anda akan diarahkan ke halaman booking detail.');
                    window.location.href = `/booking/detail/${orderID}`;
                    return true;
                } else if (data.transaction.status === 'pending') {
                    if (showAlert) alert('Pembayaran masih dalam proses. Silakan coba lagi nanti.');
                    return false;
                } else {
                    if (showAlert) alert('Status pembayaran: ' + data.transaction.status);
                    window.location.href = `/payment/error?order_id=${orderID}`;
                    return true;
                }
            } else {
                if (showAlert) alert('Gagal mengecek status pembayaran');
                return false;
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            if (showAlert) alert('Terjadi kesalahan saat mengecek status pembayaran');
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
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                            
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
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
