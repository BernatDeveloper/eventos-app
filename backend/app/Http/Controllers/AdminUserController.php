<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminUserController extends Controller
{
    /**
     * Obtener todos los usuarios
     */
    public function getAllUsers(Request $request)
    {
        try {
            $query = User::query();

            // Aplicar filtro de nombre si existe
            if (!empty($request->name)) {
                $query->where('name', 'like', '%' . $request->name . '%')->paginate(10);
            }

            /** @var \App\Models\User $users */
            // Realizar la paginación después de aplicar el filtro
            $users = $query->paginate(10);

            // Mostrar campos específicos si están ocultos por defecto
            $users->getCollection()->makeVisible(['profile_image', 'user_type', 'role']);

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
     * Crear un nuevo usuario con contraseña
     */
    public function createUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'role' => 'required|string|in:user,moderator,admin',
                'user_type' => 'required|string|in:premium,free',
                'password' => [
                    'required',
                    'string',
                    'min:6',
                    'confirmed',
                    'regex:/[A-Z]/',
                    'regex:/[0-9]/',
                    'regex:/[@$!%*?&.,]/'
                ],
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Cifrar la contraseña
            $validatedData = $validator->validated();
            $validatedData['password'] = Hash::make($validatedData['password']);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'role' => $validatedData['role'],
                'user_type' => $validatedData['user_type'],
                'password' => $validatedData['password'], // Almacenar la contraseña cifrada
            ]);

            // Hacer visibles los campos solo para esta respuesta
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar un usuario (sin permitir editar el email)
     */
    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'role' => 'required|string|in:user,moderator,admin',
                'user_type' => 'required|string|in:premium,free'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $user->update($validatedData);

            // Hacer visibles los campos solo para esta respuesta
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating user',
                'error' => $e->getMessage()
            ], 500);
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
