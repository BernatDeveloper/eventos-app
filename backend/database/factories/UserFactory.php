<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Plain-text password of every generated user, so tests can log in with it.
     * It meets the register rules: uppercase, number and special character.
     */
    public const PASSWORD = 'Password.123';

    /**
     * The hashed password, computed once and shared by all users.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            // Hashing (bcrypt) is slow on purpose: do it only once per run
            'password' => static::$password ??= Hash::make(self::PASSWORD),
            // Fixed defaults: random values would make tests flaky
            'user_type' => 'free',
            'role' => 'user',
        ];
    }

    /**
     * Indicate that the user has a premium plan.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => 'premium',
        ]);
    }

    /**
     * Indicate that the user is an administrator (the seeder also makes them premium).
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => 'premium',
            'role' => 'admin',
        ]);
    }

    /**
     * Indicate that the user has a profile image.
     */
    public function withProfileImage(): static
    {
        return $this->state(fn (array $attributes) => [
            'profile_image' => 'profile_images/'.$this->faker->uuid().'/'.$this->faker->regexify('[A-Za-z0-9]{40}').'.jpg',
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
