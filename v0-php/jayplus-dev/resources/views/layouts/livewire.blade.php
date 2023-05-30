<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @stack('head-styles')
        <livewire:styles />
    </head>
    <body class="font-sans antialiased">
        <div class="min-h-screen bg-gray-100">
            

            <!-- Page Heading -->
            @can('manage bookings')
                @if (isset($header))
                    <header class="bg-white shadow">
                        {{ $header }}
                    </header>
                @endif
            @endcan

            <!-- Page Content -->
            <main class="max-w-7xl mx-auto bg-white overflow-hidden sm:rounded-lg p-4 @can('manage bookings'){{ isset($header) ? 'mt-2' : '' }}@endcan">
                {{ $slot }}
            </main>
        </div>
        <livewire:scripts />
        @stack('foot-scripts')
    </body>
</html>
