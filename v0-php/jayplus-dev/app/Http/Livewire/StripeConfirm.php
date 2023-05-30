<?php

namespace App\Http\Livewire;

use App\Models\Transaction;
use Livewire\Component;

class StripeConfirm extends Component
{
    public $transactionId;

    public function mount($transaction)
    {
        $this->transactionId = $transaction;
    }

    public function render()
    {
        $transaction = Transaction::find($this->transactionId);

        if ($transaction->status == 'succeeded') {
            $this->redirect(route('booking.confirmed'));
        }

        return view('livewire.stripe-confirm');
    }
}
