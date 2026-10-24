<?php

namespace Database\Factories;

use App\Models\EventCategory;
use App\Models\Location;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Starts in the future between 08:00 and 18:00 and lasts 1 to 3 hours,
        // so it always ends the same day and end > start (the API requires it)
        $start = Carbon::instance($this->faker->dateTimeBetween('+1 day', '+3 months'))
            ->setTime($this->faker->numberBetween(8, 18), 0);
        $end = $start->copy()->addHours($this->faker->numberBetween(1, 3));

        return [
            // A factory used as a value creates that related model on demand
            'creator_id' => User::factory(),
            'location_id' => Location::factory(),
            'category_id' => EventCategory::factory(),
            'title' => ucfirst($this->faker->words(3, true)),
            'description' => $this->faker->paragraph(),
            // The API accepts up to 100 participants
            'participant_limit' => $this->faker->numberBetween(2, 100),
            'start_date' => $start->toDateString(),
            'end_date' => $end->toDateString(),
            'start_time' => $start->format('H:i'),
            'end_time' => $end->format('H:i'),
        ];
    }

    /**
     * Indicate that the event has already finished.
     */
    public function past(): static
    {
        return $this->state(function (array $attributes) {
            $start = Carbon::instance($this->faker->dateTimeBetween('-3 months', '-1 day'))
                ->setTime($this->faker->numberBetween(8, 18), 0);
            $end = $start->copy()->addHours($this->faker->numberBetween(1, 3));

            return [
                'start_date' => $start->toDateString(),
                'end_date' => $end->toDateString(),
                'start_time' => $start->format('H:i'),
                'end_time' => $end->format('H:i'),
            ];
        });
    }

    /**
     * Indicate that the event has no participant limit (the column is nullable).
     */
    public function unlimited(): static
    {
        return $this->state(fn (array $attributes) => [
            'participant_limit' => null,
        ]);
    }

    /**
     * Register the creator as a participant once the event is created.
     * EventController::store does the same, so most permission tests need it.
     */
    public function withCreatorAsParticipant(): static
    {
        return $this->afterCreating(function ($event) {
            $event->participants()->attach($event->creator_id);
        });
    }
}
