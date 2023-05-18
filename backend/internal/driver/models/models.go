package models

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/jayplus-app/jayplus/pkg/booking"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DBConfig struct {
	User string
	Pass string
	Host string
	Port int
	Name string
}

type Models struct {
	db *gorm.DB
}

func (m *Models) BookingsByDate(from time.Time, to time.Time) []booking.Booking {
	bookings := m.ModelsBookingsByDate(from, to)

	result := make([]booking.Booking, 0, len(bookings))

	for _, b := range bookings {
		result = append(result, b)
	}

	return result
}

func (m *Models) ModelsBookingsByDate(from time.Time, to time.Time) []Booking {
	var bookings []Booking
	m.db.Where("booked_at BETWEEN ? AND ?", from, to).Find(&bookings)
	return bookings
}

func NewModels(config *DBConfig) (*Models, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true", config.User, config.Pass, config.Host, config.Port, config.Name)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.AutoMigrate(&User{}, &Defintion{}, &Service{}, &Booking{})
	if err != nil {
		return nil, err
	}

	models := &Models{
		db: db,
	}

	return models, nil
}

func (m *Models) NewDefinition(defType string, name string, description string, icon string, order int) (*Defintion, error) {
	definition := &Defintion{
		Type:        defType,
		Name:        name,
		Description: description,
		Icon:        icon,
		Order:       order,
	}

	err := m.db.Create(definition).Error
	if err != nil {
		return nil, err
	}

	return definition, nil
}

func (m *Models) GetDefinitions(defType string) ([]Defintion, error) {
	var definitions []Defintion
	err := m.db.Order("`order`").Where("type = ?", defType).Find(&definitions).Error
	if err != nil {
		return nil, err
	}

	return definitions, nil
}

func (m *Models) GetTimeframes(serviceType string, vehicleype string, date time.Time) ([]Timeslot, error) {
	dbTimezone, err := time.LoadLocation("UTC")
	if err != nil {
		return nil, err
	}

	var svc Service
	err = m.db.Where("service_type = ? AND vehicle_type = ?", serviceType, vehicleype).First(&svc).Error
	if err != nil {
		return nil, err
	}

	log.Printf("Service: %+v\n", svc)

	// Initialize primitives
	capacity := 3         // TODO: [THREAD:3] Read from config
	timeslotMinutes := 60 // TODO: [THREAD:3] Read from config
	timeslotManminutes := timeslotMinutes * capacity
	threshold := float32(50) / 100 // TODO: [THREAD:3] Read from config
	maxOverflow := int(float32(timeslotManminutes) * threshold)

	// Set up the reception start and end times
	receptionStart := date.Add(time.Hour * 9)                      // TODO: [THREAD:3] Read from config
	receptionEnd := date.Add(time.Hour * 17).Add(time.Minute * 30) // TODO: [THREAD:3] Read from config
	start := receptionStart
	end := start.Add(time.Duration(timeslotMinutes) * time.Minute)

	// Retrieve booked timeslots within the day
	bookings := m.ModelsBookingsByDate(date.In(dbTimezone), date.Add(time.Hour*24).In(dbTimezone))

	// Generate timeslots
	timeslotCount := int(receptionEnd.Sub(receptionStart).Minutes()) / timeslotMinutes
	timeslots := make([]Timeslot, 0, timeslotCount)

	lastOverflow := 0

	for i := 0; i < timeslotCount; i++ {
		isPast := time.Now().In(dbTimezone).After(start)
		isLastTimeslot := receptionEnd.Before(end)

		sum := 0
		sumNext := 0
		for _, b := range bookings {
			if b.BookedAt.Equal(start) {
				sum += b.EstimatedMinutes
			} else if b.BookedAt.Equal(end) {
				sumNext += b.EstimatedMinutes
			}
		}

		nextOverflow := 0
		if calcNextOverflow := sumNext - timeslotManminutes; calcNextOverflow > 0 {
			nextOverflow = calcNextOverflow
		}

		allowedOverflow := 0
		if isLastTimeslot {
			allowedOverflow = maxOverflow - nextOverflow
		}

		maxCalc := timeslotManminutes + allowedOverflow - lastOverflow
		remained := maxCalc - sum
		available := !isPast && (remained-svc.DurationMinutes >= 0)

		timeslot := Timeslot{
			Start:       start,
			End:         end,
			FreeMinutes: remained,
			Available:   available,
		}

		timeslots = append(timeslots, timeslot)

		start = end
		end = start.Add(time.Duration(timeslotMinutes) * time.Minute)
	}

	return timeslots, nil
}

func (m *Models) GetPrice(serviceType string, vehicleType string, startTime time.Time) (float32, error) {
	d := time.Date(startTime.Year(), startTime.Month(), startTime.Day(), 0, 0, 0, 0, startTime.Location())

	timeslots, err := m.GetTimeframes(serviceType, vehicleType, d)
	if err != nil {
		return 0, err
	}

	var timeslot Timeslot

	for _, t := range timeslots {
		if t.Start.Equal(startTime) {
			timeslot = t
			break
		}
	}

	if timeslot.Start.IsZero() {
		return 0, errors.New("timeslot not found")
	}

	if !timeslot.Available {
		log.Printf("Timeslot: %+v\n", timeslot)
		return 0, errors.New("timeslot not available")
	}

	var svc Service
	err = m.db.Where("service_type = ? AND vehicle_type = ?", serviceType, vehicleType).First(&svc).Error
	if err != nil {
		return 0, err
	}

	return svc.Price, nil
}

type Timeslot struct {
	Start       time.Time `json:"start"`
	End         time.Time `json:"end"`
	FreeMinutes int       `json:"freeMinutes"`
	Available   bool      `json:"available"`
}

type Model struct {
	Models
	gorm.Model
}

// User is the type for user model
type User struct {
	Model
	FirstName   string
	LastName    string
	Email       string
	Password    []byte
	AccessLevel int
	Bookings    []Booking `gorm:"polymorphic:Booker;"`
}

func (u User) GetBookings() []booking.Booking {
	bookings := make([]booking.Booking, 0, len(u.Bookings))

	for _, b := range u.Bookings {
		bookings = append(bookings, b)
	}

	return bookings
}

// Implement the Booker interface for User
func (u User) Book(bookable booking.Bookable, timeframe booking.TimeFrame) error {
	var booking Booking
	booking.BookedAt = timeframe.From
	booking.BookedUntil = timeframe.To
	booking.db.Save(&booking) // TODO: [THREAD:2] Find a straight way of saving the model
	booking.SetBookable(bookable)
	booking.SetBooker(u)

	return nil
}

// Service is the type for service model
type Service struct {
	Model
	VehicleType     string
	ServiceType     string
	DurationMinutes int
	Price           float32
	Bookings        []Booking `gorm:"polymorphic:Bookable;"`
}

// Implement the bookable.Bookable interface for Service
func (s Service) GetBookings() []booking.Booking {
	bookings := make([]booking.Booking, 0, len(s.Bookings))

	for _, b := range s.Bookings {
		bookings = append(bookings, b)
	}

	return bookings
}

func (s Service) GetDuration() time.Duration {
	return time.Duration(s.DurationMinutes) * time.Minute
}

// Booking is the type for booking model
type Booking struct {
	Model
	ID                uint      `gorm:"primarykey" json:"billNumber"`
	BookedAt          time.Time `json:"time"`
	BookedUntil       time.Time
	CancelledAt       time.Time
	BookerID          int
	BookerType        string
	BookableID        int
	BookableType      string
	EstimatedMinutes  int
	TransactionNumber int     `json:"transactionNumber"`
	ServiceType       string  `json:"serviceType"`
	VehicleType       string  `json:"vehicleType"`
	ServiceCost       float32 `json:"serviceCost"`
	Discount          float32 `json:"discount"`
	Total             float32 `json:"total"`
	Deposit           float32 `json:"deposit"`
	Remaining         float32 `json:"remaining"`
}

// Implement the Booking interface for Booking
func (b Booking) GetTimeFrame() booking.TimeFrame {
	return booking.TimeFrame{
		From: b.BookedAt,
		To:   b.BookedUntil,
	}
}

// Implement the Booking interface for Booking
func (b Booking) GetBookable() booking.Bookable {
	var s Service
	b.db.Association("Bookable").Find(&s)
	return s
}

// Implement the Booking interface for Booking
func (b Booking) SetBookable(bookable booking.Bookable) {
	b.db.Association("Bookable").Append(bookable)
}

func (b Booking) GetBooker() booking.Booker {
	var u User
	b.db.Association("Booker").Find(&u)
	return u
}

func (b Booking) SetBooker(booker booking.Booker) {
	b.db.Association("Booker").Append(booker)
}

type Defintion struct {
	Model
	Type        string
	Order       int
	Name        string `json:"name"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
}

func (m *Models) MakeBooking(vehicleType string, serviceType string, bookTime time.Time) (*Booking, error) {
	var svc Service
	if err := m.db.First(&svc, "vehicle_type = ? AND service_type = ?", vehicleType, serviceType).Error; err != nil {
		return nil, err
	}

	deposit := float32(20) // TODO: [THREAD:3] Read from config

	booking := Booking{
		BookedAt:         bookTime,
		BookedUntil:      bookTime.Add(time.Duration(svc.DurationMinutes) * time.Minute),
		ServiceType:      svc.ServiceType,
		VehicleType:      svc.VehicleType,
		EstimatedMinutes: svc.DurationMinutes,
		ServiceCost:      svc.Price,
		Discount:         0,
		Total:            svc.Price,
		Deposit:          deposit,
		Remaining:        svc.Price - deposit,
	}

	m.db.Create(&booking)

	return &booking, nil
}

func (m *Models) GetBooking(id int) (*Booking, error) {
	var booking Booking
	if err := m.db.First(&booking, id).Error; err != nil {
		return nil, err
	}

	return &booking, nil
}
