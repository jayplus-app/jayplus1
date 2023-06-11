<?php

namespace Booking\Eloquent;

use Booking\Contracts\Bookable as BookableContract;
use Booking\Contracts\Booker;
use Booking\Contracts\Booking as BookingContract;
use Booking\TimeFrame;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Booking extends Model implements BookingContract
{
    use HasFactory;

    public function getTimeFrame(): TimeFrame
    {
        return new TimeFrame($this->starts_at, $this->ends_at);
    }

    public function getBookable(): BookableContract
    {
        return $this->bookable;
    }

    public function getBooker(): Booker
    {
        return $this->booker;
    }

    /**
     * Get the owning resource model.
     *
     * @return MorphTo
     */
    public function bookable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the booker.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function booker(): MorphTo
    {
        return $this->morphTo();
    }
}
