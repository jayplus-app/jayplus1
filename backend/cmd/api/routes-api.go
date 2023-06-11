package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()
	mux.Use(AllowCors)

	mux.Get("/api/v1.0/booking/vehicle-types", app.VehicleTypes)
	mux.Get("/api/v1.0/booking/service-types", app.ServiceTypes)
	mux.Post("/api/v1.0/booking/date-time-list", app.DateTimeList)
	mux.Post("/api/v1.0/booking/price", app.Price)
	mux.Post("/api/v1.0/booking/invoice", app.Invoice)
	mux.Post("/api/v1.0/booking/pay-invoice", app.PayInvoice)

	mux.Post("/api/v1.0/admin/vehicles", app.NewVehicleType)
	mux.Post("/api/v1.0/admin/services", app.NewServiceType)

	mux.Post("/stripe/webhook/just-to-make-it-hard-to-guess", app.StripeWebhook)

	return mux
}

func AllowCors(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		ctx := r.Context()
		next.ServeHTTP(w, r.WithContext(ctx))
	}

	return http.HandlerFunc(fn)
}
