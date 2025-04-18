<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureUserOwnsEvent
{
    /**
     * Handle an incoming request to ensure the user owns the event or is an admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle($request, Closure $next)
    {
        // Retrieve the 'event' parameter from the route
        $event = $request->route('event');

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Check if the authenticated user is the creator of the event
        $isCreator = $event->creator_id === Auth::id();

        // Check if the authenticated user is an admin
        $isAdmin = Auth::user()->role === 'admin';

        // If neither condition is true, return a forbidden response
        if (!$isCreator && !$isAdmin) {
            return response()->json([
                'message' => 'You do not have permission to access this event. Only the event creator or an admin can access it.'
            ], 403);
        }

        return $next($request);
    }
}
