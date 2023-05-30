<?php

namespace App\Models;

use Booking\Contracts\Bookable;
use Booking\Eloquent\Bookable as BookableModel;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends BookableModel
{
    use HasFactory;

    /**
     * @return array<int, Bookable>
     */
    public function getBookings(DateTime $from, DateTime $to): array
    {
        return $this->bookings()
            ->whereBetween('starts_at', [$from, $to])
            ->get()->toArray();
    }

    public function getCapacity(): int {
        return 3;
    }

    public function getDuration(): int
    {
        return $this->duration;
    }
}
