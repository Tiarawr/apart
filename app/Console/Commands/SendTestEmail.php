<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\BookingConfirmed;
use App\Models\Transaction;
use Illuminate\Support\Facades\Mail;

class SendTestEmail extends Command
{
    protected $signature = 'email:test {email}';
    protected $description = 'Send test booking confirmation email';

    public function handle()
    {
        $email = $this->argument('email');
        
        try {
            // Get the latest transaction
            $transaction = Transaction::latest()->first();
            
            if (!$transaction) {
                $this->error('No transaction found in database');
                return 1;
            }
            
            // Send email
            Mail::to($email)->send(new BookingConfirmed($transaction));
            
            $this->info("Email sent successfully to {$email}");
            $this->info("Transaction ID: {$transaction->id}");
            $this->info("Order ID: {$transaction->order_id}");
            
            return 0;
        } catch (\Exception $e) {
            $this->error("Failed to send email: {$e->getMessage()}");
            return 1;
        }
    }
}
