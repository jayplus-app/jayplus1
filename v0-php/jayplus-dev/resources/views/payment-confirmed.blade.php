<x-livewire-layout>
    <x-slot name="header">
        <livewire:navigation />
    </x-slot>

    <div class="text-center">
        <img
            class="inline-block"
            style="height: 200px;"
            src="{{ asset('images/check-circle.svg') }}"
            alt="{{ config('app.name') }}"
        >
        <h1 class="text-xl text-gray-500 tracking-widest uppercase">Done Successfully</h1>
        <h2 class="text-lg text-gray-400 tracking-widest pb-5">Transaction Number: {{ $transaction->id }}</h2>

        <div class="flex flex-col items-center justify-center">
            <dl class="lg:w-96 w-full text-left border rounded bg-gray-50 px-4 py-2 grid grid-cols-2">
                <dt class="my-2 text-sm font-medium text-gray-500">Bill Number</dt>
                <dd class="my-2 text-sm text-gray-900">{{ $booking->id }}</dd>
                <dt class="mb-2 text-sm font-medium text-gray-500">Type of Service</dt>
                <dd class="mb-2 text-sm text-gray-900">{{ $booking->info['service_type'] }}</dd>
                <dt class="mb-2 text-sm font-medium text-gray-500">Vehicle Type</dt>
                <dd class="mb-2 text-sm text-gray-900">{{ $booking->info['vehicle_type'] }}</dd>
                <dt class="mb-2 text-sm font-medium text-gray-500">Time</dt>
                <dd class="mb-2 text-sm text-gray-900">{{ $booking->starts_at }}</dd>
                <dt class="mb-2 text-sm font-medium text-gray-500">Service Cost</dt>
                <dd class="mb-2 text-sm text-gray-900">{{ $booking->price }} $</dd>
                <dt class="mb-2 text-sm font-medium text-gray-500">Discount</dt>
                <dd class="mb-2 text-sm text-gray-900">Not Specified</dd>
                <dt class="mb-2 text-md font-bold text-gray-500">Total</dt>
                <dd class="mb-2 text-md font-bold text-gray-900">{{ $booking->price }} $</dd>
                <dt class="mb-2 text-md font-bold text-gray-500">Deposit</dt>
                <dd class="mb-2 text-md font-bold text-black">{{ number_format($transaction->value, 2) }} $</dd>
                <dt class="mb-2 text-md font-bold text-gray-500">Remaining</dt>
                <dd class="mb-2 text-md font-bold text-black">
                    {{ number_format($booking->price - $transaction->value, 2) }} $
                </dd>
            </dl>
        </div>

        <div class="mt-4 py-5">
            <a class="p-4 bg-yellow-500 w-20 rounded shadow text-black" href="{!! route('booking.instant') !!}">
                Back to Home
            </a>
        </div>
    </div>
</x-livewire-layout>
