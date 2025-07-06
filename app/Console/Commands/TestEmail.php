<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmed;
use App\Models\Transaction;

class TestEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email sending to specified address';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        try {
            // Get the latest transaction for testing
            $transaction = Transaction::with('apartment')->latest()->first();
            
            if (!$transaction) {
                $this->error('No transaction found for testing');
                return 1;
            }
            
            $this->info("Sending test email to: {$email}");
            $this->info("Using transaction: {$transaction->order_id}");
            
            // Send test email
            Mail::to($email)->send(new BookingConfirmed($transaction));
            
            $this->info('✅ Email sent successfully!');
            $this->info("Check {$email} for the booking confirmation email");
            
            return 0;
        } catch (\Exception $e) {
            $this->error('❌ Failed to send email: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
}
