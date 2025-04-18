<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request and check if the user has 'admin' role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Retrieve the authenticated user from the API guard
        $user = auth('api')->user();

        if ($user && $user->role === 'admin') {
            return $next($request);
        }

        return response()->json([
            'message' => 'You are not authorized to access this resource. Admin privileges are required.'
        ], 403);
    }
}
