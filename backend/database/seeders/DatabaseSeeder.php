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
User::factory()->count(20)->create();
$this->command->info('¡Usuarios aleatorios creados!');

    }
}