<?php

namespace App\Http\Controllers;

use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Get all event categories
            $categories = EventCategory::all();

            return response()->json([
                'message' => __('categories.retrieved_successfully'),
                'categories' => $categories,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('categories.error_fetching'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the incoming request data
            $validated = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            if ($validated->fails()) {
                return response()->json([
                    'message' => __('categories.validation_failed'),
                    'errors' => $validated->errors(),
                ], 422);
            }

            // Create the category
            $category = EventCategory::create($validated->validated());

            return response()->json([
                'message' => __('categories.created_successfully'),
                'category' => $category,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('categories.error_creating'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(EventCategory $eventCategory)
    {
        try {
            return response()->json([
                'message' => __('categories.retrieved_successfully'),
                'category' => $eventCategory,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('categories.error_retrieving'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventCategory $eventCategory)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => __('categories.validation_failed'),
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Update the event category with the validated data
            $eventCategory->update($validator->validated());

            return response()->json([
                'message' => __('categories.updated_successfully'),
                'category' => $eventCategory,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('categories.error_updating'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventCategory $eventCategory)
    {
        try {
            // Attempt to delete the category
            $eventCategory->delete();

            return response()->json([
                'message' => __('categories.deleted_successfully'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('categories.error_deleting'),
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
