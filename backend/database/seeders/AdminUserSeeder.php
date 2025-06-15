<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            // Condición de búsqueda
            ['email' => env('ADMIN_EMAIL')],
            // Datos a crear o actualizar
            [
                'name' => env('ADMIN_NAME'),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
                'profile_image' => null,
                'user_type' => 'premium',
                'role' => 'admin',
            ]
        );
    }
}
