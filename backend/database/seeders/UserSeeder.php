<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str; // Asegúrate de importar Str

class UserSeeder extends Seeder
{
    public function run(): void
    {

        User::factory(20)->create();

        // User::create([
        //     'id' => Str::uuid(),
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        //     'password' => Hash::make('password123'),
        //     'profile_image' => '',
        //     'user_type' => 'premium',
        //     'role' => 'admin',
        // ]);

        // User::create([
        //     'id' => Str::uuid(),
        //     'name' => 'Moderator User',
        //     'email' => 'moderator@example.com',
        //     'password' => Hash::make('password123'),
        //     'profile_image' => '',
        //     'user_type' => 'premium',
        //     'role' => 'moderator',
        // ]);

        // User::create([
        //     'id' => Str::uuid(),
        //     'name' => 'Regular User',
        //     'email' => 'user@example.com',
        //     'password' => Hash::make('password123'),
        //     'profile_image' => '',
        //     'user_type' => 'free',
        //     'role' => 'user',
        // ]);
    }
}
