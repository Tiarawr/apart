<?php

require_once 'vendor/autoload.php';

// Test Laravel app bootstrap
$app = require_once 'bootstrap/app.php';

// Test class existence
echo "Testing class existence:\n";
echo "class_exists('App\\Services\\MidtransService'): " . (class_exists('App\\Services\\MidtransService') ? 'true' : 'false') . "\n";

// Test file existence
echo "File exists: " . (file_exists('app/Services/MidtransService.php') ? 'true' : 'false') . "\n";

// Test direct instantiation
try {
    $service = new App\Services\MidtransService();
    echo "Direct instantiation: SUCCESS\n";
} catch (Exception $e) {
    echo "Direct instantiation: ERROR - " . $e->getMessage() . "\n";
}

// Test autoload mapping
$autoloadPaths = require 'vendor/composer/autoload_psr4.php';
echo "App\\ namespace maps to: " . (isset($autoloadPaths['App\\']) ? implode(', ', $autoloadPaths['App\\']) : 'NOT FOUND') . "\n";
