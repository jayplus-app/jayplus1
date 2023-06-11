<?php

namespace App\Models;

use Booking\Eloquent\Booking as EloquentBooking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends EloquentBooking
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'info'      => 'array',
        'starts_at' => 'datetime:Y-m-d H:i',
        'ends_at'   => 'datetime:Y-m-d H:i',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
