<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'address' => $this->faker->address(),
            // Columns are decimal(10, 7): faker returns valid coordinates
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];
    }

    /**
     * Indicate that the location only has a name (address and coordinates are nullable).
     */
    public function withoutCoordinates(): static
    {
        return $this->state(fn (array $attributes) => [
            'address' => null,
            'latitude' => null,
            'longitude' => null,
        ]);
    }
}
