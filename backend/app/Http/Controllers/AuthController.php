<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Registro de usuario.
     */
    public function register(Request $request)
    {
        try {
            // Validación
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Creación del usuario (Laravel genera automáticamente el UUID)
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => 'free',
                'role' => 'user'
            ]);

            // Generar el token JWT
            $token = JWTAuth::fromUser($user);

            // Hacer visibles los campos solo para esta respuesta
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'User registered successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error registering user',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Inicio de sesión.
     */
    public function login(Request $request)
    {
        try {
            // Validación de datos
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Intentar autenticar al usuario
            if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Invalid email or password'
                ], 401);
            }

            return response()->json([
                'user' => Auth::user(),
                'token' => $token,
                'message' => 'Login successful'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error logging in',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cierre de sesión.
     */
    public function logout()
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'message' => 'User not authenticated'
                ], 401);
            }

            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error logging out',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
