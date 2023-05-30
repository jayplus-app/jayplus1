<?php

declare(strict_types=1);

namespace Booking;

use DateTime;

class TimeFrame
{
    private DateTime $from;

    private DateTime $to;

    public function __construct(DateTime $from, DateTime $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function getFrom(): DateTime
    {
        return $this->from;
    }

    public function getTo(): DateTime
    {
        return $this->to;
    }
}