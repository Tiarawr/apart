<?php

// Test callback URLs generation
$orderId = 'BOOKING-' . time() . '-' . rand(1000, 9999);

echo "Testing callback URLs for order ID: $orderId\n";
echo "===========================================\n\n";

$baseUrl = 'http://localhost:8000';

$finishUrl = "$baseUrl/booking/success?order_id=$orderId";
$errorUrl = "$baseUrl/booking/error?order_id=$orderId";
$pendingUrl = "$baseUrl/booking/pending?order_id=$orderId";

echo "Finish URL: $finishUrl\n";
echo "Error URL: $errorUrl\n";
echo "Pending URL: $pendingUrl\n\n";

// Test that these URLs will redirect to booking detail
$bookingDetailUrl = "$baseUrl/booking/detail/$orderId";
echo "Booking Detail URL: $bookingDetailUrl\n\n";

// Test URL using Laravel's url() helper
echo "Using Laravel URL helper:\n";
echo "Finish: " . url("/booking/success?order_id=$orderId") . "\n";
echo "Error: " . url("/booking/error?order_id=$orderId") . "\n";
echo "Pending: " . url("/booking/pending?order_id=$orderId") . "\n";
echo "Detail: " . url("/booking/detail/$orderId") . "\n";

?>
