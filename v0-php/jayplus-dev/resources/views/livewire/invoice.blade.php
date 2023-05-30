<div class="container mx-auto text-center" x-data>

    @if($this->transaction)
    <img
        class="inline-block"
        style="height: 200px;"
        src="{{ asset('images/check-circle.svg') }}"
        alt="{{ config('app.name') }}"
    >
    <h1 class="text-xl text-gray-500 font-bold tracking-widest uppercase my-4">Done Successfully</h1>
    @endif

    <div class="flex flex-col items-center justify-center mx-auto lg:w-8/12 sm:w-3/4 md:w-10/12">
        <dl class="grid grid-cols-2 w-full text-left border rounded bg-gray-50 px-4 py-2">
            @if($this->transaction)
            <dt wire: class="my-2 text-sm font-medium text-gray-500">Transaction Number</dt>
            <dd class="my-2 text-sm text-gray-900">{{ $this->transaction->id }}</dd>
            @endif
            <dt class="my-2 text-sm font-medium text-gray-500">Bill Number</dt>
            <dd class="my-2 text-sm text-gray-900">{{ $this->booking->id }}</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Type of Service</dt>
            <dd class="mb-2 text-sm text-gray-900">{{ $this->booking->info['service_type'] }}</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Vehicle Type</dt>
            <dd class="mb-2 text-sm text-gray-900">{{ $this->booking->info['vehicle_type'] }}</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Date</dt>
            <dd class="mb-2 text-sm text-gray-900">{{ $this->booking->starts_at->format('d M Y') }}</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Time</dt>
            <dd class="mb-2 text-sm text-gray-900">{{ $this->booking->starts_at->format('H:i') }}</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Service Cost</dt>
            <dd class="mb-2 text-sm text-gray-900">{{ $this->booking->price }} $</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Discount</dt>
            <dd class="mb-2 text-sm text-gray-900">Not Specified</dd>
            <dt class="mb-2 text-md font-bold text-gray-500">Total</dt>
            <dd class="mb-2 text-md font-bold text-gray-900">{{ $this->booking->price }} $</dd>
            <dt class="mb-2 text-md font-bold text-gray-500">Deposit</dt>
            <dd class="mb-2 text-md font-bold text-black">{{ number_format($deposit, 2) }} $</dd>
            <dt class="mb-2 text-sm font-medium text-gray-500">Remaining</dt>
            <dd class="mb-2 text-sm text-gray-900">{{ number_format($this->booking->price - $this->deposit, 2) }} $</dd>
        </dl>
    </div>

    @if($this->transaction)

    <div class="mt-4 py-5">
            <a class="p-4 bg-yellow-500 w-20 rounded shadow text-black" href="{!! route('booking.instant') !!}">
                Back to Home
            </a>
    </div>

    @else

    <div id="paymentContainer" class="mx-auto mt-6 sr-payment-panel lg:w-8/12 sm:w-3/4 md:w-10/12">

        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <input type="text" id="phone" wire:model.lazy="phone" placeholder="Phone Number" class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2 placeholder-gray-400">
        </div>
        @error('phone')
            <div class="pb-1 text-base font-bold text-left text-red-600 sr-field-error" role="alert">{{ $message }}</div>
        @enderror
        {{-- <livewire:verify-phone /> --}}

        <div class="mt-6 sr-payment-form">

            @cannot('book without payment')

            <div class="space-y-4 text-left">
                <!-- Card Number -->
                <div>
                    <label class="block text-sm font-medium mb-1" for="card-nr">Card Number <span class="text-red-500">*</span></label>
                    <div id="card-nr" class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full py-2.5 px-2 placeholder-gray-400" wire:ignore></div>
                </div>
                <!-- Expiry and CVC -->
                <div class="flex space-x-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium mb-1" for="card-expiry">Expiry Date (MM/YY)<span class="text-red-500">*</span></label>
                        <div id="card-expiry" class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-20 py-2.5 px-2 placeholder-gray-400" wire:ignore></div>
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium mb-1" for="card-cvc">CVC <span class="text-red-500">*</span></label>
                        <div id="card-cvc" class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-14 py-2.5 px-2 placeholder-gray-400" wire:ignore></div>
                    </div>
                </div>
                <!-- Name on Card -->
                <div>
                    <label class="block text-sm font-medium mb-1" for="card-name">Name on Card <span class="text-red-500">*</span></label>
                    <input id="card-name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full py-2.5 px-2 placeholder-gray-400" type="text" placeholder="John Doe" />
                </div>
            </div>

            <div class="pb-1 text-base font-bold text-left text-red-600 sr-field-error" id="card-errors" role="alert"></div>

            @endcan

            <!-- Form footer -->
            <div class="my-6 flex justify-center">
                <button
                    id="cancel"
                    class="mr-2 p-1 w-32 shadow bg-yellow-400 rounded disabled:bg-gray-700:text-white"
                    wire:click="cancel()"
                >
                    <span>Cancel</span>
                </button>
                <button wire:click="processPayment" class="p-1 w-32 shadow bg-yellow-500 rounded disabled:bg-gray-700:text-white">
                    <svg id="spinner" class="hidden spinner inline-block w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span id="button-text">Pay {{ number_format($deposit, 2) }} $</span>
                </button>
            </div>
        </div>
    </div>

    @endif

</div>

{{-- CSS --}}
@push('head-styles')
    <link href="/css/stripe.css" rel="stylesheet">
@endpush

{{-- JS --}}
@push('foot-scripts')
<script src="https://js.stripe.com/v3/"></script>

<script>
    var stripe, card, cvc, exp;
    
@can('book without payment')

    Livewire.on('paymentAllowed', () => {
        Livewire.emit('payed', 'null');
    });

@else

    document.addEventListener('livewire:load', function () {
        stripe = Stripe('{{ config('services.stripe.key')}}');
        var elements = stripe.elements();
        card = elements.create("cardNumber", { style: cardStyles });
        card.mount("#card-nr");

        cvc = elements.create('cardCvc', {
            'style': cardStyles
        });
        cvc.mount('#card-cvc');

        exp = elements.create('cardExpiry', {
            'style': cardStyles
        });
        exp.mount('#card-expiry');
    });

    Livewire.on('paymentAllowed', () => {
        makePayment();
    });

@endcan

    var makePayment = function() {
        changeLoadingState(true);
        var nameOnCard = document.getElementById('card-name').value;

        stripe
            .createPaymentMethod(
                'card', card, {
                    billing_details: {
                        'name': nameOnCard
                    }
                }
            )
            .then(function(result) {
                if (result.error) {
                    showError(result.error.message);
                    changeLoadingState(false);
                } else {
                    Livewire.emit('payed', result.paymentMethod.id);
                }
            });
    };

    var showError = function(errorMsgText) {
        changeLoadingState(false);
        var errorMsg = document.querySelector(".sr-field-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
            errorMsg.textContent = "";
        }, 8000);
    };

    var changeLoadingState = function(isLoading) {
        if (isLoading) {
            document.querySelector("button").disabled = true;
            document.querySelector("#spinner").classList.remove("hidden");
            document.querySelector("#button-text").classList.add("hidden");
        } else {
            document.querySelector("button").disabled = false;
            document.querySelector("#spinner").classList.add("hidden");
            document.querySelector("#button-text").classList.remove("hidden");
        }
    };

    var cardStyles = {
        base: {
            color: "#32325d",
            fontFamily: 'Arial,"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

</script>
@endpush
