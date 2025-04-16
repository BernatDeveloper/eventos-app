<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EventParticipantController extends Controller
{
    /**
     * List events the authenticated user is participating in.
     */
    public function participatingEvents()
    {
        try {
            $user = Auth::user();
            $user = User::find($user->id);

            // Get the events the user is participating in with related models loaded
            $events = $user->joinedEvents()->with(['location', 'category'])->get();

            return response()->json([
                'message' => 'Participating events retrieved successfully.',
                'events' => $events,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving participating events.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List the users participating in an event.
     * Only the event creator can view this information.
     */
    public function showParticipants(Event $event)
    {
        try {
            // Get the participants of the event
            $participants = $event->participants()->get();

            return response()->json([
                'message' => 'Event participants retrieved successfully.',
                'participants' => $participants,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving event participants.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Register the authenticated user as a participant in the specified event.
     */
    public function store(Request $request)
    {
        try {
            // Validate the event ID
            $validator = Validator::make($request->all(), [
                'event_id' => 'required|exists:events,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $validated = $validator->validated();
            $user = Auth::user();
            $event = Event::findOrFail($validated['event_id']);

            // Check if the event has already ended
            if ($event->end_date < now()) {
                return response()->json([
                    'message' => 'This event has already ended.',
                ], 400);
            }

            // Check if the user is already registered
            if ($event->participants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => 'You are already registered in this event.',
                ], 409);
            }

            // Register the user
            $event->participants()->attach($user->id);

            return response()->json([
                'message' => 'Successfully registered for the event.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while registering for the event.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the authenticated user from the event participants.
     */
    public function destroy(Event $event)
    {
        try {
            $user = Auth::user();

            // Check if the user is the creator of the event
            if ($event->creator_id === $user->id) {
                return response()->json([
                    'message' => 'You cannot unregister from your own event.',
                ], 403);
            }

            // Check if the user is actually registered for the event
            if (! $event->participants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => 'You are not registered in this event.',
                ], 404);
            }

            // Remove the user's participation
            $event->participants()->detach($user->id);

            return response()->json([
                'message' => 'Successfully unregistered from the event.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error unregistering from event.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
