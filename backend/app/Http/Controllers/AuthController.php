<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * User registration.
     */
    public function register(Request $request)
    {
        try {
            // Validation
            $validated = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
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

            // Error handling
            if ($validated->fails()) {
                $errors = $validated->errors();

                // Specific error for email
                if ($errors->has('email')) {
                    return response()->json([
                        'message' => __('auth.email_already_registered'),
                        'errors' => $errors
                    ], 422);
                }

                // Specific error for password
                if ($errors->has('password')) {
                    return response()->json([
                        'message' => __('auth.password_requirements'),
                        'errors' => $errors
                    ], 422);
                }

                // General error for other fields
                return response()->json(['errors' => $errors], 422);
            }

            // Create the user (Laravel automatically generates the UUID)
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => 'free',
                'role' => 'user'
            ]);

            // Generate the JWT token
            $token = JWTAuth::fromUser($user);

            // Make certain fields visible only for this response
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => __('auth.user_registered')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('auth.error_registering_user'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * User login.
     */
    public function login(Request $request)
    {
        try {
            // Data validation
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Credentials extracted from the request
            $credentials = $request->only(['email', 'password']);

            // Attempt to authenticate the user with JWT
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'message' => __('auth.invalid_credentials')
                ], 401);
            }

            /** @var \App\Models\User $user */
            // Get the authenticated user
            $user = Auth::user();
            // Make certain fields visible only for this response
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            // Return user data and JWT token
            return response()->json([
                'user' => Auth::user(),
                'token' => $token,
                'message' => __('auth.login_successful')
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('auth.error_logging_in'),
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
            // Invalidate the user's JWT token to log them out
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'message' => __('auth.logout_successful')
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('auth.error_logging_out'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Refresh token
     */
    public function refresh()
{
    try {
        $token = JWTAuth::getToken();

        if (!$token) {
            return response()->json(['message' => 'No token provided'], 401);
        }

        $newToken = JWTAuth::refresh($token);

        return response()->json([
            'token' => $newToken,
            'message' => "TokenTokenToken"
        ]);
    } catch (TokenExpiredException $e) {
        return response()->json(['message' => 'Refresh token expired'], 401);
    } catch (JWTException $e) {
        return response()->json(['message' => 'Token invalid'], 401);
    }
}

}
