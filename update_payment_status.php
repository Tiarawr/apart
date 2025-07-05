<?php
require_once 'vendor/autoload.php';

// Load Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Get the specific order ID from command line argument
$orderId = $argv[1] ?? 'BOOKING-1751730656-9166';

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
echo "- Guest: " . ($transaction->booking_data['guest_name'] ?? 'N/A') . "\n";

// Update status to settlement (successful payment)
$transaction->status = 'settlement';
$transaction->midtrans_response = [
    'status_code' => '200',
    'status_message' => 'Success, transaction is found',
    'transaction_id' => $transaction->order_id . '-test',
    'order_id' => $transaction->order_id,
    'payment_type' => 'qris',
    'transaction_time' => now()->toISOString(),
    'transaction_status' => 'settlement',
    'fraud_status' => 'accept',
    'gross_amount' => $transaction->amount,
    'currency' => 'IDR'
];
$transaction->save();

echo "\nTransaction updated successfully!\n";
echo "- New Status: " . $transaction->status . "\n";
echo "- Updated At: " . $transaction->updated_at . "\n";

echo "\nYou can now view the booking detail at:\n";
echo "http://localhost:8000/booking/detail/$orderId\n";
