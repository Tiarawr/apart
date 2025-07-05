<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'apartment_id',
        'name',
        'avatar',
        'rating',
        'comment',
        'date_display'
    ];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
}
