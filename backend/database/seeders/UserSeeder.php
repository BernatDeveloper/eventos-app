<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'profile_image' => 'default.png',
            'user_type' => 'premium',
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
            'password' => Hash::make('password123'),
            'profile_image' => 'default.png',
            'user_type' => 'premium',
            'role' => 'moderator',
        ]);

        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'profile_image' => 'default.png',
            'user_type' => 'free',
            'role' => 'user',
        ]);
    }
}
