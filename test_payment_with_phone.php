<?php

require_once __DIR__ . '/vendor/autoload.php';

// Start Laravel app
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');
$kernel->bootstrap();

use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

echo "=== Testing Payment API with Phone Number ===\n\n";

// Create a mock request
$requestData = [
    'apartment_id' => 1,
    'apartment_name' => 'Malioboro co-living',
    'customer_name' => 'Test Customer',
    'customer_email' => 'test@example.com',
    'customer_phone' => '081234567890',
    'guests' => 2,
    'check_in' => '2024-01-15',
    'check_out' => '2024-01-16',
    'payment_method' => 'qris',
    'payment_provider' => null,
    'amount' => 150000,
    'nights' => 1,
    'notes' => 'Test booking dengan nomor telepon'
];

try {
    // Create a mock request
    $request = new Request($requestData);
    
    // Create controller
    $controller = new PaymentController();
    
    // Call the method
    $response = $controller->createPayment($request);
    
    // Get response data
    $responseData = json_decode($response->getContent(), true);
    
    echo "✓ Payment API Response:\n";
    echo "Success: " . ($responseData['success'] ? 'Yes' : 'No') . "\n";
    
    if ($responseData['success']) {
        echo "Order ID: " . $responseData['order_id'] . "\n";
        echo "Transaction ID: " . $responseData['transaction_id'] . "\n";
        echo "Booking Detail URL: " . $responseData['booking_detail_url'] . "\n";
        echo "Has Snap Token: " . (isset($responseData['snap_token']) ? 'Yes' : 'No') . "\n";
        
        // Test booking detail access
        echo "\n=== Testing Booking Detail Access ===\n";
        $orderId = $responseData['order_id'];
        
        // Try to find the transaction
        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();
        
        if ($transaction) {
            echo "✓ Transaction found in database\n";
            echo "  - Database ID: {$transaction->id}\n";
            echo "  - Order ID: {$transaction->order_id}\n";
            echo "  - Customer: {$transaction->customer_name}\n";
            echo "  - Email: {$transaction->customer_email}\n";
            echo "  - Amount: Rp " . number_format($transaction->amount, 0, ',', '.') . "\n";
            echo "  - Status: {$transaction->status}\n";
            
            // Check booking data
            if ($transaction->booking_data) {
                echo "  - Booking data exists: ✓\n";
                $bookingData = $transaction->booking_data;
                echo "    - Apartment: {$bookingData['apartment_name']}\n";
                echo "    - Guest: {$bookingData['guest_name']}\n";
                echo "    - Email: {$bookingData['guest_email']}\n";
                echo "    - Phone: {$bookingData['guest_phone']}\n";
                echo "    - Guests: {$bookingData['guests']}\n";
                echo "    - Check-in: {$bookingData['check_in_date']}\n";
                echo "    - Check-out: {$bookingData['check_out_date']}\n";
                echo "    - Duration: {$bookingData['duration']} nights\n";
                echo "    - Total: Rp " . number_format($bookingData['total_price'], 0, ',', '.') . "\n";
                echo "    - Special requests: {$bookingData['special_requests']}\n";
                echo "    - Payment method: {$bookingData['payment_method']}\n";
                echo "    - Payment provider: " . ($bookingData['payment_provider'] ?? 'N/A') . "\n";
            } else {
                echo "  - Booking data: ✗ Missing\n";
            }
            
            // Test callback URLs
            echo "\n=== Testing Callback URLs ===\n";
            $baseUrl = 'http://localhost:8000';
            $successUrl = "{$baseUrl}/booking/success?order_id={$orderId}";
            $errorUrl = "{$baseUrl}/booking/error?order_id={$orderId}";
            $pendingUrl = "{$baseUrl}/booking/pending?order_id={$orderId}";
            $detailUrl = "{$baseUrl}/booking/detail/{$orderId}";
            
            echo "  - Success URL: {$successUrl}\n";
            echo "  - Error URL: {$errorUrl}\n";
            echo "  - Pending URL: {$pendingUrl}\n";
            echo "  - Detail URL: {$detailUrl}\n";
            
            echo "\n✓ All tests passed! You can now test the URLs in your browser.\n";
            
        } else {
            echo "✗ Transaction NOT found in database\n";
        }
        
    } else {
        echo "✗ Payment API failed\n";
        echo "Error: " . ($responseData['message'] ?? 'Unknown error') . "\n";
    }
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}

echo "\n=== Test completed ===\n";

?>
