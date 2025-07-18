<?php

use App\Http\Controllers\ApartmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmed;
use App\Models\Transaction;

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

// Test payment API endpoint
Route::get('/test-payment-api', function () {
    try {
        $testPayment = [
            'apartment_id' => 1,
            'customer_name' => 'Test User',
            'customer_email' => 'test@example.com',
            'customer_phone' => '081234567890',
            'guests' => 1,
            'check_in' => '2025-07-07',
            'check_out' => '2025-07-08',
            'payment_method' => 'qris',
            'payment_provider' => 'qris',
            'amount' => 100000,
            'nights' => 1,
            'notes' => 'Test booking'
        ];

        $response = app('App\Http\Controllers\PaymentController')->createPayment(
            new \Illuminate\Http\Request($testPayment)
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Payment API test successful',
            'response' => $response
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
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

// Test booking form page
Route::get('/test-booking-form', function () {
    return view('test-booking-form');
})->name('test.booking.form');

// Test email route
Route::get('/test-email-simple', function () {
    try {
        // Simple test email without PDF first
        Mail::raw('Test email from Lilo Apart', function ($message) {
            $message->to('yumomik@gmail.com')
                    ->subject('Test Email from Lilo Apart')
                    ->from(config('mail.from.address'), config('mail.from.name'));
        });
        
        return response()->json([
            'success' => 'Simple test email sent successfully to yumomik@gmail.com',
            'from' => config('mail.from.address'),
            'from_name' => config('mail.from.name'),
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to send email: ' . $e->getMessage(),
        ], 500);
    }
});

Route::get('/test-email-with-pdf', function () {
    try {
        // Get the latest transaction for testing
        $transaction = Transaction::latest()->first();
        
        if (!$transaction) {
            return response()->json(['error' => 'No transaction found for testing']);
        }
        
        // Send email with PDF attachment to yumomik@gmail.com
        Mail::to('yumomik@gmail.com')->send(new BookingConfirmed($transaction));
        
        return response()->json([
            'success' => 'Email with PDF voucher sent successfully to yumomik@gmail.com',
            'transaction_id' => $transaction->id,
            'order_id' => $transaction->order_id,
            'mail_config' => [
                'driver' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'from_address' => config('mail.from.address'),
                'from_name' => config('mail.from.name'),
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to send email: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Route to test clean email template without PDF
Route::get('/test-email-clean', function () {
    try {
        $transaction = Transaction::latest()->first();
        
        if (!$transaction) {
            return response()->json(['error' => 'No transaction found']);
        }
        
        // Test with clean template but no PDF
        Mail::to('yumomik@gmail.com')->send(new BookingConfirmed($transaction));
        
        return response()->json([
            'success' => 'Clean email sent to yumomik@gmail.com',
            'order_id' => $transaction->order_id
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ], 500);
    }
});

// Debug mail configuration
Route::get('/debug-mail-config', function () {
    return response()->json([
        'mail_driver' => config('mail.default'),
        'mail_host' => config('mail.mailers.smtp.host'),
        'mail_port' => config('mail.mailers.smtp.port'),
        'mail_from_address' => config('mail.from.address'),
        'mail_from_name' => config('mail.from.name'),
        'mail_username' => config('mail.mailers.smtp.username'),
        'mail_encryption' => config('mail.mailers.smtp.encryption'),
        'env_values' => [
            'MAIL_MAILER' => env('MAIL_MAILER'),
            'MAIL_HOST' => env('MAIL_HOST'),
            'MAIL_PORT' => env('MAIL_PORT'),
            'MAIL_FROM_ADDRESS' => env('MAIL_FROM_ADDRESS'),
            'MAIL_FROM_NAME' => env('MAIL_FROM_NAME'),
        ]
    ]);
});

// Test with different mail configuration
Route::get('/test-email-gmail', function () {
    try {
        // Configure Gmail SMTP on the fly
        config([
            'mail.mailers.smtp.host' => 'smtp.gmail.com',
            'mail.mailers.smtp.port' => 587,
            'mail.mailers.smtp.encryption' => 'tls',
            'mail.mailers.smtp.username' => 'yumomik@gmail.com', // Your Gmail
            'mail.mailers.smtp.password' => 'your-app-password', // Need app password
            'mail.from.address' => 'yumomik@gmail.com',
            'mail.from.name' => 'Lilo Apart Test',
        ]);
        
        Mail::raw('Test email dari Laravel menggunakan Gmail SMTP', function ($message) {
            $message->to('yumomik@gmail.com')
                    ->subject('Test Email via Gmail SMTP');
        });
        
        return response()->json([
            'success' => 'Test email sent via Gmail SMTP to yumomik@gmail.com'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to send email: ' . $e->getMessage()
        ], 500);
    }
});

// Preview email template
Route::get('/preview-email', function () {
    $transaction = \App\Models\Transaction::latest()->first();
    if (!$transaction) {
        return response('No transaction found');
    }
    
    // Return email view directly for preview
    return view('emails.booking-confirmed-clean', ['transaction' => $transaction]);
});

// Test PDF generation
Route::get('/test-pdf', function () {
    try {
        $transaction = Transaction::latest()->first();
        
        if (!$transaction) {
            return response()->json(['error' => 'No transaction found']);
        }
        
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('voucher.booking-voucher-minimal', ['transaction' => $transaction]);
        
        return $pdf->download('test-voucher.pdf');
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'PDF generation failed: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Authentication routes removed - keeping it simple

require __DIR__.'/auth.php';
