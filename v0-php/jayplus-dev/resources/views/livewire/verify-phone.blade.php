<div class="bg-gray-200 p-5 rounded shadow-lg w-1/3">
    <div >
        <form wire:submit.prevent="sendCode">
            <x-group label="Verify Your Phone Number" for="phone_number">
                <x-text-input for="phone_number" wire:model="phone_number"/>
            </x-group>
            <button type="submit" class="w-full bg-indigo-500 text-white rounded-lg my-4 py-2 uppercase font-bold">Verify</button>
        </form>
    </div>
    <div>
        <form wire:submit.prevent="verifyCode" class="w-full">
            <x-group label="Enter code" for="code">
                <x-text-input for="code" wire:model="code"/>
            </x-group>
            <button type="submit" class="w-full bg-indigo-500 text-white rounded-lg my-4 py-2 uppercase font-bold">Verify Code</button>
        </form>
    </div>
</div>