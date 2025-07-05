<?php
require_once 'vendor/autoload.php';

// Load Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check current apartments
$apartments = \App\Models\Apartment::all();

echo "Current Apartments:\n";
echo str_repeat('=', 50) . "\n";

foreach ($apartments as $apartment) {
    echo "ID: " . $apartment->id . "\n";
    echo "Name: " . $apartment->name . "\n";
    echo "Price: Rp " . number_format($apartment->price) . "\n";
    echo "Location: " . $apartment->location . "\n";
    echo "Description: " . $apartment->description . "\n";
    echo str_repeat('-', 30) . "\n";
}

echo "\nTotal apartments: " . $apartments->count() . "\n";
