<?php
require_once 'vendor/autoload.php';

// Load Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Get the specific order ID from command line argument
$orderId = $argv[1] ?? 'BOOKING-1751732167-5504';
$status = $argv[2] ?? 'pending';

echo "Looking for transaction with Order ID: $orderId\n";

// Find the transaction
$transaction = \App\Models\Transaction::where('order_id', $orderId)->first();

if (!$transaction) {
    echo "Transaction not found!\n";
    exit(1);
}

echo "Found transaction:\n";
echo "- ID: " . $transaction->id . "\n";
echo "- Order ID: " . $transaction->order_id . "\n";
echo "- Current Status: " . $transaction->status . "\n";
echo "- Amount: " . $transaction->amount . "\n";

// Update status
$transaction->status = $status;
$transaction->save();

echo "\nTransaction updated successfully!\n";
echo "- New Status: " . $transaction->status . "\n";
echo "- Updated At: " . $transaction->updated_at . "\n";

echo "\nYou can now view the booking detail at:\n";
echo "http://localhost:8000/booking/detail/$orderId\n";
