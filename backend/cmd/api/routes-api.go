package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *application) routes() http.Handler {
	mux := chi.NewRouter()

	mux.Get("/api/v1.0/booking/vehicle-types", app.VehicleTypes)
	mux.Get("/api/v1.0/booking/service-types", app.ServiceTypes)
	mux.Post("/api/v1.0/booking/date-time-list", app.DateTimeList)
	mux.Post("/api/v1.0/booking/price", app.Price)
	mux.Post("/api/v1.0/booking/invoice", app.Invoice)

	mux.Post("/api/v1.0/admin/vehicles", app.NewVehicleType)
	mux.Post("/api/v1.0/admin/services", app.NewServiceType)

	return mux
}
