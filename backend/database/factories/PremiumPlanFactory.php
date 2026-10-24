<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PremiumPlan>
 */
class PremiumPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Default: the 2-day trial that PremiumPlanController::activate creates
        return [
            'user_id' => User::factory(),
            'is_manual' => false,
            'started_at' => now(),
            'expired_at' => now()->addDays(2),
        ];
    }

    /**
     * Indicate that the trial has already expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'started_at' => now()->subDays(10),
            'expired_at' => now()->subDays(8),
        ]);
    }

    /**
     * Indicate that an admin granted the plan: it never expires.
     */
    public function manual(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_manual' => true,
            'expired_at' => null,
        ]);
    }
}
