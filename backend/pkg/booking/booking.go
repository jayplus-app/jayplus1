package booking

import "time"

type TimeFrame struct {
	From time.Time
	To   time.Time
}

type Booking interface {
	GetTimeFrame() TimeFrame

	GetBookable() Bookable

	SetBookable(bookable Bookable)

	GetBooker() Booker

	SetBooker(booker Booker)
}

type Bookable interface {
	GetBookings() []Booking

	GetDuration() time.Duration
}

type Booker interface {
	Book(bookable Bookable, timeframe TimeFrame) error

	GetBookings() []Booking
}
