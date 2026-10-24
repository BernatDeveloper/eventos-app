<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PremiumPlan extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'is_manual', 'started_at', 'expired_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
