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
}
