<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_invitations', function (Blueprint $table) {
            $table->id();
            
            $table->uuid('event_id');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            
            $table->uuid('sender_id'); // el que envía (el creador)
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            
            $table->uuid('recipient_id'); // el que recibe (el invitado)
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');
            
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            
            $table->timestamps();

            $table->unique(['event_id', 'recipient_id']); // evitar duplicar invitaciones
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_invitations');
    }
};