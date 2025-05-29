<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventInvitation;
use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function index()
    {
        try {
            $stats = [
                'users' => User::count(),
                'events' => Event::count(),
                'invitations' => EventInvitation::count(),
                'categories' => EventCategory::count(),
            ];

            return response()->json([
                'message' => __('admin-stats.retrieved'),
                'stats' => $stats,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('admin-stats.error_retrieving'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
