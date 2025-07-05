<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TestController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Payment API routes
Route::post('/payment/create', [App\Http\Controllers\PaymentController::class, 'createPayment']);
Route::post('/payment/notification', [App\Http\Controllers\PaymentController::class, 'handleNotification']);
Route::get('/payment/status/{orderId}', [App\Http\Controllers\PaymentController::class, 'checkStatus']);

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API working', 'timestamp' => now()]);
});

// Test QRIS payment
Route::post('/test/qris', function () {
    $midtransService = new App\Services\MidtransService();

    $testData = [
        'apartment' => [
            'id' => 1,
            'name' => 'Test Apartment',
            'price' => 150000,
        ],
        'name' => 'Test User',
        'email' => 'test@example.com',
        'totalPrice' => 175000,
        'nights' => 1,
        'paymentMethod' => 'qris',
        'paymentProvider' => null,
    ];

    $result = $midtransService->createBookingTransaction($testData);

    return response()->json($result);
});

// Test GoPay payment
Route::post('/test/gopay', function () {
    $midtransService = new App\Services\MidtransService();

    $testData = [
        'apartment' => [
            'id' => 1,
            'name' => 'Test Apartment',
            'price' => 150000,
        ],
        'name' => 'Test User',
        'email' => 'test@example.com',
        'totalPrice' => 175000,
        'nights' => 1,
        'paymentMethod' => 'ewallet',
        'paymentProvider' => 'gopay',
    ];

    $result = $midtransService->createBookingTransaction($testData);

    return response()->json($result);
});

// Test route untuk debugging
Route::get('/payment/test', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Payment API is working',
        'timestamp' => now()
    ]);
});

Route::post('/payment/test-create', function (Request $request) {
    try {
        // Test basic validation
        $data = $request->validate([
            'apartment_id' => 'required|integer',
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'amount' => 'required|numeric'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Validation passed',
            'data' => $data
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

Route::get('/payment/test-midtrans', [TestController::class, 'testPayment']);
