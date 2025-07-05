<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    public function __construct()
    {
        // Set your Merchant Server Key
        Config::$serverKey = config('midtrans.server_key');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        Config::$isProduction = config('midtrans.is_production');
        // Set sanitization on (default)
        Config::$isSanitized = config('midtrans.is_sanitized');
        // Set 3DS transaction for credit card to true
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createTransaction($params)
    {
        try {
            // Log untuk debugging
            Log::info('Creating Midtrans transaction', $params);

            $snapToken = Snap::getSnapToken($params);

            Log::info('Midtrans snap token created', ['snap_token' => $snapToken]);

            return [
                'success' => true,
                'snap_token' => $snapToken,
                'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/' . $snapToken
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans transaction failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function getTransactionStatus($orderId)
    {
        try {
            $status = Transaction::status($orderId);
            return [
                'success' => true,
                'data' => $status
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function createBookingTransaction($bookingData)
    {
        $orderId = 'BOOKING-' . time() . '-' . rand(1000, 9999);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $bookingData['totalPrice'],
            ],
            'customer_details' => [
                'first_name' => $bookingData['name'],
                'email' => $bookingData['email'],
            ],
            'item_details' => [
                [
                    'id' => $bookingData['apartment']['id'],
                    'price' => $bookingData['apartment']['price'],
                    'quantity' => $bookingData['nights'],
                    'name' => $bookingData['apartment']['name'] . ' (' . $bookingData['nights'] . ' malam)',
                ],
                [
                    'id' => 'service_fee',
                    'price' => 25000,
                    'quantity' => 1,
                    'name' => 'Biaya Layanan',
                ]
            ]
        ];

        // Konfigurasi payment method yang benar
        if ($bookingData['paymentMethod'] === 'qris') {
            // Untuk QRIS, tidak gunakan enabled_payments sama sekali
            // Biarkan Midtrans menampilkan semua payment methods yang tersedia
            Log::info('QRIS payment - no enabled_payments restriction (show all available)');
        } else {
            $enabledPayments = $this->getEnabledPayments($bookingData['paymentMethod'], $bookingData['paymentProvider']);
            $params['enabled_payments'] = $enabledPayments;
            Log::info('Specific payment method', [
                'method' => $bookingData['paymentMethod'],
                'provider' => $bookingData['paymentProvider'],
                'enabled_payments' => $enabledPayments
            ]);
        }

        // Log untuk debugging
        Log::info('Creating booking transaction', [
            'order_id' => $orderId,
            'payment_method' => $bookingData['paymentMethod'],
            'payment_provider' => $bookingData['paymentProvider'],
            'amount' => $bookingData['totalPrice']
        ]);

        // Log parameter yang dikirim ke Midtrans
        Log::info('Midtrans parameters', $params);

        return $this->createTransaction($params);
    }

    private function getEnabledPayments($paymentMethod, $paymentProvider = null)
    {
        switch ($paymentMethod) {
            case 'qris':
                // Untuk QRIS, return array kosong (tidak akan digunakan)
                return [];
            case 'ewallet':
                return $this->getEwalletPayments($paymentProvider);
            case 'va':
                return $this->getVAPayments($paymentProvider);
            case 'cstore':
                return $this->getCstorePayments($paymentProvider);
            case 'akulaku':
                return ['akulaku'];
            default:
                // Default: payment methods yang tersedia
                return ['gopay', 'dana', 'bca_va', 'bni_va', 'bri_va', 'permata_va', 'echannel', 'indomaret', 'alfamart', 'akulaku'];
        }
    }

    private function getEwalletPayments($provider)
    {
        $payments = [];
        switch ($provider) {
            case 'gopay':
                $payments[] = 'gopay';
                break;
            case 'dana':
                $payments[] = 'dana';
                break;
            case 'shopeepay':
                // ShopeePay channel tidak tersedia di sandbox, fallback ke gopay
                $payments[] = 'gopay';
                break;
            case 'ovo':
                // OVO channel tidak tersedia di sandbox, fallback ke gopay
                $payments[] = 'gopay';
                break;
            case 'linkaja':
                // LinkAja channel tidak tersedia di sandbox, fallback ke gopay
                $payments[] = 'gopay';
                break;
            default:
                // Default: semua e-wallet yang tersedia
                $payments = ['gopay', 'dana'];
        }
        return $payments;
    }

    private function getVAPayments($provider)
    {
        $payments = [];
        switch ($provider) {
            case 'bca':
                $payments[] = 'bca_va';
                break;
            case 'mandiri_bill':
                $payments[] = 'echannel';
                break;
            case 'bni':
                $payments[] = 'bni_va';
                break;
            case 'bri':
                $payments[] = 'bri_va';
                break;
            case 'permata':
                $payments[] = 'permata_va';
                break;
            default:
                // Hanya channels yang tersedia di sandbox
                $payments = ['bca_va', 'bni_va', 'bri_va', 'permata_va', 'echannel'];
        }
        return $payments;
    }

    private function getCstorePayments($provider)
    {
        $payments = [];
        switch ($provider) {
            case 'alfamart':
                $payments[] = 'alfamart';
                break;
            case 'indomaret':
                $payments[] = 'indomaret';
                break;
            default:
                $payments = ['alfamart', 'indomaret'];
        }
        return $payments;
    }

    public function cancelTransaction($orderId)
    {
        $cancel = Transaction::cancel($orderId);
        return $cancel;
    }
}
