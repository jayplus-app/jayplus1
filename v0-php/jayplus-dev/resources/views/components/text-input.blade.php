@props([
    'id',
    'disabled' => false,
    'type' => 'text',
    'value' => ''
])
<div class="rounded-md shadow-sm">
    <input
        id="{{ $id }}"
        {{ $disabled ? 'disabled' : '' }}
        type="{{ $type }}"
        value="{{ $value }}"
        {!! $attributes->merge(['class' => 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm']) !!}
    >
</div>
