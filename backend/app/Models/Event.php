<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    // Creador del evento (User)
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    // Ubicación del evento (Location)
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Categoría del evento (EventCategory)
    public function category()
    {
        return $this->belongsTo(EventCategory::class);
    }

    // Obtener cuantos Users apuntados hay en el Event
    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_participants')->withTimestamps();
    }
}
