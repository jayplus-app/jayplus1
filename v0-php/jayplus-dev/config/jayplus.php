<?php

return [
    'deposit_percent'       => env('DEPOSIT_PERCENT'),
    'deposit_min'           => env('DEPOSIT_MIN'),
    'deposit_max'           => env('DEPOSIT_MAX'),
    'service_duration'      => env('SERVICE_DURATION'),
    'service_capacity'      => env('SERVICE_CAPACITY'),
    'visible_days'          => env('VISIBLE_DAYS'),
    'bookable_days'         => env('BOOKABLE_DAYS'),
    'timezone'              => env('BOOKING_TIMEZONE'),
    'reception_start_time'  => env('RECEPTION_START_TIME'),
    'reception_end_time'    => env('RECEPTION_END_TIME'),
    'timeslot_minute'       => env('TIMESLOT_MINUTE'),
    'timeslot_threshold'    => env('TIMESLOT_THRESHOLD'),

    'service_types' => [
        'Show Room' => "
<div class=\"grid grid-cols-2 gap-3\">
    <ul class=\"list-disc list-inside\">
        <li>Complete Interior Fine Detail with Shampoo</li>
        <li>Full Steam Cleaning on the Dashboard</li>
        <li>Full Steam Cleaning on seats and Floor</li>
        <li>Vacuum (Including Trunk Compartment)</li>
        <li>Detail all Panels, Surfaces & Compartments, etc.</li>
        <li>Shampoo Clean all Carpeted Areas (Cloth Seats Included)</li>
        <li>Shampoo Clean Leather Seats</li>
        <li>Leather Conditioner if you have leather</li>
        <li>Remove all Salt Stains</li>
        <li>Interior Polish on Dashboard, Doors, and Leather Seats</li>
        <li>Remove & Wash all Rubber Mats / Shampoo & Extract all Carpeted Mats</li>
        <li>Interior Shine on Dashboard, Doors, and Leather Seats</li>
    </ul>
    <ul class=\"list-disc list-inside\">
        <li>Apply Odor Eliminator</li>
        <li>Final Inspection & Touch Up’s</li>
        <li>Meticulous Foam & Hand Wash</li>
        <li>Full Body Wax</li>
        <li>Remove Brake Dust from Wheels, Clean & Dress Tires</li>
        <li>Full Wax on Tires</li>
        <li>Power Wash & Clean Wheel Wells</li>
        <li>Shampoo Clean and Dress Engine</li>
        <li>Air Dry Entire Vehicle</li>
        <li>Clean Exterior and Interior Glass</li>
        <li>Wipe Down Door Jams</li>
    </ul>
</div>",
        'Basic' => "
<div class=\"grid grid-cols-2 gap-3\">
    <ul class=\"list-disc list-inside\">
        <li>Vacuum (Including Trunk Compartment)</li>
        <li>Remove & Wash all Rubber Mats</li>
        <li>Wipe All Over The dashboard</li>
    </ul>
    <ul class=\"list-disc list-inside\">
        <li>Power Wash Body and Windows</li>
        <li>Power Wash & Clean Wheel Wells</li>
    </ul>
</div>",
        'Interior' => "
<div class=\"grid grid-cols-2 gap-3\">
    <ul class=\"list-disc list-inside\">
        <li>Complete Interior Fine Detail with Shampoo</li>
        <li>Full Steam Cleaning on the Dashboard</li>
        <li>Full Steam Cleaning on seats and Floor</li>
        <li>Vacuum (Including Trunk Compartment)</li>
        <li>Detail all Panels, Surfaces & Compartments, etc.</li>
        <li>Shampoo Clean all Carpeted Areas (Cloth Seats Included)</li>
        <li>Shampoo Clean Leather Seats</li>
    </ul>
    <ul class=\"list-disc list-inside\">
        <li>Leather Conditioner</li>
        <li>Remove all Salt Stains</li>
        <li>Interior Polish on Dashboard, Doors, and Leather Seats</li>
        <li>Remove & Wash all Rubber Mats / Shampoo & Extract all Carpeted Mats</li>
        <li>Interior Shine on Dashboard, Doors, and Leather Seats</li>
        <li>Apply Odor Eliminator</li>
        <li>Final Inspection & Touch Up</li>
    </ul>
</div>",
        'Exterior' => "
<div class=\"grid grid-cols-2 gap-3\">
    <ul class=\"list-disc list-inside\">
        <li>Meticulous Foam & Hand Wash</li>
        <li>Remove Brake Dust from Wheels, Clean & Dress Tires</li>
        <li>Power Wash & Clean Wheel Wells</li>
    </ul>
    <ul class=\"list-disc list-inside\">
        <li>Shampoo Clean and Dress Engine</li>
        <li>Air Dry Entire Vehicle</li>
        <li>Clean Windows</li>
        <li>Wipe Down Door Jams</li>
    </ul>
</div>",
    ],

    'vehicle_types' => [
        'Sedan' => [
            'description' => "Any 5-seater sedan, any hatchback, any two or mini car",
            'service_types' => [
                'Show Room' => ['duration' => 120,  'price' => 169],
                'Basic'     => ['duration' => 60,   'price' => 89],
                'Interior'  => ['duration' => 90,   'price' => 139],
                'Exterior'  => ['duration' => 30,   'price' => 59]
            ],
        ],
        'SUV' => [
            'description' => "Any 5 seater SUV",
            'service_types' => [
                'Show Room' => ['duration' => 150,  'price' => 179],
                'Basic'     => ['duration' => 60,   'price' => 99],
                'Interior'  => ['duration' => 120,  'price' => 149],
                'Exterior'  => ['duration' => 30,   'price' => 69]
            ],
        ],
        'Large SUV / Truck' => [
            'description' => "Any 6, 7, or 8 seater, minivan or van, pickup truck",
            'service_types' => [
                'Show Room' => ['duration' => 180,  'price' => 199],
                'Basic'     => ['duration' => 60,   'price' => 119],
                'Interior'  => ['duration' => 150,  'price' => 159],
                'Exterior'  => ['duration' => 45,   'price' => 89]
            ],
        ],
        'Motorcycle' => [
            'description' => "Any motorcycle",
            'service_types' => [
                'Basic' => ['duration' => 60, 'price' => 49]
            ],
        ],
    ],

    'permissions_team_id' => env('PERMISSIONS_TEAM_ID'),
];
