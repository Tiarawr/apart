<?php

use Illuminate\Support\Facades\Route;

Route::get('/debug-config', function () {
    return response()->json([
        'app_env' => config('app.env'),
        'app_debug' => config('app.debug'),
        'database_connection' => config('database.default'),
        'midtrans_merchant_id' => config('midtrans.merchant_id') ? 'SET' : 'NOT SET',
        'midtrans_client_key' => config('midtrans.client_key') ? 'SET' : 'NOT SET',
        'midtrans_server_key' => config('midtrans.server_key') ? 'SET' : 'NOT SET',
        'midtrans_is_production' => config('midtrans.is_production'),
        'cache_store' => config('cache.default'),
        'session_driver' => config('session.driver'),
    ]);
});
