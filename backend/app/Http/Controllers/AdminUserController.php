<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    /**
     * Obtener todos los usuarios
     */
    public function getAllUsers()
    {
        try {
            $users = User::all();

            // Opcionalmente ocultar o mostrar campos específicos
            $users->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener el usuario por ID
     */
    public function getUser($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Hacer visibles los campos solo para esta respuesta
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Axtualizar el username del usuario pasado en el id
     */
    public function updateUsername(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->update(['name' => $request->name]);

            return response()->json([
                'message' => 'Username updated successfully',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating username', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Eliminar un usuario
     */
    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
