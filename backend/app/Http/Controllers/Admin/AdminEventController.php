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

            // Execute query with pagination (10 per page)
            $events = $query->paginate(10);

            return response()->json([
                'message' => 'Events retrieved successfully.',
                'data' => $events,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching events.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
