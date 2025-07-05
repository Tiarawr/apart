<?php

// Test payment API and callback URLs
require_once __DIR__ . '/vendor/autoload.php';

// Test data
$testData = [
    'apartment_id' => 1,
    'customer_name' => 'Test Customer Callback',
    'customer_email' => 'test.callback@example.com',
    'check_in' => '2024-01-15',
    'check_out' => '2024-01-16',
    'payment_method' => 'qris',
    'payment_provider' => null,
    'amount' => 150000,
    'nights' => 1,
    'notes' => 'Test transaction for callback testing'
];

echo "=== Testing Payment API and Callback URLs ===\n";
echo "Test data:\n";
echo json_encode($testData, JSON_PRETTY_PRINT) . "\n\n";

// Start Laravel and make request
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');
$kernel->bootstrap();

// Create request
$request = Illuminate\Http\Request::create('/api/payment/create', 'POST', [], [], [], [], json_encode($testData));
$request->headers->set('Content-Type', 'application/json');
$request->headers->set('Accept', 'application/json');

try {
    $response = $kernel->handle($request);
    $responseData = json_decode($response->getContent(), true);
    
    echo "API Response:\n";
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Data: " . json_encode($responseData, JSON_PRETTY_PRINT) . "\n\n";
    
    if ($response->getStatusCode() === 200 && isset($responseData['success']) && $responseData['success']) {
        echo "✓ Payment API works!\n";
        echo "Order ID: " . $responseData['order_id'] . "\n";
        echo "Booking Detail URL: " . $responseData['booking_detail_url'] . "\n\n";
        
        // Test callback URLs
        $orderId = $responseData['order_id'];
        $baseUrl = 'http://localhost:8000';
        
        $callbackUrls = [
            'success' => "{$baseUrl}/booking/success?order_id={$orderId}",
            'error' => "{$baseUrl}/booking/error?order_id={$orderId}",
            'pending' => "{$baseUrl}/booking/pending?order_id={$orderId}",
            'detail' => "{$baseUrl}/booking/detail/{$orderId}"
        ];
        
        echo "Testing callback URLs:\n";
        foreach ($callbackUrls as $type => $url) {
            echo "  {$type}: {$url}\n";
        }
        
        // Test if transaction was created
        $transaction = \App\Models\Transaction::where('order_id', $orderId)->first();
        if ($transaction) {
            echo "\n✓ Transaction created in database!\n";
            echo "  - ID: {$transaction->id}\n";
            echo "  - Order ID: {$transaction->order_id}\n";
            echo "  - Customer: {$transaction->customer_name}\n";
            echo "  - Status: {$transaction->status}\n";
            echo "  - Amount: " . (float)$transaction->amount . "\n";
            
            if ($transaction->booking_data) {
                echo "  - Booking data: Available\n";
            } else {
                echo "  - Booking data: Missing\n";
            }
        } else {
            echo "\n✗ Transaction NOT found in database!\n";
        }
        
    } else {
        echo "✗ Payment API failed!\n";
        echo "Error: " . ($responseData['message'] ?? 'Unknown error') . "\n";
    }
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}

echo "\n=== Test completed ===\n";

?>
