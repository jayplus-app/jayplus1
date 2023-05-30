<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    public function instant()
    {
        return view('instant');
    }

    public function invoice(Request $request)
    {
        $bookingId = session('booking_id');

        if (!$bookingId) {
            return redirect()->route('booking.instant')->withErrors(['msg' => 'Broken Session!']);
        }

        $booking = Booking::find($bookingId);
        $user = $request->user();

        if (! $user) {
            if ($booking->booker_id) {
                return redirect()->route('booking.instant')->withErrors(['msg' => 'Bad Request!']);
            }
        } elseif ($user->cannot('book without payment') && $user->bookings()->where('bookings.id', $bookingId)->doesntExist()) {
            return redirect()->route('booking.instant')->withErrors(['msg' => 'Not Found!']);
        }

        return view('invoice');
    }

    public function purchase(Request $request, Transaction $transaction)
    {
        $user = $request->user();
        $booking = Booking::find($transaction->booking_id);

        if ($booking->booker_id !== $user->id) {
            return redirect()->route('booking.instant')->withErrors(['msg' => 'Bad Request!']);
        }

        session()->forget('booking_id');

        return view('payment-confirmed', [
            'booking'       => $booking,
            'transaction'   => $transaction,
        ]);
    }
}
