<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $events = Event::with(['creator', 'location', 'category', 'participants'])->get(); // Trae los eventos con sus relaciones

            return response()->json([
                'message' => 'Events retrieved successfully',
                'events' => $events,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching events',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function myEvents()
    {
        try {
            $events = Event::with(['location', 'category', 'participants'])
                ->where('creator_id', Auth::id())
                ->get();

            return response()->json([
                'message' => 'My events retrieved successfully',
                'events' => $events,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching my events',
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
            $validated = $request->validate([
                'location_id' => 'nullable|exists:locations,id',
                'category_id' => 'nullable|exists:event_categories,id',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'participant_limit' => 'nullable|integer',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'start_time' => 'required|date_format:H:i',
                'end_time' => 'required|date_format:H:i',
            ]);

            $user = Auth::user();

            $event = Event::create([
                'creator_id' => $user->id,
                ...$validated,
            ]);

            // Agregamos al creador como participante
            $event->participants()->attach($user->id);

            return response()->json([
                'message' => 'Event created successfully',
                'event' => $event,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        try {
            if ($event->creator_id !== Auth::id()) {
                return response()->json([
                    'message' => 'Unauthorized to view this event',
                ], 403);
            }

            $event->load(['creator', 'location', 'category', 'participants']);

            return response()->json([
                'message' => 'Event retrieved successfully',
                'event' => $event,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function update(Request $request, Event $event)
    {
        try {
            if ($event->creator_id !== Auth::id()) {
                return response()->json([
                    'message' => 'Unauthorized to update this event',
                ], 403);
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'participant_limit' => 'nullable|integer',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'start_time' => 'required|date_format:H:i',
                'end_time' => 'required|date_format:H:i',
            ]);

            $event->update($validated);

            return response()->json([
                'message' => 'Event updated successfully',
                'event' => $event,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        try {
            if ($event->creator_id !== Auth::id()) {
                return response()->json([
                    'message' => 'Unauthorized to delete this event',
                ], 403);
            }

            $event->delete();

            return response()->json([
                'message' => 'Event deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
