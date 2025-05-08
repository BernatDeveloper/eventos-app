<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display all notifications for the authenticated user.
     */
    public function index()
    {
        try {
            $notifications = Auth::user()->notifications;

            return response()->json([
                'message' => __('notifications.retrieved_all'),
                'notifications' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.retrieval_error_all'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get count of notifications unread
     */
    public function count()
    {
        try {
            $user = Auth::user();
            $count = $user->unreadNotifications->count();

            return response()->json([
                'message' => __('notifications.retrieved_count'),
                'count' => $count,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.retrieval_error_count'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display unread notifications for the authenticated user.
     */
    public function unread()
    {
        try {
            $notifications = Auth::user()->unreadNotifications;

            return response()->json([
                'message' => __('notifications.retrieved_unread'),
                'notifications' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.retrieval_error_unread'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mark a specific notification as read.
     */
    public function markAsRead($id)
    {
        try {
            $notification = Auth::user()->notifications->find($id);

            if (!$notification) {
                return response()->json([
                    'message' => __('notifications.not_found'),
                ], 404);
            }

            $notification->markAsRead();

            return response()->json([
                'message' => __('notifications.marked_as_read'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.mark_as_read_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mark all unread notifications as read.
     */
    public function markAllAsRead()
    {
        try {
            Auth::user()->unreadNotifications->markAsRead();

            return response()->json([
                'message' => __('notifications.marked_all_as_read'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.mark_all_as_read_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a specific notification.
     */
    public function destroy($id)
    {
        try {
            $notification = Auth::user()->notifications->find($id);

            if (!$notification) {
                return response()->json([
                    'message' => __('notifications.not_found'),
                ], 404);
            }

            $notification->delete();

            return response()->json([
                'message' => __('notifications.deleted'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.delete_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete all notifications of the authenticated user.
     */
    public function clear()
    {
        try {
            Auth::user()->notifications->delete();

            return response()->json([
                'message' => __('notifications.deleted_all'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('notifications.delete_all_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
