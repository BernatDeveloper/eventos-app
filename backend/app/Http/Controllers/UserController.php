<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserController extends Controller
{
    /**
     * Obtener el usuario por ID
     */
    public function getUser($id)
    {
        try {
            $authUser = Auth::user();

            // Validar que solo el usuario autenticado o un administrador pueda acceder a los datos
            if ($authUser->id != $id && $authUser->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // Buscar el usuario por ID
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching user',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function updateUsername(Request $request, $id)
    {
        try {
            $authUser = Auth::user();

            // Validar que solo pueda modificar el usuario autenticado o un administrador
            if ($authUser->id != $id && $authUser->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // Validar datos antes de actualizar
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            // Buscar el usuario por ID
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Actualizar y guardar
            $user->update(['name' => $request->name]);

            return response()->json([
                'message' => 'Username updated successfully',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating username', 'error' => $e->getMessage()], 500);
        }
    }
}
