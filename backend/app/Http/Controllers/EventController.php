<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of events created by the authenticated user.
     */
    public function myEvents()
    {
        try {
            $events = Event::with(['location', 'category', 'participants'])
                ->where('creator_id', Auth::id())
                ->get();

            $events->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('events.retrieved_my_events'),
                'events' => $events,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('events.error_fetching_my_events'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'location_id' => 'nullable|exists:locations,id',
            'category_id' => 'nullable|exists:event_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'participant_limit' => 'nullable|integer|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => __('events.validation_failed'),
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = Auth::user();

            // Create event with validated data and assign the authenticated user as creator
            $event = Event::create(array_merge(
                ['creator_id' => $user->id],
                $validator->validated()
            ));

            // Automatically register creator as participant
            $event->participants()->attach($user->id);

            $event = $event->load('location', 'category');

            return response()->json([
                'message' => __('events.created_successfully'),
                'event' => $event,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('events.error_creating'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified event.
     */
    public function show(Event $event)
    {
        try {
            $event->load(['creator', 'location', 'category', 'participants']);

            // Make hidden fields of the creator and participants visible
            $event->creator->makeVisible(['profile_image', 'user_type', 'role']);
            $event->participants->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('events.retrieved_successfully'),
                'event' => $event,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('events.error_retrieving'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified event.
     */
    public function update(Request $request, Event $event)
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'participant_limit' => 'nullable|integer|max:100',
            'location_id' => 'nullable|exists:locations,id',
            'category_id' => 'nullable|exists:categories,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json([
                'message' => __('events.validation_failed'),
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $data = $validator->validated();

            // Update the event with the validated data
            $event->update($data);

            // Load the location relation if you want to return it as well
            $event->load('location', 'category');

            return response()->json([
                'message' => __('events.updated_successfully'),
                'event' => $event,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('events.error_updating'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the location of the specified event.
     */
    public function updateLocation(Request $request, Event $event)
    {
        // Validate new location exists
        $validator = Validator::make($request->all(), [
            'location_id' => 'required|exists:locations,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => __('events.validation_failed'),
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Update only the location
            $event->update([
                'location_id' => $request->input('location_id')
            ]);

            $event->load('location');

            return response()->json([
                'message' => __('events.location_updated'),
                'event' => $event,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('events.error_updating_location'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Event $event)
    {
        try {
            // Attempt to delete the event
            $event->delete();

            return response()->json([
                'message' => __('events.deleted_successfully'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('events.error_deleting'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
