<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

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
        $location = $request->route('location');

        $user = Auth::user();

        $event = $location->event;

        // If there's an event, check if the user is the creator or an admin
        if ($event) {
            $isEventCreator = $event->creator_id === $user->id;
            $isAdmin = $user->role === 'admin';

            if (!$isEventCreator && !$isAdmin) {
                return response()->json([
                    'message' => 'You are not authorized to modify this location. Only the event creator or an admin can modify it.'
                ], 403);
            }

            return $next($request);
        }

        // If there's no event, only allow admin
        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Only admins can modify locations not associated with any event.'
            ], 403);
        }

        return $next($request);
    }
}