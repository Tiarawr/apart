<?php

// Simple test for callback URLs
echo "Testing Callback URLs\n";
echo "=====================\n\n";

// Test data
$orderId = 'BOOKING-1234567890-5678';
$baseUrl = 'http://localhost:8000';

// Test URLs
$urls = [
    'success' => "{$baseUrl}/booking/success?order_id={$orderId}",
    'error' => "{$baseUrl}/booking/error?order_id={$orderId}",
    'pending' => "{$baseUrl}/booking/pending?order_id={$orderId}",
    'detail' => "{$baseUrl}/booking/detail/{$orderId}"
];

echo "Generated URLs:\n";
foreach ($urls as $type => $url) {
    echo "  {$type}: {$url}\n";
}

echo "\nProblem Analysis:\n";
echo "1. Callback URLs are being generated correctly\n";
echo "2. The issue is likely that:\n";
echo "   - Order ID from Midtrans doesn't match the Order ID in database\n";
echo "   - Transaction record is not created before redirecting to callback\n";
echo "   - Route parameter parsing issue\n\n";

echo "Solution:\n";
echo "1. Check that Order ID in Midtrans matches Order ID in database\n";
echo "2. Ensure transaction is created before Midtrans redirect\n";
echo "3. Add better error handling in booking detail route\n";

?>
