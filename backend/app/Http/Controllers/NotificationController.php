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
                'message' => 'All notifications retrieved successfully.',
                'notifications' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving notifications.',
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
                'message' => 'Unread notifications retrieved successfully.',
                'notifications' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving unread notifications.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display read notifications for the authenticated user.
     */
    public function read()
    {
        try {
            $notifications = Auth::user()->readNotifications;

            return response()->json([
                'message' => 'Read notifications retrieved successfully.',
                'notifications' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving read notifications.',
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
                    'message' => 'Notification not found.',
                ], 404);
            }

            $notification->markAsRead();

            return response()->json([
                'message' => 'Notification marked as read.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error marking notification as read.',
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
                'message' => 'All notifications marked as read.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error marking notifications as read.',
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
                    'message' => 'Notification not found.',
                ], 404);
            }

            $notification->delete();

            return response()->json([
                'message' => 'Notification deleted successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting notification.',
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
                'message' => 'All notifications have been deleted.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting notifications.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
