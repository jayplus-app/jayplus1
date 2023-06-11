<?php

namespace App\Http\Livewire\Admin\Components;

use App\Models\Booking;
use Carbon\Carbon;
use Livewire\Component;

class BookingsIndex extends Component
{
    public string $tz;
    
    public $fromDate;

    public $visibleDays;

    public $bookings;

    public $bookingId;

    public $booking;

    public $detailsOpen = false;

    public $showConfirmDelete = false;

    public function mount()
    {
        $this->tz = config('jayplus.timezone');
        $this->visibleDays = config('jayplus.visible_days');
        $this->fromDate = Carbon::today($this->tz)->startOfDay();
        $this->booking = null;
        $this->refresh();
    }

    public function render()
    {
        if ($this->bookingId) {
            $this->booking = Booking::find($this->bookingId);
        }

        return view('livewire.admin.components.bookings-index');
    }

    public function showDetails($bookingId)
    {
        $this->bookingId = $bookingId;
        $this->detailsOpen = true;
    }

    public function hideDetails()
    {
        $this->detailsOpen = false;
    }

    public function previousDay()
    {
        $this->fromDate = $this->fromDate->subDay();
    }

    public function nextDay()
    {
        $this->fromDate = $this->fromDate->addDay();
    }

    public function refresh()
    {
        $daysToAdd = $this->visibleDays - 1;
        $toDate = $this->fromDate->copy()->addDays($daysToAdd)->endOfDay();
        $this->bookings = Booking::whereBetween('starts_at', [$this->fromDate, $toDate])->orderBy('starts_at')->get();
    }

    public function delete($bookingId)
    {
        $this->detailsOpen = true;
        $this->showConfirmDelete = true;
    }

    public function hideConfirmDelete()
    {
        $this->showConfirmDelete = false;
        $this->detailsOpen = true;
    }

    public function confirmDelete($bookingId)
    {
        $this->showConfirmDelete = false;
        $this->bookingId = null;
        $booking = Booking::find($bookingId);
        $booking->delete();
        $this->refresh();
    }
}
