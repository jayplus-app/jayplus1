<?php

declare(strict_types=1);

namespace Booking\Eloquent;

use Booking\Contracts\Bookable as BookableContract;
use Booking\TimeFrame;
use DateTime;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasBooking
{
    /**
     * The customer may have many bookings.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function bookings(): MorphMany
    {
        return $this->morphMany(static::getBookingModel(), 'booker');
    }

    public function book(BookableContract $bookable, TimeFrame $timeFrame) {
        $this->bookings()->create([
            'bookable_id' => $bookable->getKey(),
            'bookable_type' => $bookable->getMorphClass(),
            'customer_id' => $this->getKey(),
            'customer_type' => $this->getMorphClass(),
            'starts_at' => $timeFrame->getFrom(),
            'ends_at' => $timeFrame->getTo(),
        ]);
    }

    public function getBookings(?DateTime $from = null, ?DateTime $to = null): array
    {
        $query = $this->bookings;

        if ($from){
            $query = $query->fromDate($from);
        }

        if ($to){
            $query = $query->toDate($to);
        }

        return $query->toArray();
    }
}