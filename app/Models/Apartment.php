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
        'available'
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
}
