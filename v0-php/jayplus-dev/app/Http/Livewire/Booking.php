<?php

namespace App\Http\Livewire;

use App\Models\Booking as BookingModel;
use App\Models\Service;
use Carbon\Carbon;
use Livewire\Component;

class Booking extends Component
{
    public string $tz;

    public string $error;

    private ?Service $service;

    public $vehicleModels;

    public $allServiceTypes;

    public array $serviceTypes;

    public string $serviceType;

    public string $vehicleType;

    public string $serviceDescription;

    public string $vehicleTypeDescription;

    public $fromDate;

    public $lastBookableDate;

    public array $timeFrames;

    public Carbon $chosenTime;

    public $currency;

    public $visibleDays;
    
    public function mount()
    {
        $this->tz = config('jayplus.timezone');
        $this->vehicleModels = config('jayplus.vehicle_types');
        $this->allServiceTypes = config('jayplus.service_types');
        $this->vehicleType = 'Sedan';
        $this->serviceType = 'Show Room';
        $this->currency = '$'; // TODO: Read from config. Use this if suitable: config('cashier.currency');
        $this->fromDate = $this->firstBookableDate();
        $this->lastBookableDate = $this->fromDate->copy()->addDays(config('jayplus.bookable_days') - 1);
        $this->visibleDays = config('jayplus.visible_days');
    }

    private function firstBookableDate()
    {
        $today = Carbon::today($this->tz);
        $todayEndTime = $today->copy()->setTimeFromTimeString(config('jayplus.reception_end_time'));
        
        return $todayEndTime->gt(Carbon::now()) ? $today : Carbon::tomorrow($this->tz);
    }

    public function render()
    {
        $this->setService();
        $this->timeFrames = $this->getDailyTimeFrames();
        
        return view('livewire.booking');
    }

    private function setService()
    {
        if (! $this->vehicleType) {
            $this->serviceTypes = [];
            $this->serviceType = '';
            $this->service = null;
        } else {
            $services = Service::where('vehicle_model', $this->vehicleType)->get();

            if ($services->isEmpty()) {
                $this->serviceTypes = [];
                $this->serviceType = '';
                $this->service = null;
            } else {
                $this->serviceTypes = $services->pluck('service_type')->toArray();

                if ($services->count() > 1) {
                    if ($this->serviceType) {
                        $this->service = $services->where('service_type', $this->serviceType)->first();
                    } else {
                        $this->service = null;
                    }
                } else {
                    $service = $services->first();
                    $this->serviceType = $service->service_type;
                    $this->service = $service;
                }
            }
        }

        $this->setDescriptions();
    }

    private function setDescriptions()
    {
        $this->vehicleTypeDescription = $this->vehicleType ? $this->vehicleModels[$this->vehicleType]['description'] : '';

        $this->serviceDescription = $this->serviceType ? $this->allServiceTypes[$this->serviceType] : '';
    }

    public function setServiceType(string $type)
    {
        $this->serviceType = $type;
    }

    public function setVehicleType(string $model)
    {
        $this->vehicleType = $model;
    }

    public function previousDay()
    {
        if ($this->canGoPreviousDay()) {
            $this->fromDate = $this->fromDate->subDay();
        }
    }

    public function canGoPreviousDay()
    {
        return $this->firstBookableDate()->lt($this->fromDate);
    }

    public function nextDay()
    {
        if ($this->canGoNextDay()) {
            $this->fromDate = $this->fromDate->addDay();
        }
    }

    public function canGoNextDay()
    {
        $currentLastDay = $this->fromDate->copy()->addDays($this->visibleDays - 1);

        return ! $this->lastBookableDate->isSameDay($currentLastDay);
    }

    public function setChosenTime(string $time)
    {
        $this->chosenTime = new Carbon($time, $this->tz);
    }

    public function goToPayment()
    {
        // TODO: Validate chosenTime

        $this->setService();

        if (! $this->service) {
            return;
        }
        
        $duration = $this->service->getDuration();
        $endTime = $this->chosenTime->copy()->addMinutes($duration);

        $serviceInfo = [
            'vehicle_type'         => $this->vehicleType,
            'service_type'      => $this->serviceType,
            'estimated_minutes' => $duration,
        ];

        $booking = new BookingModel();
        $booking->bookable()->associate($this->service);
        $booking->price = $this->service->price;
        $booking->starts_at = $this->chosenTime->tz('UTC');
        $booking->ends_at = $endTime->tz('UTC');
        $booking->info = $serviceInfo;
        $booking->save();

        session(['booking_id' => $booking->id]);
        
        redirect()->route('booking.invoice');
    }

    private function getDailyTimeFrames(): array
    {
        $to = $this->fromDate->copy()->addDays($this->visibleDays - 1)->endOfDay();
        $timeframes = collect($this->getTimeFrames($this->fromDate, $to))->groupBy(function($item) {
            return $item['start']->format('Y-m-d');
        });
        
        return $timeframes->mapWithKeys(function ($frames, $date) { return [$date => $frames->all()];})->all();
    }

    /**
     * @return array<int, array>
     */
    private function getTimeFrames(Carbon $from, Carbon $to): array
    {
        $dbTimezone = config('app.timezone');

        if (! $this->service) {
            return [];
        }
        
        // Initialize primitives
        $duration = $this->service->getDuration();
        $capacity = $this->getCapacity();
        $timeslotMinutes = config('jayplus.timeslot_minute');
        $timeslotManminutes = $timeslotMinutes * $capacity;
        $threshold = config('jayplus.timeslot_threshold') / 100;
        $maxOverflow = intval($timeslotManminutes * $threshold);

        // Initialize times
        $start = $from->copy()->setTimeFromTimeString(config('jayplus.reception_start_time'));
        $end = $start->copy()->addMinutes($timeslotMinutes);
        $receptionStart = $start->copy();
        $receptionEnd = $to->copy()->setTimeFromTimeString(config('jayplus.reception_end_time'));
        
        $filterFrom = $from->copy()->tz($dbTimezone);
        $filterTo = $to->copy()->tz($dbTimezone);
        $bookings = BookingModel::whereBetween('starts_at', [$filterFrom, $filterTo])->get();

        $lastOverflow = 0;
        $timeFrames = [];

        while ($end->lte($to)) {
            $isPast = Carbon::now($this->tz)->gt($start);
            $isLastTimeslotOfDay = $end->gte($receptionEnd->copy()->setDateFrom($start));


            $filterStart = $start->copy()->tz($dbTimezone);
            $filterEnd = $end->copy()->tz($dbTimezone);
            $sum = $bookings->where('starts_at', $filterStart)->sum('info.estimated_minutes');
            $sumNext = $bookings->where('starts_at', $filterEnd)->sum('info.estimated_minutes');

            $nextOverflow = max(0, $sumNext - $timeslotManminutes); // TODO: Must check if next timeslot is the last timeslot of the day
            $allowedOverflow = $isLastTimeslotOfDay ? 0 : $maxOverflow - $nextOverflow;
            $maxCalc = $timeslotManminutes + $allowedOverflow - $lastOverflow;
            $remained = $maxCalc - $sum;
            $available = (! $isPast) && ($remained - $duration >= 0);

            $timeFrames[] = [
                'start'         => $start,
                'end'           => $end,
                'freeMinutes'   => $remained,
                'available'     => $available,
                'isPast'        => $isPast,
            ];

            if ($isLastTimeslotOfDay) {
                $receptionStart = $receptionStart->addDay();
                $receptionEnd = $receptionEnd->addDay();
                $start = $receptionStart->copy();
                $lastOverflow = 0;
            } else {
                $start = $end;
                $lastOverflow = max(0, $sum - $timeslotManminutes);
            }
            
            $end = $start->copy()->addMinutes($timeslotMinutes);
        }

        return $timeFrames;
    }

    private function getCapacity()
    {
        return config('jayplus.service_capacity');
    }
}
