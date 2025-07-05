<?php
require_once 'vendor/autoload.php';

// Load Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check all transactions
$transactions = \App\Models\Transaction::all();

echo "Total transactions: " . $transactions->count() . "\n\n";

foreach ($transactions as $transaction) {
    echo "Order ID: " . $transaction->order_id . "\n";
    echo "Status: " . $transaction->status . "\n";
    echo "Amount: " . $transaction->amount . "\n";
    echo "Created: " . $transaction->created_at . "\n";
    echo "Updated: " . $transaction->updated_at . "\n";
    
    // Check if booking data exists
    if ($transaction->booking_data) {
        echo "Booking data exists: Yes\n";
        echo "Guest name: " . ($transaction->booking_data['guest_name'] ?? 'N/A') . "\n";
        echo "Guest phone: " . ($transaction->booking_data['guest_phone'] ?? 'N/A') . "\n";
    } else {
        echo "Booking data exists: No\n";
    }
    
    echo str_repeat('-', 50) . "\n";
}
