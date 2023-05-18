package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/jayplus-app/jayplus/internal/driver/models"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/paymentintent"
)

type dateTimeListRequestPayload struct {
	StartDate   string `json:"dateTime"`
	ServiceType string `json:"serviceType"`
	VehicleType string `json:"vehicleType"`
}

func (app *application) response(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		app.errorLog.Println(err)
	}
}

type definitionRequestPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
	Order       int    `json:"order"`
}

func (app *application) NewVehicleType(w http.ResponseWriter, r *http.Request) {
	app.newDefinition("vehicle-types", w, r)
}

func (app *application) NewServiceType(w http.ResponseWriter, r *http.Request) {
	app.newDefinition("service-types", w, r)
}

func (app *application) newDefinition(defType string, w http.ResponseWriter, r *http.Request) {
	var payload definitionRequestPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	def, err := app.db.NewDefinition(defType, payload.Name, payload.Description, payload.Icon, payload.Order)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	app.response(w, http.StatusOK, def)
}

func (app *application) getDefinitions(defType string, w http.ResponseWriter, r *http.Request) error {
	list, err := app.db.GetDefinitions(defType)
	if err != nil {
		return err
	}

	out := map[string]interface{}{
		"name":  defType,
		"types": list,
	}

	app.response(w, http.StatusOK, out)

	return nil
}

func (app *application) VehicleTypes(w http.ResponseWriter, r *http.Request) {
	if err := app.getDefinitions("vehicle-types", w, r); err != nil {
		app.errorLog.Println(err)
		return
	}
}

func (app *application) ServiceTypes(w http.ResponseWriter, r *http.Request) {
	if err := app.getDefinitions("service-types", w, r); err != nil {
		app.errorLog.Println(err)
		return
	}
}

func (app *application) DateTimeList(w http.ResponseWriter, r *http.Request) {
	var input dateTimeListRequestPayload

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// validate data

	d, err := time.Parse(time.DateOnly, input.StartDate)
	if err != nil {
		app.errorLog.Println(err)
		w.Write([]byte(`{"success": false, "message": "Invalid date format"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")

	// Get timeframes for the specified date
	timeslots, err := app.db.GetTimeframes(input.ServiceType, input.VehicleType, d)
	if err != nil {
		app.errorLog.Println(err)
		w.Write([]byte(`{"success": false, "message": "Invalid input"}`))
		return
	}

	out, err := json.Marshal(map[string][]models.Timeslot{
		d.Format(time.DateOnly): timeslots,
	})
	if err != nil {
		app.errorLog.Println(err)
		w.Write([]byte(`{"success": false, "message": "Invalid request"}`))
		return
	}

	w.Write(out)
}

type priceRequestPayload struct {
	VehicleType string    `json:"vehicleType"`
	ServiceType string    `json:"serviceType"`
	Time        time.Time `json:"time"`
}

func (app *application) Price(w http.ResponseWriter, r *http.Request) {
	var input priceRequestPayload

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// TODO: [THREAD:4] Validate input

	price, err := app.db.GetPrice(input.ServiceType, input.VehicleType, input.Time)
	if err != nil {
		app.errorLog.Println(err)
		w.Write([]byte(`{"success": false, "message": "Invalid input"}`))
		return
	}

	out := []byte(strconv.FormatFloat(float64(price), 'f', 2, 64))

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

type invoiceRequestPayload struct {
	VehicleType string    `json:"vehicleType"`
	ServiceType string    `json:"serviceType"`
	Time        time.Time `json:"time"`
}

func (app *application) Invoice(w http.ResponseWriter, r *http.Request) {
	var input invoiceRequestPayload

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		app.errorLog.Println(err)
		return
	}

	booking, err := app.db.MakeBooking(input.VehicleType, input.ServiceType, input.Time)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// validate data

	// out := []byte(`{
	// 	"Transaction Number": "13",
	// 	"Bill Number": "37",
	// 	"Type of Service": "Show Room",
	// 	"Vehicle Type": "Sedan",
	// 	"Date": "14 Mar 2023",
	// 	"Time": "15:00",
	// 	"Service Cost": "169.00 $",
	// 	"Discount": "Not Specified",
	// 	"Total": "169.00 $",
	// 	"Deposit": "30.00 $",
	// 	"Remaining": "139.00 $"
	// }`)

	out, err := json.Marshal(booking)

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

type payInvoiceRequestPayload struct {
	BillNumber int `json:"billNumber"`
}

func (app *application) PayInvoice(w http.ResponseWriter, r *http.Request) {
	var input payInvoiceRequestPayload

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		app.errorLog.Println(err)
		return
	}

	booking, err := app.db.GetBooking(input.BillNumber)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// Create a PaymentIntent with amount and currency
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(booking.Deposit * 100)),
		Currency: stripe.String(string(stripe.CurrencyCAD)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

	pi, err := paymentintent.New(params)
	app.infoLog.Printf("pi.New: %v", pi.ClientSecret)

	if err != nil {
		app.errorLog.Println(err)
		return
	}

	result := struct {
		ClientSecret string `json:"clientSecret"`
	}{
		ClientSecret: pi.ClientSecret,
	}

	app.response(w, http.StatusOK, result)
}
