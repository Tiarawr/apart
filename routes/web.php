<?php

use App\Http\Controllers\ApartmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

// Debug route for Railway deployment
Route::get('/debug-config', function () {
    return response()->json([
        'app_env' => config('app.env'),
        'app_debug' => config('app.debug'),
        'database_connection' => config('database.default'),
        'midtrans_merchant_id' => config('midtrans.merchant_id') ? 'SET' : 'NOT SET',
        'midtrans_client_key' => config('midtrans.client_key') ? 'SET' : 'NOT SET',
        'midtrans_server_key' => config('midtrans.server_key') ? 'SET' : 'NOT SET',
        'midtrans_is_production' => config('midtrans.is_production'),
        'cache_store' => config('cache.default'),
        'session_driver' => config('session.driver'),
    ]);
});

Route::get('/', function () {
    $apartments = \App\Models\Apartment::with('reviews')->get();
    
    foreach ($apartments as $apartment) {
        $apartment->reviews_count = $apartment->reviews->count();
        $apartment->rating = $apartment->reviews->avg('rating') ?: 4.5; // Default rating if no reviews
    }

    return Inertia::render('Welcome', [
        'apartments' => $apartments
    ]);
});

Route::get('/random', function () {
    return Inertia::render('RandomContent');
})->name('random');

// Apartment routes
Route::get('/apartments', [ApartmentController::class, 'index'])->name('apartments');
Route::get('/apartments/{id}', [ApartmentController::class, 'show'])->name('apartment.detail');

// API routes for apartments
Route::get('/api/apartments', [ApartmentController::class, 'api'])->name('api.apartments');
Route::get('/api/apartments/{id}', [ApartmentController::class, 'apiShow'])->name('api.apartment.show');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/booking/{id?}', function ($id = null) {
    $apartment = null;
    if ($id) {
        $apartment = \App\Models\Apartment::with('reviews')->find($id);
        if ($apartment) {
            // Hitung jumlah ulasan dan rating rata-rata
            $apartment->reviews_count = $apartment->reviews->count();
            $apartment->rating = $apartment->reviews->avg('rating') ?: 4.5; // Default rating if no reviews
        }
    }

    return Inertia::render('Booking', [
        'apartment' => $apartment,
        'checkIn' => request('checkIn'),
        'checkOut' => request('checkOut'),
    ]);
})->name('booking');

// Payment routes
Route::get('/payment/qris', function () {
    return Inertia::render('Payment/QRIS');
})->name('payment.qris');

Route::get('/payment/va', function () {
    return Inertia::render('Payment/VirtualAccount');
})->name('payment.va');

Route::get('/payment/ewallet', function () {
    return Inertia::render('Payment/EWallet');
})->name('payment.ewallet');

// Payment result pages
Route::get('/payment/success', function () {
    $orderId = request('order_id');
    $transaction = null;
    
    if ($orderId) {
        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();
    }
    
    return Inertia::render('Payment/Success', [
        'transaction' => $transaction,
        'orderId' => $orderId
    ]);
})->name('payment.success');

Route::get('/payment/pending', function () {
    $orderId = request('order_id');
    $transaction = null;
    
    if ($orderId) {
        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();
    }
    
    return Inertia::render('Payment/Pending', [
        'transaction' => $transaction,
        'orderId' => $orderId
    ]);
})->name('payment.pending');

Route::get('/payment/error', function () {
    $orderId = request('order_id');
    $transaction = null;
    
    if ($orderId) {
        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();
    }
    
    return Inertia::render('Payment/Error', [
        'transaction' => $transaction,
        'orderId' => $orderId
    ]);
})->name('payment.error');

// Booking detail page - hanya untuk pembayaran yang berhasil atau untuk monitoring status
Route::get('/booking/detail/{orderId}', function ($orderId) {
    try {
        Log::info('Accessing booking detail', ['order_id' => $orderId]);
        
        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();
        
        if (!$transaction) {
            Log::error('Transaction not found', ['order_id' => $orderId]);
            
            // Check if this is a valid order ID format
            if (preg_match('/^BOOKING-\d+-\d+$/', $orderId)) {
                // Valid format but not found in database
                return Inertia::render('BookingDetail', [
                    'booking' => null,
                    'transaction' => null,
                    'error' => 'Transaksi tidak ditemukan. Mungkin pembayaran belum diproses atau terjadi kesalahan.'
                ]);
            } else {
                // Invalid format
                abort(404, 'Format Order ID tidak valid');
            }
        }
        
        Log::info('Transaction found', ['transaction_id' => $transaction->id, 'status' => $transaction->status]);
        
        // Decode booking data from transaction
        $booking = $transaction->booking_data;
        
        return Inertia::render('BookingDetail', [
            'booking' => $booking,
            'transaction' => $transaction,
            'error' => null
        ]);
    } catch (\Exception $e) {
        Log::error('Error in booking detail route', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        
        return Inertia::render('BookingDetail', [
            'booking' => null,
            'transaction' => null,
            'error' => 'Terjadi kesalahan saat memuat detail booking. Silakan coba lagi.'
        ]);
    }
})->name('booking.detail');

// Callback routes from Midtrans
Route::get('/booking/success', function () {
    $orderId = request('order_id');
    if ($orderId) {
        return redirect()->route('booking.detail', $orderId);
    }
    return redirect()->route('payment.success');
})->name('booking.success');

Route::get('/booking/error', function () {
    $orderId = request('order_id');
    if ($orderId) {
        return redirect()->route('booking.detail', $orderId);
    }
    return redirect('/');
})->name('booking.error');

Route::get('/booking/pending', function () {
    $orderId = request('order_id');
    if ($orderId) {
        return redirect()->route('booking.detail', $orderId);
    }
    return redirect()->route('payment.pending');
})->name('booking.pending');

// Test payment page
Route::get('/test-payment', function () {
    return view('test-payment');
})->name('test.payment');

// Test callback page
Route::get('/test-callback', function () {
    return view('test-callback');
})->name('test.callback');

// Test payment with phone page
Route::get('/test-payment-phone', function () {
    return view('test-payment-phone');
})->name('test.payment.phone');

// Test payment with phone page
Route::get('/test-payment-phone', function () {
    return view('test-payment-phone');
})->name('test.payment.phone');

// Test booking form page
Route::get('/test-booking-form', function () {
    return view('test-booking-form');
})->name('test.booking.form');

// Authentication routes removed - keeping it simple

require __DIR__.'/auth.php';
