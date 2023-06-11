<?php

declare(strict_types=1);

namespace Booking;

use Illuminate\Support\ServiceProvider;

class BookingServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot(): void
    {
        // Publish Resources
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }
}
