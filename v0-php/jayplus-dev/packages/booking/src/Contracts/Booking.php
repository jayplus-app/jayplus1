<?php

declare(strict_types=1);

namespace Booking\Contracts;

use Booking\TimeFrame;

interface Booking
{
    public function getTimeFrame(): TimeFrame;

    public function getBookable(): Bookable;

    public function getBooker(): Booker;
}