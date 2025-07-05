<?php
$url = 'http://localhost:8000/api/payment/status/BOOKING-1751733517-5782';
$response = file_get_contents($url);
echo "Response: " . $response . "\n";
