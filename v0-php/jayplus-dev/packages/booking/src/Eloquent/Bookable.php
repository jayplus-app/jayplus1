<?php

declare(strict_types=1);

namespace Booking\Eloquent;

use Booking\Contracts\Bookable as BookableContract;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

abstract class Bookable extends Model implements BookableContract
{
    /**
     * @return array<int, Bookable>
     */
    public function getBookings(DateTime $from, DateTime $to): array
    {
        return $this->bookings()->where('starts_at', $from)->where('ends_at', $to)->get()->all();
    }

    public function bookings(): MorphMany
    {
        return $this->morphMany(Booking::class, 'bookable', 'bookable_type', 'bookable_id');
    }
}