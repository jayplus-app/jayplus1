<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Booking\Contracts\Booker;
use Booking\Eloquent\HasBooking;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements Booker
{
    use HasApiTokens, HasFactory, Notifiable, HasBooking, Billable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function getBookingModel(): string
    {
        return Booking::class;
    }

    public function getBookings(DateTime $from, DateTime $to): array
    {
        return $this->bookings->toArray();
    }
}
