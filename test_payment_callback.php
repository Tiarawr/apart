<?php

// Test payment creation and callback URLs
header('Content-Type: application/json');

// Test data
$testData = [
    'apartment_id' => 1,
    'customer_name' => 'Test Customer',
    'customer_email' => 'test@example.com',
    'check_in' => '2024-01-15',
    'check_out' => '2024-01-16',
    'payment_method' => 'qris',
    'payment_provider' => null,
    'amount' => 150000,
    'nights' => 1,
    'notes' => 'Test transaction for callback testing'
];

// Create payment
$url = 'http://localhost:8000/api/payment/create';
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo json_encode([
    'http_code' => $httpCode,
    'response' => json_decode($response, true)
], JSON_PRETTY_PRINT);

?>
