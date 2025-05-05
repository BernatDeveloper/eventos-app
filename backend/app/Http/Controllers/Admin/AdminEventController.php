<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class AdminEventController extends Controller
{
    /**
     * Display a paginated list of events with optional title filter and related data.
     */
    public function index(Request $request)
    {
        try {
            // Start building the query
            $query = Event::with(['creator', 'location', 'category', 'participants']);

            // Apply title filter if provided
            if (!empty($request->title)) {
                $query->where('title', 'like', '%' . $request->title . '%');
            }

            /** @var \App\Models\Event $events */
            // Execute query with pagination (10 per page)
            $events = $query->paginate(10);


            // Make hidden fields of the creator and participants visible for each event
            $events->getCollection()->each(function ($event) {
                $event->creator->makeVisible(['profile_image', 'user_type', 'role']);
                $event->participants->makeVisible(['profile_image', 'user_type', 'role']);
            });

            return response()->json([
                'message' => __('admin-event.events_retrieved'),
                'data' => $events,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('admin-event.error_fetching_events'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
