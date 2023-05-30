<?php

namespace App\Providers;

use App\Http\Middleware\TeamsPermission;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Livewire::addPersistentMiddleware([
            TeamsPermission::class,
        ]);
    }
}
