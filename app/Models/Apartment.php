<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'location',
        'images',
        'bedrooms',
        'bathrooms',
        'area',
        'features',
        'amenities',
        'rules',
        'type',
        'available',
        'capacity'
    ];

    protected $casts = [
        'images' => 'array',
        'features' => 'array',
        'amenities' => 'array',
        'rules' => 'array',
        'price' => 'decimal:2',
        'available' => 'boolean'
    ];

    public function scopeAvailable($query)
    {
        return $query->where('available', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where('location', 'like', '%' . $location . '%');
    }

    public function scopeInPriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function scopeAvailableForDates($query, $checkIn, $checkOut)
    {
        if (!$checkIn || !$checkOut) {
            return $query;
        }

        return $query->whereRaw('
            (SELECT COUNT(*) FROM transactions 
             WHERE transactions.apartment_id = apartments.id 
             AND transactions.status = ?
             AND transactions.check_in < ? 
             AND transactions.check_out > ?
            ) < apartments.capacity
        ', ['settlement', $checkOut, $checkIn]);
    }

    public function getAvailableRoomsForDates($checkIn, $checkOut)
    {
        if (!$checkIn || !$checkOut) {
            return $this->capacity;
        }

        $bookedRooms = $this->transactions()
            ->where('status', 'settlement')
            ->where('check_in', '<', $checkOut)  // Booking starts before new checkout
            ->where('check_out', '>', $checkIn)  // Booking ends after new checkin
            ->count();

        return max(0, $this->capacity - $bookedRooms);
    }

    public function isAvailableForDates($checkIn, $checkOut)
    {
        return $this->getAvailableRoomsForDates($checkIn, $checkOut) > 0;
    }
}
