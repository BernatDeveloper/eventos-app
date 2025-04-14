<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventParticipantController extends Controller
{
    /**
     * Listar eventos en los que está participando el usuario autenticado
     */
    public function participatingEvents()
    {
        $user = Auth::user();
        $user = User::find($user->id);
        $events = $user->joinedEvents()->with('location', 'category')->get();

        return response()->json($events);
    }

    /**
     * Listar los usuarios participantes de un evento (Solo lo puede ver el creador del evento)
     */
    public function showParticipants($event_id)
    {
        $event = Event::findOrFail($event_id);

        // Validación: solo el creador puede ver los participantes
        if ($event->creator_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($event->participants()->get());
    }


    /**
     * Register the authenticated user as a participant in the given event.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'event_id' => 'required|exists:events,id',
            ]);

            $user = Auth::user(); // O puedes usar $request->user() si usas auth middleware
            $event = Event::findOrFail($validated['event_id']);

            // Evitar duplicados (aunque ya tienes unique en la migración)
            if ($event->participants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => 'You are already registered in this event.',
                ], 409);
            }

            // Asociar usuario al evento
            $event->participants()->attach($user->id);

            return response()->json([
                'message' => 'Successfully registered for the event.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error registering for event.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

/**
 * Remove the authenticated user from the event participants.
 */
public function destroy(Request $request, $event_id)
{
    try {
        $user = Auth::user();
        $event = Event::findOrFail($event_id);

        // Verificar si el usuario es el creador del evento
        if ($event->creator_id === $user->id) {
            return response()->json([
                'message' => 'You cannot unregister from your own event.',
            ], 403);
        }

        // Eliminar la participación
        $event->participants()->detach($user->id);

        return response()->json([
            'message' => 'Successfully unregistered from the event.',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error unregistering from event.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
