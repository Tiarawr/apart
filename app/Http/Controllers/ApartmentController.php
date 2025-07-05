<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Apartment::query()->available()->with('reviews');

        // Filter by date availability
        if ($request->has('checkIn') && $request->has('checkOut')) {
            $query->availableForDates($request->checkIn, $request->checkOut);
        }

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->byType($request->type);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $query->byLocation($request->location);
        }

        // Filter by price range
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->inPriceRange($request->min_price, $request->max_price);
        }

        // Search by name or location
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('location', 'like', '%' . $request->search . '%');
            });
        }

        // Sort by price or rating
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name':
                    $query->orderBy('name', 'asc');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $apartments = $query->paginate(12);

        // Calculate actual reviews count and rating for each apartment
        foreach ($apartments as $apartment) {
            $apartment->reviews_count = $apartment->reviews->count();
            $apartment->rating = $apartment->reviews->avg('rating') ?: 4.5; // Default rating if no reviews
            
            // Add available rooms info if dates are provided
            if ($request->has('checkIn') && $request->has('checkOut')) {
                $apartment->available_rooms = $apartment->getAvailableRoomsForDates(
                    $request->checkIn, 
                    $request->checkOut
                );
            } else {
                $apartment->available_rooms = $apartment->capacity;
            }
        }

        // Store filter parameters for frontend
        $filterParams = $request->only(['type', 'location', 'min_price', 'max_price', 'search', 'sort', 'guests', 'checkIn', 'checkOut']);

        return Inertia::render('Apartments', [
            'apartments' => $apartments,
            'filters' => $filterParams
        ]);
    }
    public function show($id)
    {
        $apartment = Apartment::with('reviews')->findOrFail($id);

        // Hitung jumlah ulasan dan rating rata-rata
        $apartment->reviews_count = $apartment->reviews->count();
        $apartment->rating = $apartment->reviews->avg('rating') ?: 4.5; // Default rating if no reviews

        return Inertia::render('ApartmentDetail', [
            'apartment' => $apartment
        ]);
    }

    public function api(Request $request)
    {
        $query = Apartment::query()->available();

        // Filter by date availability
        if ($request->has('check_in') && $request->has('check_out')) {
            $query->availableForDates($request->check_in, $request->check_out);
        }

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->byType($request->type);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $query->byLocation($request->location);
        }

        // Filter by price range
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->inPriceRange($request->min_price, $request->max_price);
        }

        // Search by name or location
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('location', 'like', '%' . $request->search . '%');
            });
        }

        $apartments = $query->get();

        // Calculate available rooms for each apartment
        foreach ($apartments as $apartment) {
            // Add available rooms info if dates are provided
            if ($request->has('check_in') && $request->has('check_out')) {
                $apartment->available_rooms = $apartment->getAvailableRoomsForDates(
                    $request->check_in, 
                    $request->check_out
                );
            } else {
                $apartment->available_rooms = $apartment->capacity;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $apartments
        ]);
    }

    public function apiShow($id)
    {
        $apartment = Apartment::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $apartment
        ]);
    }
}
