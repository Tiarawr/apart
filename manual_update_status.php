<?php
require_once 'vendor/autoload.php';

// Ambil order_id dari command line argument
$orderId = $argv[1] ?? null;

if (!$orderId) {
    echo "Usage: php update_payment_status.php <order_id>\n";
    echo "Example: php update_payment_status.php BOOKING-1751733517-5782\n";
    exit(1);
}

// Setup Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');

// Load environment
$app->loadEnvironmentFrom('.env');
$app->boot();

// Setup Midtrans
\Midtrans\Config::$serverKey = config('midtrans.server_key');
\Midtrans\Config::$isProduction = config('midtrans.is_production');
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

try {
    // Get status from Midtrans
    $status = \Midtrans\Transaction::status($orderId);
    
    // Convert to array if it's an object
    if (is_object($status)) {
        $statusArray = json_decode(json_encode($status), true);
    } else {
        $statusArray = $status;
    }
    
    echo "=== Midtrans Status ===\n";
    echo "Order ID: " . $statusArray['order_id'] . "\n";
    echo "Transaction Status: " . $statusArray['transaction_status'] . "\n";
    echo "Payment Type: " . $statusArray['payment_type'] . "\n";
    echo "Gross Amount: " . $statusArray['gross_amount'] . "\n";
    echo "Status Code: " . $statusArray['status_code'] . "\n";
    echo "Status Message: " . $statusArray['status_message'] . "\n";
    
    // Update local database
    $transaction = App\Models\Transaction::where('order_id', $orderId)->first();
    
    if ($transaction) {
        $oldStatus = $transaction->status;
        
        switch ($statusArray['transaction_status']) {
            case 'capture':
            case 'settlement':
                $transaction->status = 'settlement';
                break;
            case 'pending':
                $transaction->status = 'pending';
                break;
            case 'deny':
                $transaction->status = 'deny';
                break;
            case 'expire':
                $transaction->status = 'expire';
                break;
            case 'cancel':
                $transaction->status = 'cancel';
                break;
            default:
                $transaction->status = 'failure';
                break;
        }
        
        $transaction->midtrans_response = json_encode($statusArray);
        $transaction->save();
        
        echo "\n=== Database Update ===\n";
        echo "Old Status: " . $oldStatus . "\n";
        echo "New Status: " . $transaction->status . "\n";
        echo "Status updated successfully!\n";
    } else {
        echo "\n=== Error ===\n";
        echo "Transaction not found in database!\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
