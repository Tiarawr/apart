<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'order_id',
        'apartment_id',
        'customer_name',
        'customer_email',
        'check_in',
        'check_out',
        'nights',
        'amount',
        'payment_method',
        'payment_provider',
        'snap_token',
        'status',
        'midtrans_response',
        'notes',
        'booking_data'
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'amount' => 'decimal:2',
        'midtrans_response' => 'array',
        'booking_data' => 'array',
    ];

    public function apartment(): BelongsTo
    {
        return $this->belongsTo(Apartment::class);
    }

    public static function checkoutExpiredBookings()
    {
        $today = now()->toDateString();
        
        // Update semua booking yang check_out nya hari ini atau sebelumnya
        $expiredBookings = static::where('status', 'settlement')
            ->where('check_out', '<=', $today)
            ->get();
            
        foreach ($expiredBookings as $booking) {
            // Bisa tambahkan logic lain seperti update status jadi 'completed'
            // atau biarkan tetap 'settlement' tapi sudah tidak mengurangi availability
        }
        
        return $expiredBookings->count();
    }
}
