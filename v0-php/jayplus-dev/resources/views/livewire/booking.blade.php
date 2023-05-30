<div>
    <h4 class="pb-2">Vehicle Type</h4>
    <div class="mb-5 grid grid-cols-{{ count(config('jayplus.vehicle_types')) }} gap-4">
        @foreach($vehicleModels as $model => $props)
            <button class="p-1 py-4 bg-{{ $vehicleType === $model ? 'yellow-500' : 'gray-200' }} rounded shadow text-black" wire:click="setVehicleType('{{ $model }}')">{{ $model }}</button>
        @endforeach
    </div>
    @if($vehicleTypeDescription)
        <div class="mb-5 px-4 py-2 text-xs text-emerald-900 bg-emerald-50 rounded border-2 border-emerald-600">
            <p>{!! $vehicleTypeDescription !!}</p>
        </div>
    @endif
    <h4 class="pb-2">Type of Service</h4>
    <div class="mb-5 grid grid-cols-{{ count($allServiceTypes) }} gap-4">
        @foreach($allServiceTypes as $type => $description)
            <button class="p-4 bg-{{ $serviceType === $type ? 'yellow-500' : 'gray-200' }} text-black disabled:bg-gray-700:text-white rounded shadow"
                wire:click="setServiceType('{{ $type }}')"
                @if(! in_array($type, $this->serviceTypes))
                    disabled="disabled"
                @endif
            >
                {{ $type }}
            </button>
        @endforeach
    </div>
    @if($serviceDescription)
        <div class="mb-5 px-4 py-2 text-xs text-emerald-900 bg-emerald-50 rounded border-2 border-emerald-600">
            <p>{!! $serviceDescription !!}</p>
        </div>
    @endif
    <h4 class="pb-2">Time Selection</h4>
    <div class="grid grid-cols-12 gap-2 pb-5 text-center">
        <div class="col-span-1">
            <button class="py-4 w-full rounded bg-gray-200 hover:bg-yellow-400" wire:click="previousDay()" {{ $this->canGoPreviousDay() ? '' : 'disabled' }}>«</button>
        </div>
        <div class="col-span-10">
            <div class="grid grid-cols-{{ $visibleDays }} gap-2 mb-2">
            @for($i = 0; $i < $this->visibleDays; $i++)
                <div class="py-1 rounded border border-gray-300">
                    @php
                        $carbon = $this->fromDate->copy()->addDays($i);
                    @endphp
                    <b>
                        {{ 
                        $carbon->eq(Carbon\Carbon::today($tz)) ?
                            'Today' :
                            ($carbon->eq(Carbon\Carbon::tomorrow($tz)) ? 'Tomorrow' :
                            $carbon->shortDayName)
                        }}
                    </b>
                    <br>
                    <small>{{ $carbon->format('m/d') }}</small>
                </div>
            @endfor
            </div>
            <div class="grid grid-cols-{{ $visibleDays }} gap-2">
            @if($this->service)
                @foreach($timeFrames as $date => $frames)
                    <div>
                        @foreach($frames as $tf)
                            <button class="py-4 w-full mb-3 rounded 
                                row-{{ $i }}
                                @if($tf['available'])
                                    shadow {{ $chosenTime == new Carbon\Carbon($tf['start'], $tz) ? 'bg-yellow-500' : 'bg-gray-200' }}"
                                @else
                                    bg-gray-100 text-gray-400" disabled
                                @endif
                                wire:click="setChosenTime('{{ new Carbon\Carbon($tf['start'], $tz) }}')"
                            >
                                {{ (new Carbon\Carbon($tf['start'], $tz))->format('g:i A') }}
                            </button>
                        @endforeach
                    </div>
                @endforeach
            @else
                <div class="col-span-{{ $visibleDays }}">Please choose service options above.</div>
            @endif
            </div>
        </div>
        <div class="col-span-1">
            <button class="py-4 w-full rounded bg-gray-200 hover:bg-yellow-400" wire:click="nextDay()" {{ $this->canGoNextDay() ? '' : 'disabled' }}>»</button>
        </div>
    </div>

    <div class="pb-5 text-center">
        Price: <b class="pb-2">{{ $this->service ? $this->service->price . ' ' . $currency : 'Not Available!' }}</b>
    </div>
    <div class="pb-5 text-center">
        <button class="p-1 py-4 w-1/2 shadow mb-3 bg-yellow-500 rounded disabled:bg-gray-700:text-white" {{ $this->service && $chosenTime ? '' : 'disabled' }} wire:click="goToPayment()">
            Payment
        </button>
    </div>
</div>