<?php

namespace App\Http\Controllers;

use App\Models\EventInvitation;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
                return response()->json(['message' => __('user.unauthorized')], 401);
            }

            // Show additional hidden fields
            $user->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('user.auth_retrieved'),
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('user.auth_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function searchByName(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'name' => 'required|string|min:1',
                'event_id' => 'required|uuid|exists:events,id',
            ]);

            if ($validated->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validated->errors(),
                ], 422);
            }

            $nameFragment = strtolower($request->name);
            $eventId = $request->event_id;

            $invitedUserIds = EventInvitation::where('event_id', $eventId)
                ->whereIn('status', ['pending', 'accepted'])
                ->pluck('recipient_id')
                ->toArray();

            $participantUserIds = EventParticipant::where('event_id', $eventId)
                ->pluck('user_id')
                ->toArray();

            $excludedUserIds = array_merge($invitedUserIds, $participantUserIds);

            $users = User::whereRaw('LOWER(name) LIKE ?', ['%' . $nameFragment . '%'])
                ->whereNotIn('id', $excludedUserIds)
                ->limit(20)
                ->get();

            if ($users->isEmpty()) {
                return response()->json([
                    'message' => 'No users found',
                    'users' => [],
                ], 200);
            }

            $users->makeVisible(['profile_image', 'user_type', 'role']);

            return response()->json([
                'message' => __('user.users_found'),
                'users' => $users,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('user.search_error'),
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
                return response()->json(['message' => __('user.not_found')], 404);
            }

            $user->update(['name' => $request->name]);

            return response()->json([
                'message' => __('user.updated_success'),
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('user.update_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the authenticated user's image.
     */
    public function updateImage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'profile_image' => 'required|mimes:jpeg,png,jpg,gif,svg,webp,heic|max:8192',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $user = Auth::user();
            $user = User::find($user->id);

            if (!$user) {
                return response()->json(['message' => __('user.not_found')], 404);
            }

            if ($request->hasFile('profile_image')) {
                if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
                    Storage::disk('public')->delete($user->profile_image);
                }

                $path = $request->file('profile_image')->store("profile_images/{$user->id}", 'public');
                $user->profile_image = $path;
                $user->save();
            }

            $user->makeVisible(['profile_image']);

            return response()->json([
                'message' => __('user.image_updated_success'),
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('user.image_update_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
