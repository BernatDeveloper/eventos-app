<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Event extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'creator_id',
        'location_id',
        'category_id',
        'title',
        'description',
        'participant_limit',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'participant_limit' => 'integer',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    // Creator of the event
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    // Event location
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Event category
    public function category()
    {
        return $this->belongsTo(EventCategory::class);
    }

    // Users participating in the event
    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_participants')
            ->withTimestamps();
    }

    public function invitations()
    {
        return $this->hasMany(EventInvitation::class);
    }

    protected static function booted()
    {
        static::deleting(function ($event) {
            foreach ($event->invitations as $invitation) {
                $invitation->delete();
            }
        });
    }
}
