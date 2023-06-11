<?php

declare(strict_types=1);

namespace Booking\Contracts;

use Booking\TimeFrame;
use DateTime;

interface Booker
{
    public function book(Bookable $bookable, TimeFrame $timeSlot);

    public function getBookings(DateTime $from, DateTime $to): array;
}