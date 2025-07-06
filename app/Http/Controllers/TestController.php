<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MidtransService;
use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    public function testPayment(Request $request)
    {
        try {
            Log::info('Test payment endpoint called');

            // Test Midtrans config
            $serverKey = config('midtrans.server_key');
            $clientKey = config('midtrans.client_key');
            $isProduction = config('midtrans.is_production');

            Log::info('Midtrans config', [
                'server_key' => $serverKey ? 'Set' : 'Not set',
                'client_key' => $clientKey ? 'Set' : 'Not set',
                'is_production' => $isProduction
            ]);

            if (!$serverKey || !$clientKey) {
                return response()->json([
                    'success' => false,
                    'message' => 'Midtrans configuration not set properly'
                ], 500);
            }

            // Test import Midtrans classes
            try {
                \Midtrans\Config::$serverKey = $serverKey;
                \Midtrans\Config::$isProduction = $isProduction;
                \Midtrans\Config::$isSanitized = true;
                \Midtrans\Config::$is3ds = true;

                Log::info('Midtrans Config set successfully');

                // Test basic transaction params
                $params = [
                    'transaction_details' => [
                        'order_id' => 'TEST-' . time(),
                        'gross_amount' => 100000,
                    ],
                    'customer_details' => [
                        'first_name' => 'Test',
                        'email' => 'test@example.com',
                    ],
                    'item_details' => [
                        [
                            'id' => 'test_item',
                            'price' => 100000,
                            'quantity' => 1,
                            'name' => 'Test Item',
                        ]
                    ]
                ];

                Log::info('Transaction params prepared', $params);

                // Test Snap token creation
                $snapToken = \Midtrans\Snap::getSnapToken($params);
                Log::info('Snap token created', ['token' => $snapToken]);

                return response()->json([
                    'success' => true,
                    'message' => 'Test completed successfully',
                    'snap_token' => $snapToken,
                    'config' => [
                        'server_key' => $serverKey ? 'Set' : 'Not set',
                        'client_key' => $clientKey ? 'Set' : 'Not set',
                        'is_production' => $isProduction
                    ]
                ]);
            } catch (\Exception $midtransError) {
                Log::error('Midtrans error', [
                    'message' => $midtransError->getMessage(),
                    'trace' => $midtransError->getTraceAsString()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Midtrans error: ' . $midtransError->getMessage(),
                    'line' => $midtransError->getLine(),
                    'file' => $midtransError->getFile()
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Test payment error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }
}
