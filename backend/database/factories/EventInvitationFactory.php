<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventInvitation>
 */
class EventInvitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            // Only the creator of the event can invite, so the sender is the
            // creator. A closure receives the attributes already evaluated.
            'sender_id' => fn (array $attributes) => Event::find($attributes['event_id'])?->creator_id,
            'recipient_id' => User::factory(),
            'status' => 'pending',
        ];
    }

    /**
     * Indicate that the invitation was accepted.
     */
    public function accepted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'accepted',
        ]);
    }

    /**
     * Indicate that the invitation was rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
        ]);
    }
}
