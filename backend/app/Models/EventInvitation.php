<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\DatabaseNotification;

class EventInvitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'sender_id',
        'recipient_id',
        'status',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function notifications()
    {
        return $this->hasMany(DatabaseNotification::class, 'data->invitation_id', 'id');
    }

    protected static function booted()
    {
        static::deleting(function ($invitation) {
            $invitation->notifications()->delete();
        });
    }
}
