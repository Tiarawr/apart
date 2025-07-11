<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmed;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction as MidtransTransaction;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        try {
            // Log raw request for debugging
            Log::info('Payment API called', [
                'method' => $request->method(),
                'headers' => $request->headers->all(),
                'body' => $request->all(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);

            Log::info('Payment request received', [
                'all_data' => $request->all(),
                'payment_method' => $request->payment_method,
                'payment_provider' => $request->payment_provider,
                'customer_email' => $request->customer_email,
                'customer_email_type' => gettype($request->customer_email)
            ]);

            // Validate request
            $validatedData = $request->validate([
                'apartment_id' => 'required|exists:apartments,id',
                'customer_name' => 'required|string',
                'customer_email' => 'required|email',
                'customer_phone' => 'nullable|string',
                'guests' => 'nullable|integer|min:1',
                'check_in' => 'required|date',
                'check_out' => 'required|date|after:check_in',
                'payment_method' => 'required|in:qris,ewallet,va,cstore,akulaku',
                'payment_provider' => 'nullable|string',
                'amount' => 'required|numeric',
                'nights' => 'required|integer|min:1',
                'notes' => 'nullable|string'
            ]);

            Log::info('Validation passed', $validatedData);

            // Create transaction record
            $orderId = 'BOOKING-' . time() . '-' . rand(1000, 9999);
            $transaction = Transaction::create([
                'order_id' => $orderId,
                'apartment_id' => $validatedData['apartment_id'],
                'customer_name' => $validatedData['customer_name'],
                'customer_email' => $validatedData['customer_email'],
                'check_in' => $validatedData['check_in'],
                'check_out' => $validatedData['check_out'],
                'nights' => $validatedData['nights'],
                'amount' => $validatedData['amount'],
                'payment_method' => $validatedData['payment_method'],
                'payment_provider' => $validatedData['payment_provider'],
                'notes' => $validatedData['notes'],
                'booking_data' => [
                    'apartment_id' => $validatedData['apartment_id'],
                    'apartment_name' => $request->apartment_name ?? 'Apartemen',
                    'guest_name' => $validatedData['customer_name'],
                    'guest_email' => $validatedData['customer_email'],
                    'guest_phone' => $validatedData['customer_phone'] ?? $request->customer_phone ?? 'N/A',
                    'check_in_date' => $validatedData['check_in'],
                    'check_out_date' => $validatedData['check_out'],
                    'guests' => $validatedData['guests'] ?? $request->guests ?? 1,
                    'duration' => $validatedData['nights'],
                    'total_price' => $validatedData['amount'],
                    'special_requests' => $validatedData['notes'],
                    'payment_method' => $validatedData['payment_method'],
                    'payment_provider' => $validatedData['payment_provider'],
                ]
            ]);

            Log::info('Transaction created', ['transaction_id' => $transaction->id]);

            // Prepare booking data for Midtrans
            $bookingData = [
                'totalPrice' => $validatedData['amount'],
                'guest_name' => $validatedData['customer_name'],
                'guest_email' => $validatedData['customer_email'],
                'guest_phone' => $validatedData['customer_phone'] ?? $request->customer_phone ?? 'N/A',
                'apartment_id' => $validatedData['apartment_id'],
                'apartment_name' => $request->apartment_name ?? 'Apartemen',
                'paymentMethod' => $validatedData['payment_method'],
                'paymentProvider' => $validatedData['payment_provider'],
            ];

            Log::info('Booking data prepared', $bookingData);

            // Create Midtrans transaction - setup config and create transaction
            $this->setupMidtransConfig();
            $midtransResult = $this->createBookingTransaction($bookingData, $orderId);

            Log::info('Midtrans result', $midtransResult);

            if ($midtransResult['success']) {
                // Update transaction with snap token
                $transaction->update([
                    'snap_token' => $midtransResult['snap_token'],
                    'midtrans_response' => $midtransResult
                ]);

                return response()->json([
                    'success' => true,
                    'transaction_id' => $transaction->id,
                    'order_id' => $transaction->order_id,
                    'snap_token' => $midtransResult['snap_token'],
                    'redirect_url' => $midtransResult['redirect_url'],
                    'booking_detail_url' => route('booking.detail', $transaction->order_id)
                ]);
            } else {
                Log::error('Midtrans failed', $midtransResult);
                return response()->json([
                    'success' => false,
                    'message' => $midtransResult['error'] ?? 'Payment failed'
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error('Payment creation error', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your payment'
            ], 500);
        }
    }

    public function handleNotification(Request $request)
    {
        Log::info('Midtrans notification received', [
            'all_data' => $request->all(),
            'headers' => $request->headers->all()
        ]);

        $orderId = $request->order_id;
        $statusCode = $request->status_code;
        $grossAmount = $request->gross_amount;
        $serverKey = config('midtrans.server_key');

        // Create signature key
        $signatureKey = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        Log::info('Signature verification', [
            'calculated_signature' => $signatureKey,
            'received_signature' => $request->signature_key,
            'order_id' => $orderId,
            'status_code' => $statusCode,
            'gross_amount' => $grossAmount
        ]);

        // Verify signature
        if ($signatureKey !== $request->signature_key) {
            Log::error('Invalid signature for notification', [
                'order_id' => $orderId,
                'calculated' => $signatureKey,
                'received' => $request->signature_key
            ]);
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // Find transaction
        $transaction = Transaction::where('order_id', $orderId)->first();

        if (!$transaction) {
            Log::error('Transaction not found for notification', ['order_id' => $orderId]);
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // Update transaction status based on Midtrans response
        $transactionStatus = $request->transaction_status;
        $oldStatus = $transaction->status;

        switch ($transactionStatus) {
            case 'capture':
            case 'settlement':
                $transaction->status = 'settlement';

                // Send confirmation email if status changed to settlement
                if ($oldStatus !== 'settlement') {
                    try {
                        Mail::to($transaction->customer_email)->send(new BookingConfirmed($transaction));
                        Log::info('Booking confirmation email sent', [
                            'order_id' => $orderId,
                            'email' => $transaction->customer_email
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Failed to send booking confirmation email', [
                            'order_id' => $orderId,
                            'email' => $transaction->customer_email,
                            'error' => $e->getMessage()
                        ]);
                    }
                }
                break;
            case 'pending':
                $transaction->status = 'pending';
                break;
            case 'deny':
                $transaction->status = 'deny';
                break;
            case 'expire':
                $transaction->status = 'expire';
                break;
            case 'cancel':
                $transaction->status = 'cancel';
                break;
            default:
                $transaction->status = 'failure';
                break;
        }

        $transaction->midtrans_response = $request->all();
        $transaction->save();

        Log::info('Transaction status updated via notification', [
            'order_id' => $orderId,
            'old_status' => $oldStatus,
            'new_status' => $transaction->status,
            'midtrans_status' => $transactionStatus
        ]);

        return response()->json(['message' => 'OK']);
    }

    public function checkStatus(Request $request, $orderId)
    {
        try {
            $transaction = Transaction::where('order_id', $orderId)->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found'
                ], 404);
            }

            // Setup Midtrans config
            $this->setupMidtransConfig();

            // Get transaction status from Midtrans
            $statusResult = $this->getTransactionStatus($orderId);

            // Update local transaction status if successful
            if ($statusResult['success']) {
                $midtransStatus = $statusResult['data'];
                $transactionStatus = is_array($midtransStatus) ? $midtransStatus['transaction_status'] : $midtransStatus->transaction_status;

                switch ($transactionStatus) {
                    case 'capture':
                    case 'settlement':
                        $oldStatus = $transaction->status;
                        $transaction->status = 'settlement';
                        
                        // Send confirmation email if status changed to settlement
                        if ($oldStatus !== 'settlement') {
                            try {
                                Mail::to($transaction->customer_email)->send(new BookingConfirmed($transaction));
                                Log::info('Booking confirmation email sent via status check', [
                                    'order_id' => $transaction->order_id,
                                    'email' => $transaction->customer_email
                                ]);
                            } catch (\Exception $e) {
                                Log::error('Failed to send booking confirmation email via status check', [
                                    'order_id' => $transaction->order_id,
                                    'email' => $transaction->customer_email,
                                    'error' => $e->getMessage()
                                ]);
                            }
                        }
                        break;
                    case 'pending':
                        $transaction->status = 'pending';
                        break;
                    case 'deny':
                        $transaction->status = 'deny';
                        break;
                    case 'expire':
                        $transaction->status = 'expire';
                        break;
                    case 'cancel':
                        $transaction->status = 'cancel';
                        break;
                    default:
                        $transaction->status = 'failure';
                        break;
                }

                $transaction->midtrans_response = is_array($midtransStatus) ? $midtransStatus : (array) $midtransStatus;
                $transaction->save();
            }

            return response()->json([
                'success' => true,
                'transaction' => $transaction,
                'midtrans_data' => $statusResult['success'] ? $statusResult['data'] : null
            ]);
        } catch (\Exception $e) {
            Log::error('Check status error', [
                'message' => $e->getMessage(),
                'order_id' => $orderId
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while checking status'
            ], 500);
        }
    }

    private function setupMidtransConfig()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        // Log configuration for debugging
        Log::info('Midtrans Configuration', [
            'server_key_length' => strlen(Config::$serverKey),
            'is_production' => Config::$isProduction,
            'is_sanitized' => Config::$isSanitized,
            'is_3ds' => Config::$is3ds
        ]);
    }

    private function createBookingTransaction($bookingData, $orderId)
    {
        try {
            $isProduction = config('midtrans.is_production');
            $appUrl = config('app.url');

            $params = [
                'transaction_details' => [
                    'order_id' => $orderId,
                    'gross_amount' => $bookingData['totalPrice'],
                ],
                'customer_details' => [
                    'first_name' => $bookingData['guest_name'],
                    'last_name' => '',
                    'email' => $bookingData['guest_email'],
                    'phone' => $bookingData['guest_phone'],
                ],
                'item_details' => [
                    [
                        'id' => 'apartment-' . $bookingData['apartment_id'],
                        'price' => $bookingData['totalPrice'],
                        'quantity' => 1,
                        'name' => $bookingData['apartment_name'],
                    ]
                ],
                'callbacks' => [
                    'finish' => $appUrl . "/booking/success?order_id={$orderId}",
                    'error' => $appUrl . "/booking/error?order_id={$orderId}",
                    'pending' => $appUrl . "/booking/pending?order_id={$orderId}"
                ],
                'notification_url' => $appUrl . "/api/payment/notification"
            ];

            // Add enabled payments only for sandbox or if specifically configured
            if (!$isProduction || $bookingData['paymentMethod'] !== 'qris') {
                $params['enabled_payments'] = $this->getEnabledPayments($bookingData['paymentMethod'], $bookingData['paymentProvider']);
            }

            Log::info('Midtrans parameters', [
                'params' => $params,
                'payment_method' => $bookingData['paymentMethod'],
                'payment_provider' => $bookingData['paymentProvider'],
                'is_production' => $isProduction,
                'app_url' => $appUrl
            ]);

            $snapToken = Snap::getSnapToken($params);

            return [
                'success' => true,
                'snap_token' => $snapToken,
                'redirect_url' => null
            ];
        } catch (\Exception $e) {
            Log::error('Booking transaction error: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    private function getTransactionStatus($orderId)
    {
        try {
            $status = MidtransTransaction::status($orderId);
            return [
                'success' => true,
                'data' => $status
            ];
        } catch (\Exception $e) {
            Log::error('Get transaction status error: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    private function getEnabledPayments($paymentMethod, $paymentProvider = null)
    {
        $isProduction = config('midtrans.is_production');

        switch ($paymentMethod) {
            case 'qris':
                // Untuk production, gunakan gopay yang support QR
                return ['gopay'];

            case 'ewallet':
                if ($paymentProvider) {
                    return [$paymentProvider];
                }
                // Untuk production, hanya payment methods yang pasti tersedia
                return $isProduction ? ['gopay', 'dana'] : ['gopay', 'shopeepay', 'dana', 'linkaja', 'jenius'];

            case 'va':
                if ($paymentProvider) {
                    return [$paymentProvider];
                }
                // Virtual Account yang tersedia di production
                return ['bca_va', 'bni_va', 'bri_va', 'permata_va', 'echannel'];

            case 'cstore':
                if ($paymentProvider) {
                    return [$paymentProvider];
                }
                return ['alfamart', 'indomaret'];

            case 'akulaku':
                return ['akulaku'];

            default:
                // Untuk production, gunakan payment methods yang pasti tersedia
                if ($isProduction) {
                    return [
                        'gopay',
                        'dana',
                        'bca_va',
                        'bni_va',
                        'bri_va',
                        'permata_va',
                        'echannel',
                        'alfamart',
                        'indomaret'
                    ];
                } else {
                    return [
                        'gopay',
                        'shopeepay',
                        'dana',
                        'linkaja',
                        'bca_va',
                        'bni_va',
                        'bri_va',
                        'mandiri_va',
                        'permata_va',
                        'alfamart',
                        'indomaret',
                        'akulaku'
                    ];
                }
        }
    }

    /**
     * Get redirect URL for a pending payment
     */
    public function getRedirectUrl($orderId)
    {
        try {
            Log::info('Getting redirect URL for order: ' . $orderId);

            // Configure Midtrans
            Config::$serverKey = config('midtrans.server_key');
            Config::$isProduction = config('midtrans.is_production');
            Config::$isSanitized = config('midtrans.is_sanitized');
            Config::$is3ds = config('midtrans.is_3ds');

            // Find the transaction in our database
            $transaction = Transaction::where('order_id', $orderId)->first();
            
            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found'
                ], 404);
            }

            // If transaction is not pending, don't provide redirect URL
            if ($transaction->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction is not pending',
                    'status' => $transaction->status
                ], 400);
            }

            // Check if we have a stored redirect URL
            if (!empty($transaction->redirect_url)) {
                return response()->json([
                    'success' => true,
                    'redirect_url' => $transaction->redirect_url,
                    'source' => 'stored'
                ]);
            }

            // Try to get status from Midtrans to see if we can get redirect URL
            try {
                $status = MidtransTransaction::status($orderId);
                
                Log::info('Midtrans status response for redirect', [
                    'order_id' => $orderId,
                    'status' => $status
                ]);

                // Look for various redirect URL fields in Midtrans response
                $redirectUrl = null;
                
                if (isset($status->actions) && is_array($status->actions)) {
                    foreach ($status->actions as $action) {
                        if (isset($action->url)) {
                            $redirectUrl = $action->url;
                            break;
                        }
                    }
                }
                
                // Alternative fields where redirect URL might be stored
                if (!$redirectUrl && isset($status->redirect_url)) {
                    $redirectUrl = $status->redirect_url;
                }
                
                if (!$redirectUrl && isset($status->payment_url)) {
                    $redirectUrl = $status->payment_url;
                }

                if ($redirectUrl) {
                    // Store the redirect URL in our database for future use
                    $transaction->update(['redirect_url' => $redirectUrl]);
                    
                    return response()->json([
                        'success' => true,
                        'redirect_url' => $redirectUrl,
                        'source' => 'midtrans'
                    ]);
                }

                // If no redirect URL found but transaction is still pending
                return response()->json([
                    'success' => false,
                    'message' => 'No redirect URL available for this transaction',
                    'midtrans_status' => $status->transaction_status ?? 'unknown'
                ], 404);

            } catch (\Exception $midtransError) {
                Log::error('Midtrans error when getting redirect URL', [
                    'order_id' => $orderId,
                    'error' => $midtransError->getMessage()
                ]);

                // If Midtrans call fails, try to create a new payment token
                try {
                    $bookingData = json_decode($transaction->booking_data, true);
                    
                    // Recreate Midtrans transaction
                    $params = [
                        'transaction_details' => [
                            'order_id' => $orderId,
                            'gross_amount' => $transaction->total_amount,
                        ],
                        'customer_details' => [
                            'first_name' => $bookingData['customer_name'] ?? 'Customer',
                            'email' => $bookingData['customer_email'] ?? '',
                            'phone' => $bookingData['customer_phone'] ?? '',
                        ],
                        'item_details' => [
                            [
                                'id' => 'apartment_' . $bookingData['apartment_id'],
                                'price' => $transaction->total_amount,
                                'quantity' => 1,
                                'name' => 'Booking Apartemen - ' . ($bookingData['nights'] ?? 1) . ' malam',
                            ]
                        ],
                    ];

                    $snapToken = Snap::getSnapToken($params);
                    $newRedirectUrl = config('midtrans.snap_url') . '/' . $snapToken;
                    
                    // Update transaction with new redirect URL
                    $transaction->update([
                        'redirect_url' => $newRedirectUrl,
                        'snap_token' => $snapToken
                    ]);

                    return response()->json([
                        'success' => true,
                        'redirect_url' => $newRedirectUrl,
                        'source' => 'regenerated'
                    ]);

                } catch (\Exception $regenerateError) {
                    Log::error('Failed to regenerate payment token', [
                        'order_id' => $orderId,
                        'error' => $regenerateError->getMessage()
                    ]);

                    return response()->json([
                        'success' => false,
                        'message' => 'Unable to get or regenerate payment URL'
                    ], 500);
                }
            }

        } catch (\Exception $e) {
            Log::error('Error getting redirect URL', [
                'order_id' => $orderId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get available payment methods (for frontend)
     */
    public function getPaymentMethods()
    {
        $methods = config('payment_methods');
        return response()->json([
            'success' => true,
            'methods' => $methods,
        ]);
    }
}
