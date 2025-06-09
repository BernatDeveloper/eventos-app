<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPremiumStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $user = User::find($user->id);

        if ($user) {
            $premiumPlan = $user->premiumPlan;

            if ($premiumPlan) {
                if ($premiumPlan->expired_at !== null && now()->gt($premiumPlan->expired_at)) {
                    if (empty($premiumPlan->is_manual) || $premiumPlan->is_manual === false) {
                        $user->user_type = 'free';
                        $user->save();
                        //$premiumPlan->delete();
                    }
                }
            } else {
                if ($user->user_type !== 'free') {
                    $user->user_type = 'free';
                    $user->save();
                }
            }
        }

        return $next($request);
    }
}
