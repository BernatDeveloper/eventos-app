<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    /**
     * Get the authenticated user.
     */
    public function getAuthUser()
    {
        try {
            /** @var \App\Models\User $user */
            // Get the authenticated user
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Show additional hidden fields
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => 'Authenticated user retrieved successfully',
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching authenticated user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Update the authenticated user's username.
     */
    public function updateUsername(Request $request)
    {
        try {
            // Validate the request data
            $validated = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
            ]);

            // If validation fails, return errors
            if ($validated->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validated->errors(),
                ], 422);
            }

            // Find the authenticated user
            $user = Auth::user();
            $user = User::find($user->id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Update and save the username
            $user->update(['name' => $request->name]);

            return response()->json([
                'message' => 'Username updated successfully',
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating username',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
