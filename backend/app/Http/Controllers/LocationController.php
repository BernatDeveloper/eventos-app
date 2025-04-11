<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $locations = Location::all();
            return response()->json([
                'message' => 'Locations retrieved successfully',
                'locations' => $locations,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching locations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
            ]);

            $location = Location::create($validated);

            return response()->json([
                'message' => 'Location created successfully',
                'location' => $location,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating location',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        return response()->json([
            'message' => 'Location retrieved successfully',
            'location' => $location,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
            ]);

            $location->update($validated);

            return response()->json([
                'message' => 'Location updated successfully',
                'location' => $location,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating location',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        try {
            $location->delete();

            return response()->json([
                'message' => 'Location deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting location',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
