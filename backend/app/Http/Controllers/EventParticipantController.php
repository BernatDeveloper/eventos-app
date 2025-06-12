<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventInvitation;
use App\Models\EventParticipant;
use App\Models\User;
use App\Notifications\RemovedFromEvent;
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

            // Get the events the user is participating in, ordered by newest first
            $events = $user->joinedEvents()
                ->with(['creator', 'location', 'category'])
                ->orderBy('created_at', 'desc')
                ->get();

            // Make visible 'profile_image', 'user_type', 'role' for creator relation
            $events = $events->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('participants.participating_retrieved'),
                'events' => $events,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('participants.participating_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List the users participating in an event.
     */
    public function showParticipants(Event $event)
    {
        try {
            // Retrieve the participants of the event and make their hidden fields visible
            $participants = $event->participants->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('participants.list_retrieved'),
                'participants' => $participants,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('participants.list_error'),
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
                    'message' => __('participants.validation_failed'),
                    'errors' => $validator->errors(),
                ], 422);
            }

            $validated = $validator->validated();
            $user = Auth::user();
            $event = Event::findOrFail($validated['event_id']);

            // Check if the event has already ended
            if ($event->end_date < now()) {
                return response()->json([
                    'message' => __('participants.event_ended'),
                ], 400);
            }

            // Check if the user is already registered
            if ($event->participants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => __('participants.already_registered'),
                ], 409);
            }

            // Register the user
            $event->participants()->attach($user->id);

            return response()->json([
                'message' => __('participants.registration_successful'),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('participants.registration_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the authenticated user from the event participants.
     */
    public function destroy(Event $event, User $user)
    {
        try {
            // Detach the user from the event
            $event->participants()->detach($user->id);

            // Delete any active invitations
            EventInvitation::where('event_id', $event->id)
                ->where('recipient_id', $user->id)
                ->whereIn('status', ['pending', 'accepted'])
                ->delete();

            // Enviar la notificación
            $user->notify(new RemovedFromEvent($event));

            return response()->json([
                'message' => __('participants.removed_successfully'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('participants.removal_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
