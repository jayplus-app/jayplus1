<?php

declare(strict_types=1);

namespace Booking\Contracts;

use DateTime;

interface Bookable
{
    /**
     * @return array<int, Bookable>
     */
    public function getBookings(DateTime $from, DateTime $to): array;

    /**
     * Duration in Minutes
     * 
     * @return int
     */
    public function getDuration(): int;
}