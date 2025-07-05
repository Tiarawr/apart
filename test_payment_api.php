<?php

// Simple test untuk payment API
$url = 'http://127.0.0.1:8000/api/payment/create';

$data = [
    'apartment_id' => 1,
    'customer_name' => 'John Doe',
    'customer_email' => 'john@example.com',
    'check_in' => '2025-07-10',
    'check_out' => '2025-07-12',
    'payment_method' => 'qris',
    'payment_provider' => null,
    'amount' => 1025000,
    'nights' => 2,
    'notes' => 'Test booking'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";
