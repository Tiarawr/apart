import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../../Components/Header';

export default function PaymentError({ transaction, orderId }) {
    return (
        <>
            <Head title="Pembayaran Gagal" />
            <Header />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        {/* Error Icon */}
                        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Pembayaran Gagal
                        </h1>
                        
                        <p className="text-gray-600 mb-6">
                            Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi atau gunakan metode pembayaran lain.
                        </p>
                        
                        {orderId && (
                            <p className="text-sm text-gray-500 mb-8">
                                Order ID: {orderId}
                            </p>
                        )}
                        
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="font-medium text-red-800 mb-2">
                                    Kemungkinan Penyebab:
                                </h3>
                                <ul className="text-sm text-red-700 space-y-1">
                                    <li>• Saldo tidak mencukupi</li>
                                    <li>• Koneksi internet bermasalah</li>
                                    <li>• Kartu/akun tidak valid</li>
                                    <li>• Transaksi ditolak oleh bank</li>
                                </ul>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/apartments"
                                    className="btn btn-outline"
                                >
                                    Pilih Apartemen Lain
                                </Link>
                                <button 
                                    onClick={() => window.history.back()}
                                    className="btn btn-primary"
                                >
                                    Coba Lagi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
