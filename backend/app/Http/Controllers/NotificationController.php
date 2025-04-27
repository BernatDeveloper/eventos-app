<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Obtener todas las notificaciones del usuario autenticado.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $notifications = Auth::user()->notifications;

        return response()->json($notifications);
    }

    /**
     * Marcar una notificación como leída.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead($id)
    {
        // Buscar la notificación del usuario autenticado
        $notification = Auth::user()->notifications->findOrFail($id);

        // Marcar la notificación como leída
        $notification->markAsRead();

        return response()->json(['message' => 'Notificación marcada como leída']);
    }
}