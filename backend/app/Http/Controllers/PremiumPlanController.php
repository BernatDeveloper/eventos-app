<?php

namespace App\Http\Controllers;

use App\Models\PremiumPlan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PremiumPlanController extends Controller
{
    public function getPremiumPlan()
    {
        try {
            $user = Auth::user();
            $user = User::find($user->id);

            if (!$user) {
                return response()->json(['message' => __('premium.unauthenticated')], 401);
            }

            $lastTrial = PremiumPlan::where('user_id', $user->id)
                ->orderBy('started_at', 'desc')
                ->first();

            $now = Carbon::now();
            $response = [
                'is_premium' => $user->user_type === 'premium',
                'is_manual' => null,
                'expired_at' => null,
                'can_retry' => false,
                'retry_available_at' => null,
            ];

            if ($lastTrial) {
                $expiredAt = Carbon::parse($lastTrial->expired_at);

                if ($now->gt($expiredAt) && $user->user_type === 'premium') {
                    $user->user_type = 'free';
                    $user->save();
                    $response['is_premium'] = false;
                }

                $response['expired_at'] = $expiredAt->toIso8601String();
                $response['is_manual'] = (bool) $lastTrial->is_manual;

                $retryAvailableAt = $expiredAt->copy()->addDays(30);
                $canRetry = $retryAvailableAt->lte($now);

                $response['can_retry'] = $canRetry;
                $response['retry_available_at'] = $canRetry ? null : $retryAvailableAt->toIso8601String();
            }

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('premium.error_getting_plan'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function activate()
    {
        try {
            $user = Auth::user();
            $user = User::find($user->id);

            if (!$user) {
                return response()->json(['message' => __('premium.unauthenticated')], 401);
            }

            if ($user->user_type === 'premium') {
                return response()->json(['message' => __('premium.already_premium_user')], 403);
            }

            $lastTrial = PremiumPlan::where('user_id', $user->id)
                ->orderBy('started_at', 'desc')
                ->first();

            $now = Carbon::now();

            if ($lastTrial) {
                $isActive = $now->lt(Carbon::parse($lastTrial->expired_at));
                $canRetry = $now->gte(Carbon::parse($lastTrial->expired_at)->addDays(30));


                if ($isActive) {
                    return response()->json(['message' => __('premium.already_active')], 403);
                }

                if (!$canRetry) {
                    $daysLeft = 30 - $now->diffInDays(Carbon::parse($lastTrial->expired_at));
                    return response()->json(['message' => __('premium.retry_after_days', ['days' => $daysLeft])], 403);
                }
            }

            $user->premiumPlan()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'is_manual' => false,
                    'started_at' => $now,
                    'expired_at' => $now->copy()->addDays(2),
                ]
            );

            $user->user_type = 'premium';
            $user->save();

            return response()->json(['message' => __('premium.activated_successfully')], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('premium.error_activating'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
