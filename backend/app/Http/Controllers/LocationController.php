<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Location;

class LocationController extends Controller
{
    /**
     * List all locations.
     */
    public function index()
    {
        try {
            // Get all locations
            $locations = Location::all();

            return response()->json([
                'message' => __('locations.retrieved_all'),
                'locations' => $locations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('locations.retrieval_error_all'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created location in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the request data using Validator
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'address' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => __('locations.validation_failed'),
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Create the new location with the validated data
            $location = Location::create($validator->validated());

            return response()->json([
                'message' => __('locations.created'),
                'location' => $location,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('locations.creation_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified location.
     */
    public function show(Location $location)
    {
        try {
            return response()->json([
                'message' => __('locations.retrieved'),
                'location' => $location,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('locations.retrieval_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        try {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'address' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
            ]);

            // If validation fails, return error response
            if ($validator->fails()) {
                return response()->json([
                    'message' => __('locations.validation_failed'),
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Update the location with the validated data
            $location->update($validator->validated());

            // Return success response
            return response()->json([
                'message' => __('locations.updated'),
                'location' => $location,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('locations.update_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        try {
            // Delete the location
            $location->delete();

            return response()->json([
                'message' => __('locations.deleted'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('locations.delete_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
