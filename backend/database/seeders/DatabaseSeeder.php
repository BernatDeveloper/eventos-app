<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(AdminUserSeeder::class);
$this->command->info('Admin creado. Ahora se crean los 20 usuarios aleatorios...');
// The factory creates free users by default: mix in some premium ones
User::factory()->count(10)->create();
User::factory()->count(10)->premium()->create();
$this->command->info('¡Usuarios aleatorios creados!');

    }
}