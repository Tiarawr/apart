<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MidtransService;
use Exception;

class TestMidtrans extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:midtrans';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test Midtrans integration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $this->info('Testing Midtrans integration...');

            // Test MidtransService dengan app container
            $midtransService = app(\App\Services\MidtransService::class);
            $this->info('MidtransService created successfully');

            // Test data
            $testData = [
                'apartment' => [
                    'id' => 1,
                    'name' => 'Test Apartment',
                    'price' => 500000,
                ],
                'name' => 'Test User',
                'email' => 'test@example.com',
                'totalPrice' => 525000,
                'nights' => 1,
                'paymentMethod' => 'qris',
                'paymentProvider' => null,
            ];

            $this->info('Testing createBookingTransaction...');
            $result = $midtransService->createBookingTransaction($testData);

            if ($result['success']) {
                $this->info('SUCCESS: ' . $result['snap_token']);
            } else {
                $this->error('FAILED: ' . $result['message']);
            }
        } catch (Exception $e) {
            $this->error('ERROR: ' . $e->getMessage());
            $this->error('File: ' . $e->getFile());
            $this->error('Line: ' . $e->getLine());
        }
    }
}
