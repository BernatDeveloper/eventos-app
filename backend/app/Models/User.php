<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasUuids;

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
     * The attributes that should be hidden for arrays and JSON.
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
     * The attributes that should be cast to native types.
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
    | JWT Methods
    |--------------------------------------------------------------------------
    */

    /**
     * Get the identifier that will be stored in the JWT subject claim.
     *
     * @return mixed
     */
    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    /**
     * Return a key-value array of custom claims to be added to the JWT.
     *
     * @return array<string, mixed>
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /**
     * Get all events created by the user.
     */
    public function createdEvents()
    {
        return $this->hasMany(Event::class, 'creator_id');
    }

    /**
     * Get all events the user has joined.
     */
    public function joinedEvents()
    {
        return $this->belongsToMany(Event::class, 'event_participants')->withTimestamps();
    }

    /**
     * Get premium pan of user.
     */
    public function premiumPlan()
    {
        return $this->hasOne(PremiumPlan::class);
    }
}
