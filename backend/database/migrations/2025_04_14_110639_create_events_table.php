<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // Clave foránea UUID para 'users'
            $table->uuid('creator_id');
            $table->foreign('creator_id')->references('id')->on('users')->onDelete('cascade');        
            
            // Claves foráneas autoincrementales
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('set null');
            $table->foreignId('category_id')->nullable()->constrained('event_categories')->onDelete('set null');
            
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('participant_limit')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
