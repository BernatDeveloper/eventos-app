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
     * Listar eventos en los que está participando el usuario autenticado.
     */
    public function participatingEvents()
    {
        try {
            $user = Auth::user();
            $user = User::find($user->id);

            // Obtener los eventos en los que participa el usuario con relaciones cargadas
            $events = $user->joinedEvents()->with(['location', 'category'])->get();

            return response()->json([
                'message' => 'Participating events retrieved successfully.',
                'data' => $events,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving participating events.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Listar los usuarios participantes de un evento.
     * Solo el creador del evento puede ver esta información.
     */
    public function showParticipants($event_id)
    {
        try {
            $event = Event::findOrFail($event_id);

            // Obtener los participantes del evento
            $participants = $event->participants()->get();

            return response()->json([
                'message' => 'Event participants retrieved successfully.',
                'data' => $participants,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving event participants.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Registrar al usuario autenticado como participante en el evento indicado.
     */
    public function store(Request $request)
    {
        try {
            // Validar el ID del evento
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

            // Verificar si el evento ya ha finalizado
            if ($event->end_date < now()) {
                return response()->json([
                    'message' => 'This event has already ended.',
                ], 400);
            }

            // Verificar si el usuario ya está inscrito
            if ($event->participants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => 'You are already registered in this event.',
                ], 409);
            }

            // Registrar al usuario
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
    public function destroy($event_id)
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

            // Verificar si el usuario está realmente registrado
            if (! $event->participants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => 'You are not registered in this event.',
                ], 404);
            }

            // Eliminar la participación
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
