<?php

namespace App\Http\Middleware;

use App\Models\Location;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserOwnsLocation
{
    /**
     * Handle an incoming request to ensure the user can manage a location.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle($request, Closure $next)
    {
        // Get the location from the route
        $location = Location::findOrFail($request->route('location'));

        // Get the event associated with the location
        $event = $location->event;

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $user = Auth::user();

        // Check if the user is the creator of the event or an admin
        $isEventCreator = $event->creator_id === $user->id;
        $isAdmin = $user->role === 'admin';

        // If the user is neither the event creator nor an admin, deny access
        if (!$isEventCreator && !$isAdmin) {
            return response()->json([
                'message' => 'You are not authorized to modify this location. Only the event creator or an admin can modify it.'
            ], 403);
        }

        return $next($request);
    }
}
