<?php

namespace App\Mail;

use Illumi    /**
     * Get the messag    public function attachments(): array
    {
        // Temporarily disable PDF attachment for testing
        return [];
        
        /*
        try {
            // Generate PDF voucher
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('voucher.booking-voucher-simple', ['transaction' => $this->transaction]);
            
            return [
                \Illuminate\Mail\Mailables\Attachment::fromData(
                    $pdf->output(),
                    'voucher-' . $this->transaction->order_id . '.pdf'
                )->withMime('application/pdf'),
            ];
        } catch (\Exception $e) {
            // Log the error and return empty array if PDF generation fails
            \Log::error('Failed to generate PDF attachment: ' . $e->getMessage());
            return [];
        }
        */
    }on.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmed-clean',
            with: [
                'transaction' => $this->transaction,
            ],
        );
    }ueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class BookingConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $transaction;

    /**
     * Create a new message instance.
     */
    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Booking Confirmed - ' . $this->transaction->order_id,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmed-clean',
            with: [
                'transaction' => $this->transaction,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Temporarily disable PDF to test email first
        return [];
    }
}
