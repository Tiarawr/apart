<?php

// Test transaction creation dan callback URL
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap/app.php';

// Start Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Http\Kernel')
    ->bootstrap();

use App\Models\Transaction;
use Illuminate\Support\Facades\Log;

echo "=== Testing Transaction Creation and Callback URLs ===\n\n";

// Create a test transaction
$orderId = 'BOOKING-' . time() . '-' . rand(1000, 9999);
echo "Creating test transaction with Order ID: $orderId\n";

try {
    $transaction = Transaction::create([
        'order_id' => $orderId,
        'apartment_id' => 1,
        'customer_name' => 'Test Customer',
        'customer_email' => 'test@example.com',
        'check_in' => '2024-01-15',
        'check_out' => '2024-01-16',
        'nights' => 1,
        'amount' => 150000,
        'payment_method' => 'qris',
        'payment_provider' => null,
        'notes' => 'Test transaction for callback testing',
        'status' => 'pending',
        'booking_data' => [
            'apartment_id' => 1,
            'apartment_name' => 'Test Apartment',
            'guest_name' => 'Test Customer',
            'guest_email' => 'test@example.com',
            'guest_phone' => '081234567890',
            'check_in_date' => '2024-01-15',
            'check_out_date' => '2024-01-16',
            'guests' => 1,
            'duration' => 1,
            'total_price' => 150000,
            'special_requests' => 'Test transaction for callback testing',
            'payment_method' => 'qris',
            'payment_provider' => null,
        ]
    ]);

    echo "✓ Transaction created successfully!\n";
    echo "  - ID: {$transaction->id}\n";
    echo "  - Order ID: {$transaction->order_id}\n";
    echo "  - Status: {$transaction->status}\n\n";

    // Test callback URLs
    echo "Testing callback URLs:\n";
    
    $baseUrl = 'http://localhost:8000';
    $finishUrl = "{$baseUrl}/booking/success?order_id={$orderId}";
    $errorUrl = "{$baseUrl}/booking/error?order_id={$orderId}";
    $pendingUrl = "{$baseUrl}/booking/pending?order_id={$orderId}";
    $detailUrl = "{$baseUrl}/booking/detail/{$orderId}";
    
    echo "  - Finish URL: {$finishUrl}\n";
    echo "  - Error URL: {$errorUrl}\n";
    echo "  - Pending URL: {$pendingUrl}\n";
    echo "  - Detail URL: {$detailUrl}\n\n";
    
    // Test if transaction can be found
    echo "Testing transaction retrieval:\n";
    $foundTransaction = Transaction::where('order_id', $orderId)->first();
    if ($foundTransaction) {
        echo "✓ Transaction found by order_id\n";
        echo "  - Database ID: {$foundTransaction->id}\n";
        echo "  - Order ID: {$foundTransaction->order_id}\n";
        echo "  - Customer: {$foundTransaction->customer_name}\n";
        echo "  - Amount: " . (float)$foundTransaction->amount . "\n";
        echo "  - Status: {$foundTransaction->status}\n";
        
        // Test booking data
        if ($foundTransaction->booking_data) {
            echo "  - Booking data exists: ✓\n";
            $bookingData = $foundTransaction->booking_data;
            echo "    - Apartment: {$bookingData['apartment_name']}\n";
            echo "    - Guest: {$bookingData['guest_name']}\n";
            echo "    - Check-in: {$bookingData['check_in_date']}\n";
            echo "    - Check-out: {$bookingData['check_out_date']}\n";
        } else {
            echo "  - Booking data: ✗ Missing\n";
        }
    } else {
        echo "✗ Transaction NOT found by order_id\n";
    }
    
    echo "\n=== Test completed successfully! ===\n";
    echo "You can now test the callback URLs by visiting:\n";
    echo "  - {$finishUrl}\n";
    echo "  - {$errorUrl}\n";
    echo "  - {$pendingUrl}\n";
    echo "  - {$detailUrl}\n\n";

} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}

?>
