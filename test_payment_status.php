<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();

try {
    $response = $client->get('http://localhost:8000/api/payment/status/BOOKING-1751733517-5782', [
        'headers' => [
            'Accept' => 'application/json',
        ]
    ]);
    
    echo "Status Code: " . $response->getStatusCode() . "\n";
    echo "Response Body: " . $response->getBody() . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
