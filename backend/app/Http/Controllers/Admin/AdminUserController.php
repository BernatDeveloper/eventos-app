<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminUserController extends Controller
{
    /**
     * Get all users with optional name filter and pagination.
     */
    public function getAllUsers(Request $request)
    {
        try {
            // Start building the query
            $query = User::query();

            // Apply name filter if provided in the request
            if (!empty($request->email)) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }

            /** @var \App\Models\User $data */
            // Execute the query with pagination (10 per page)
            $data = $query->paginate(10);

            // Make specific fields visible if they are hidden by default
            $data->getCollection()->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('admin-user.users_fetched'),
                'data' => $data,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('admin-user.error_fetching_users'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user by ID.
     */
    public function getUser(User $user)
    {
        try {
            if (!$user) {
                return response()->json([
                    'message' => __('admin-user.user_not_found')
                ], 404);
            }

            // Make hidden fields visible for this response
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('admin-user.user_fetched'),
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('admin-user.error_fetching_user'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a user (email editing not allowed).
     */
    public function updateUser(Request $request, User $user)
    {
        try {
            if (!$user) {
                return response()->json([
                    'message' => __('admin-user.user_not_found')
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'role' => 'required|string|in:user,moderator,admin',
                'user_type' => 'required|string|in:premium,free'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedData = $validator->validated();

            // Controlar premiumPlan según user_type manual
            if ($validatedData['user_type'] === 'premium') {
                $user->premiumPlan()->updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'is_manual' => true,
                        'started_at' => now(),
                        'expired_at' => null,
                    ]
                );
            } elseif ($validatedData['user_type'] === 'free') {
                // Si admin pone free, eliminar premiumPlan si existe
                if ($user->premiumPlan) {
                    $user->premiumPlan()->delete();
                }
            }

            // Actualizar datos del usuario
            $user->update($validatedData);

            // Mostrar campos ocultos para la respuesta
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('admin-user.user_updated'),
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('admin-user.error_updating_user'),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a user by ID.
     */
    public function deleteUser(User $user)
    {
        try {
            if (!$user) {
                return response()->json([
                    'message' => __('admin-user.user_not_found')
                ], 404);
            }

            // Delete the user
            $user->delete();

            return response()->json([
                'message' => __('admin-user.user_deleted'),
            ], 200);
        } catch (\Exception $e) {
            // Handle errors
            return response()->json([
                'message' => __('admin-user.error_deleting_user'),
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
