<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserOwnsEventParticipant
{
    /**
     * Handle an incoming request to ensure the user can delete an event participant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $event = $request->route('event');
        $targetUser = $request->route('user');
        $authUser = Auth::user();

        // Ensure bindings exist
        if (! $event || ! $targetUser) {
            return response()->json(['message' => 'Event or user not found.'], 404);
        }

        // Ensure the user is a participant of the event
        $isTargetParticipant = $event->participants()->where('user_id', $targetUser->id)->exists();
        if (! $isTargetParticipant) {
            return response()->json(['message' => 'User is not a participant of this event.'], 404);
        }

        // Prevent deleting the event creator
        if ($event->creator_id === $targetUser->id) {
            return response()->json(['message' => 'You cannot remove the event creator.'], 403);
        }

        // Permission check: must be the target, the creator, or admin
        $isSelf = $authUser->id === $targetUser->id;
        $isCreator = $authUser->id === $event->creator_id;
        $isAdmin = $authUser->role === 'admin';

        if (! ($isSelf || $isCreator || $isAdmin)) {
            return response()->json([
                'message' => 'You do not have permission to remove this participant.'
            ], 403);
        }

        return $next($request);
    }
}
