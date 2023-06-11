<?php

namespace App\Http\Livewire;

use App\Models\Booking;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Livewire\Component;
use Throwable;
use Twilio\Rest\Client;

class Invoice extends Component
{
    public string $tz;

    public $error;

    public $paymentMethod;

    public $booking;

    public $deposit;

    public $phone;

    public $phoneError;

    public $transaction;

    protected $rules = [
        'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
    ];

    protected $listeners = [
        'payed' => 'finalizePayment',
    ];

    public function __construct()
    {
        $this->tz = config('jayplus.timezone');
        $bookingId = session('booking_id');
        $this->booking = Booking::find($bookingId);
        $this->booking->starts_at = Carbon::instance($this->booking->starts_at)->tz($this->tz);
        $this->booking->ends_at = Carbon::instance($this->booking->ends_at)->tz($this->tz);

        $depositPercent = config('jayplus.deposit_percent') + 0;
        $depositMin = config('jayplus.deposit_min') + 0;
        $depositMax = config('jayplus.deposit_max') + 0;
        $rawDeposit = $this->booking->price * $depositPercent / 100;
        
        $authUser = request()->user();
            
        if ($authUser && $authUser->can('book without payment')) {
            $this->deposit = 0;
        } else {
            $this->deposit = min($depositMax, max($rawDeposit, $depositMin));
        }
    }

    public function render()
    {
        return view('livewire.invoice');
    }

    public function processPayment()
    {
        $this->validateOnly('phone');

        $this->emit('paymentAllowed');
    }

    public function finalizePayment($paymentMethodId)
    {
        $this->validateOnly('phone');

        $user = User::firstOrCreate([
            'phone' => $this->phone,
        ]);

        $user->bookings()->save($this->booking);

        try {
            $this->makeTransaction($user, $paymentMethodId);
            $this->sendSuccessSms();
            session()->forget('booking_id');
        } catch (\Exception $e) {
            Log::error('Purchase Failed!', ['error' => $e]);
            
            return "Purchase Failed!\n<br>" . $e->getMessage();
        }
    }

    public function cancel()
    {
        redirect()->route('booking.instant');
    }

    private function makeTransaction(User $user, $paymentMethodId)
    {
        $authUser = request()->user();
            
        if ($authUser && $authUser->can('book without payment')) {
            $intent = ['booked_by' => 'admin'];
        } else {
            $payableAmount = $this->deposit * 100;
            $payment = $user->charge($payableAmount, $paymentMethodId);
            $payment = $payment->asStripePaymentIntent();
            $intent = $payment->toArray();
        }

        $this->transaction = Transaction::create([
            'booking_id'    => $this->booking->id,
            'value'         => $this->deposit,
            'status'        => 'successful',
            'intent'        => $intent,
        ]);
    }

    private function sendSuccessSms()
    {
        try {
            $accountSid = getenv("TWILIO_ACCOUNT_SID");
            $authToken = getenv("TWILIO_AUTH_TOKEN");
            $twilioNumber = getenv("TWILIO_FROM_NUMBER");

            $client = new Client($accountSid, $authToken);

            $client->messages->create($this->phone, [
                'from' => $twilioNumber,
                'body' => $this->composeSmsBody(),
            ]);
        } catch (Throwable $e) {
            logger('Failed to send SMS!');
            report($e);
        }
    }

    private function composeSmsBody()
    {
        return __('booking.success_booking_sms', [
            'transaction_number'    => $this->transaction->id,
            'bill_number'           => $this->booking->id,
            'service_type'          => $this->booking->info['service_type'],
            'vehicle_type'             => $this->booking->info['vehicle_type'],
            'time'                  => $this->booking->starts_at->format('Y-m-d H:i'),
            'discount'              => 0,
            'total'                 => $this->booking->price,
            'deposit'               => number_format($this->deposit, 2),
            'remaining'             => number_format($this->booking->price - $this->deposit),
        ]);
    }
}
