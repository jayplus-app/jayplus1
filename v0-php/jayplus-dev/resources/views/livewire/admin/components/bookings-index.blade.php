<div>
    <h3 class="pb-2">Bookings</h3>
    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-1">
            <button class="py-4 w-full rounded bg-gray-200 hover:bg-yellow-400" wire:click="previousDay()">«</button>
        </div>
        <div class="col-span-10 pb-5 text-center">
            <div class="grid grid-cols-{{ $this->visibleDays }} gap-2 mb-2">
            @for($i = 0; $i < $this->visibleDays; $i++)
                <div class="py-1 rounded border border-gray-300">
                    @php
                        $carbon = $this->fromDate->copy()->addDays($i);
                    @endphp
                    <b>
                        {{ 
                        $carbon->eq(Carbon\Carbon::today('EST')) ?
                            'Today' :
                            ($carbon->eq(Carbon\Carbon::tomorrow('EST')) ? 'Tomorrow' :
                            $carbon->shortDayName)
                        }}
                    </b>
                    <br>
                    <small>{{ $carbon->format('m/d') }}</small>
                </div>
            @endfor
            </div>
            <div class="grid grid-cols-{{ $this->visibleDays }} gap-2">
            @for($i = 0; $i < $this->visibleDays; $i++)
                @php
                    $startOfDay = $this->fromDate->copy()->addDays($i)->startOfDay();
                    $endOfDay = $startOfDay->copy()->endOfDay();
                @endphp
                <div>
                @foreach($this->bookings->whereBetween('starts_at', [$startOfDay, $endOfDay])->all() as $booking)
                    <button class="py-2 px-3 w-full shadow mb-3 bg-gray-200 rounded row-{{ $i }}" wire:click="showDetails({{ $booking->id }})">
                        <ul class="text-left">
                            <li>{{ Carbon\Carbon::instance($booking->starts_at)->tz($this->tz)->format('H:i') }}</li>
                            <li>{{ $booking->info['vehicle_type'] }}</li>
                            <li>{{ $booking->info['service_type'] }}</li>
                        </ul>
                    </button>
                @endforeach
                </div>
            @endfor
            </div>
        </div>
        <div class="col-span-1">
            <button class="py-4 w-full rounded bg-gray-200 hover:bg-yellow-400" wire:click="nextDay()">»</button>
        </div>
    </div>

    <div tabindex="-1" class="{{ $detailsOpen ? '' : 'hidden' }} bg-gray-600 bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" wire:click="hideDetails()">
        <div class="w-auto lg:w-96 relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">BOOKING DETAILS</h3>
                @if($this->booking)
                <div class="mt-2 py-3">
                    <dl class="text-left border rounded bg-gray-50 px-4 py-2 grid grid-cols-2">
                        <dt wire: class="my-2 text-sm font-medium text-gray-500">
                            Transaction Number
                        </dt>
                        <dd class="my-2 text-sm text-gray-900">
                            {{ $this->booking->transactions->first()->id }}
                        </dd>
                        <dt class="my-2 text-sm font-medium text-gray-500">
                            Bill Number
                        </dt>
                        <dd class="my-2 text-sm text-gray-900">
                            {{ $this->booking->id }}
                        </dd>
                        <dt class="my-2 text-sm font-medium text-gray-500">
                            Phone
                        </dt>
                        <dd class="my-2 text-sm text-gray-900">
                            {{ $this->booking->booker->phone }}
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Type of Service
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            {{ $this->booking->info['service_type'] }}
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Vehicle Type
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            {{ $this->booking->info['vehicle_type'] }}
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Date
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            {{ $this->booking->starts_at->format('Y-m-d') }}
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Time
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            {{ $this->booking->starts_at->format('H:i') }} - {{ $this->booking->ends_at->format('H:i') }}
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Service Cost
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            {{ $this->booking->price }} $
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Discount
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            Not Specified
                        </dd>
                        <dt class="mb-2 text-md font-bold text-gray-500">
                            Total
                        </dt>
                        <dd class="mb-2 text-md font-bold text-gray-900">
                            {{ $this->booking->price }} $
                        </dd>
                        <dt class="mb-2 text-md font-bold text-gray-500">
                            Deposit
                        </dt>
                        <dd class="mb-2 text-md font-bold text-black">
                            {{ number_format($this->booking->transactions->first()->deposit, 2) }} $
                        </dd>
                        <dt class="mb-2 text-sm font-medium text-gray-500">
                            Remaining
                        </dt>
                        <dd class="mb-2 text-sm text-gray-900">
                            {{ number_format($this->booking->price - $this->booking->transactions->first()->deposit, 2) }} $
                        </dd>
                    </dl>
                </div>
                <div class="items-center px-4 py-3">
                    <button
                        wire:click="delete({{ $bookingId }})"
                        type="button"
                        class="bg-red-700 text-white hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-gray-100 dark:border-red-500 dark:hover:text-red dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Delete
                    </button>
                    <button
                        wire:click="hideDetails()"
                        type="button"
                        class="bg-yellow-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Close
                    </button>
                </div>
                @endif
            </div>
        </div>
    </div>

    <div @click.outside="$wire.hideConfirmDelete()" tabindex="-1" class="{{ $showConfirmDelete ? '' : 'hidden' }} bg-gray-600 bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-60 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div class="w-auto lg:w-96 relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">CONFIRM DELETING</h3>
                <div class="mt-2 py-3">
                    <p>Are you sure you want to delete the booking?</p>
                    <button
                        wire:click="hideConfirmDelete()"
                        type="button"
                        class="bg-yellow-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        No
                    </button>
                    @if($bookingId)
                    <button
                        wire:click="confirmDelete({{ $bookingId }})"
                        type="button"
                        class="bg-red-700 text-white hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-gray-100 dark:border-red-500 dark:hover:text-red dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Yes
                    </button>
                    @endif
                </div>
            </div>
        </div>
    </div>

</div>
