<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserOwnsEventParticipant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the EventParticipant model from the route
        $eventParticipant = $request->route('event_participant');

        if (!$eventParticipant) {
            return response()->json(['message' => 'Event participant not found'], 404);
        }

        // Get the related Event model
        $event = $eventParticipant->event;

        if (!$event) {
            return response()->json(['message' => 'Related event not found'], 404);
        }

        $user = Auth::user();

        // Authorization logic:
        // - The user can delete if:
        //   - They are the participant themselves (want to leave the event)
        //   - They are the creator of the event
        //   - They are an admin
        if (
            $eventParticipant->user_id !== $user->id &&
            $event->creator_id !== $user->id &&
            $user->role !== 'admin'
        ) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
