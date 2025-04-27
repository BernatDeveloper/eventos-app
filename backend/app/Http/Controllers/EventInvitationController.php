<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventInvitation;
use App\Models\User;
use App\Notifications\EventInvitationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventInvitationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|uuid|exists:events,id',
            'recipient_id' => 'required|uuid|exists:users,id',
        ]);

        $event = Event::findOrFail($request->event_id);

        // Verificar que el usuario autenticado es el creador del evento
        if (Auth::id() !== $event->creator_id) {
            return response()->json(['message' => 'No tienes permiso para invitar a este evento'], 403);
        }

        // Verificar que el invitado no sea el creador
        if ($request->recipient_id === $event->creator_id) {
            return response()->json(['message' => 'No puedes invitarte a ti mismo'], 400);
        }

        // Verificar si el evento ya alcanzó el límite de participantes
        if ($event->participant_limit && $event->participants()->count() >= $event->participant_limit) {
            return response()->json(['message' => 'El evento ha alcanzado su límite de participantes'], 400);
        }

        // Verificar si ya existe una invitación
        $existingInvitation = EventInvitation::where('event_id', $request->event_id)
            ->where('recipient_id', $request->recipient_id)
            ->first();

        if ($existingInvitation) {
            return response()->json(['message' => 'Este usuario ya ha sido invitado'], 400);
        }

        $invitation = EventInvitation::create([
            'event_id' => $request->event_id,
            'sender_id' => Auth::id(),
            'recipient_id' => $request->recipient_id,
            'status' => 'pending',
        ]);

        // Enviar notificación al usuario invitado
        $recipient = User::find($request->recipient_id);
        $recipient->notify(new EventInvitationNotification($invitation));

        return response()->json(['message' => 'Invitación enviada con éxito', 'invitation' => $invitation], 201);
    }

    // Aceptar una invitación
    public function accept($id)
    {
        $invitation = EventInvitation::findOrFail($id);

        // Verificar que el usuario autenticado es el invitado
        if (Auth::id() !== $invitation->recipient_id) {
            return response()->json(['message' => 'No tienes permiso para aceptar esta invitación'], 403);
        }

        if ($invitation->event->participant_limit && $invitation->event->participants()->count() >= $invitation->event->participant_limit) {
            $invitation->update(['status' => 'rejected']);
            return response()->json(['message' => 'El evento ha alcanzado su límite de participantes'], 400);
        }

        // Verificar que la invitación está pendiente
        if ($invitation->status !== 'pending') {
            return response()->json(['message' => 'Esta invitación ya ha sido procesada'], 400);
        }

        // Actualizar el estado de la invitación
        $invitation->update(['status' => 'accepted']);

        // Añadir al usuario como participante del evento
        $invitation->event->participants()->attach($invitation->recipient_id);

        return response()->json(['message' => 'Invitación aceptada. ¡Eres participante del evento!']);
    }

    // Rechazar una invitación
    public function reject($id)
    {
        $invitation = EventInvitation::findOrFail($id);

        // Verificar que el usuario autenticado es el invitado
        if (Auth::id() !== $invitation->recipient_id) {
            return response()->json(['message' => 'No tienes permiso para rechazar esta invitación'], 403);
        }

        // Verificar que la invitación está pendiente
        if ($invitation->status !== 'pending') {
            return response()->json(['message' => 'Esta invitación ya ha sido procesada'], 400);
        }

        // Actualizar el estado de la invitación
        $invitation->update(['status' => 'rejected']);

        return response()->json(['message' => 'Invitación rechazada']);
    }

    // Listar invitaciones enviadas por el usuario autenticado
    public function sent()
    {
        $invitations = EventInvitation::where('sender_id', Auth::id())
            ->with(['event', 'recipient'])
            ->get();

        return response()->json($invitations);
    }

    // Listar invitaciones recibidas por el usuario autenticado
    public function received()
    {
        $invitations = EventInvitation::where('recipient_id', Auth::id())
            ->with(['event', 'sender'])
            ->get();

        return response()->json($invitations);
    }
}
