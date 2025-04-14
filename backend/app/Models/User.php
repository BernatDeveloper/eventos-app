<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasUuids; // HasUuids generate auto id when we create a user

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image',
        'user_type',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'profile_image',
        'user_type',
        'role',
    ];

    /** 
     * Devuelve el identificador que será almacenado en el token JWT. 
     * 
     * @return mixed 
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /** 
     * Devuelve un arreglo de claims personalizados para el token JWT. 
     * 
     * @return array<string, mixed> 
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'user_type' => 'string',
            'role' => 'string',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */

    // Obtener eventos creados por el User
    public function createdEvents()
    {
        return $this->hasMany(Event::class, 'creator_id');
    }

    // Obtener en cuantos eventos participa el User
    public function joinedEvents()
    {
        return $this->belongsToMany(Event::class, 'event_participants')
            ->withTimestamps();
    }
}
