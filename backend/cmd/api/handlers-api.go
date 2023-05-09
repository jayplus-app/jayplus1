package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/jayplus-app/jayplus/internal/driver/models"
)

const YYYYMMDD = "2006-01-02"

type dateTimeListRequestPayload struct {
	StartDate   string `json:"dateTime"`
	ServiceType string `json:"serviceType"`
	VehicleType string `json:"vehicleType"`
}

func (app *application) VehicleTypes(w http.ResponseWriter, r *http.Request) {
	out := []byte(`{
		"name": "vehicle-types",
		"types": [
			{"id": "Sedan", "name": "Sedan", "icon": "sedan.svg", "description": "Any 5-seater sedan, any hatchback, any two or mini car"},
			{"id": "SUV", "name": "SUV", "icon": "suv.svg", "description": "Any 5 seater SUV"}, 
			{"id": "Large-SUV-Truck", "name": "Large SUV / Truck", "icon": "largeSuvTruck.svg", "description": "Any 6, 7, or 8 seater, minivan or van, pickup truck"},
			{"id": "Motorcycle", "name": "Motorcycle", "icon": "motorcycle.svg", "description": "Any motorcycle"}
		]
	}`)

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

func (app *application) ServiceTypes(w http.ResponseWriter, r *http.Request) {
	out := []byte(`{
		"name" : "service-types",
		"types": [
			{
				"id": "Show-Room",
				"name": "Show Room",
				"description": "<div><div className=\"grid grid-cols-2 gap-3\"><ul className=\"list-disc list-inside\"><li>Complete Interior Fine Detail with Shampoo</li><li>Full Steam Cleaning on the Dashboard</li><li>Full Steam Cleaning on seats and Floor</li><li>Vacuum (Including Trunk Compartment)</li><li>Detail all Panels, Surfaces &amp; Compartments, etc.</li><li>Shampoo Clean all Carpeted Areas (Cloth Seats Included)</li><li>Shampoo Clean Leather Seats</li><li>Leather Conditioner if you have leather</li><li>Remove all Salt Stains</li><li>Interior Polish on Dashboard, Doors, and Leather Seats</li><li>Remove &amp; Wash all Rubber Mats / Shampoo &amp; Extract all Carpeted Mats</li><li>Interior Shine on Dashboard, Doors, and Leather Seats</li></ul><ul className=\"list-disc list-inside\"><li>Apply Odor Eliminator</li><li>Final Inspection &amp; Touch Up’s</li><li>Meticulous Foam &amp; Hand Wash</li><li>Full Body Wax</li><li>Remove Brake Dust from Wheels, Clean &amp; Dress Tires</li><li>Full Wax on Tires</li><li>Power Wash &amp; Clean Wheel Wells</li><li>Shampoo Clean and Dress Engine</li><li>Air Dry Entire Vehicle</li><li>Clean Exterior and Interior Glass</li><li>Wipe Down Door Jams</li></ul></div></div>"
			},
			{
				"id" : "Basic", 
				"name": "Basic", 
				"description": "<div><div class=\"grid grid-cols-2 gap-3\"><ul class=\"list-disc list-inside\"><li>Vacuum (Including Trunk Compartment)</li><li>Remove &amp; Wash all Rubber Mats</li><li>Wipe All Over The dashboard</li></ul><ul class=\"list-disc list-inside\"><li>Power Wash Body and Windows</li><li>Power Wash &amp; Clean Wheel Wells</li></ul></div></div>"
			},
			{
				"id" : "Interior", 
				"name": "Interior", 
				"description": "<div><div class=\"grid grid-cols-2 gap-3\"><ul class=\"list-disc list-inside\"><li>Complete Interior Fine Detail with Shampoo</li><li>Full Steam Cleaning on the Dashboard</li><li>Full Steam Cleaning on seats and Floor</li><li>Vacuum (Including Trunk Compartment)</li><li>Detail all Panels, Surfaces &amp; Compartments, etc.</li><li>Shampoo Clean all Carpeted Areas (Cloth Seats Included)</li><li>Shampoo Clean Leather Seats</li></ul><ul class=\"list-disc list-inside\"><li>Leather Conditioner</li><li>Remove all Salt Stains</li><li>Interior Polish on Dashboard, Doors, and Leather Seats</li><li>Remove &amp; Wash all Rubber Mats / Shampoo &amp; Extract all Carpeted Mats</li><li>Interior Shine on Dashboard, Doors, and Leather Seats</li><li>Apply Odor Eliminator</li><li>Final Inspection &amp; Touch Up</li></ul></div></div>"
			},
			{
				"id" : "Exterior", 
				"name": "Exterior", 
				"description": "<div><div class=\"grid grid-cols-2 gap-3\"><ul class=\"list-disc list-inside\"><li>Meticulous Foam &amp; Hand Wash</li><li>Remove Brake Dust from Wheels, Clean &amp; Dress Tires</li><li>Power Wash &amp; Clean Wheel Wells</li></ul><ul class=\"list-disc list-inside\"><li>Shampoo Clean and Dress Engine</li><li>Air Dry Entire Vehicle</li><li>Clean Windows</li><li>Wipe Down Door Jams</li></ul></div></div>"
			}
		]
	}`)

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

func (app *application) DateTimeList(w http.ResponseWriter, r *http.Request) {
	var input dateTimeListRequestPayload

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// validate data

	d, err := time.Parse(YYYYMMDD, input.StartDate)
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
		d.Format(YYYYMMDD): timeslots,
	})
	if err != nil {
		app.errorLog.Println(err)
		w.Write([]byte(`{"success": false, "message": "Invalid request"}`))
		return
	}

	w.Write(out)
}

type priceRequestPayload struct {
	VehicleType string `json:"vehicleType"`
	ServiceType string `json:"serviceType"`
}

func (app *application) Price(w http.ResponseWriter, r *http.Request) {
	var priceRequest priceRequestPayload

	err := json.NewDecoder(r.Body).Decode(&priceRequest)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// validate data

	price := "0"

	if priceRequest.VehicleType == "Sedan" && priceRequest.ServiceType == "Show Room" {
		price = "140"
	} else if priceRequest.VehicleType == "SUV" && priceRequest.ServiceType == "Show Room" {
		price = "160"
	} else if priceRequest.VehicleType == "Large SUV / Truck" && priceRequest.ServiceType == "Show Room" {
		price = "170"
	} else if priceRequest.VehicleType == "Motorcycle" && priceRequest.ServiceType == "Show Room" {
		price = "100"
	} else if priceRequest.VehicleType == "Sedan" && priceRequest.ServiceType == "Basic" {
		price = "240"
	} else if priceRequest.VehicleType == "SUV" && priceRequest.ServiceType == "Basic" {
		price = "260"
	} else if priceRequest.VehicleType == "Large SUV / Truck" && priceRequest.ServiceType == "Basic" {
		price = "270"
	} else if priceRequest.VehicleType == "Motorcycle" && priceRequest.ServiceType == "Basic" {
		price = "200"
	} else if priceRequest.VehicleType == "Sedan" && priceRequest.ServiceType == "Interior" {
		price = "340"
	} else if priceRequest.VehicleType == "SUV" && priceRequest.ServiceType == "Interior" {
		price = "360"
	} else if priceRequest.VehicleType == "Large SUV / Truck" && priceRequest.ServiceType == "Interior" {
		price = "370"
	} else if priceRequest.VehicleType == "Motorcycle" && priceRequest.ServiceType == "Interior" {
		price = "300"
	} else if priceRequest.VehicleType == "Sedan" && priceRequest.ServiceType == "Exterior" {
		price = "440"
	} else if priceRequest.VehicleType == "SUV" && priceRequest.ServiceType == "Exterior" {
		price = "460"
	} else if priceRequest.VehicleType == "Large SUV / Truck" && priceRequest.ServiceType == "Exterior" {
		price = "470"
	} else if priceRequest.VehicleType == "Motorcycle" && priceRequest.ServiceType == "Exterior" {
		price = "400"
	}

	out := []byte(price)

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

type invoiceRequestPayload struct {
	VehicleType string `json:"vehicleType"`
	ServiceType string `json:"serviceType"`
	Time        string `json:"time"`
}

func (app *application) Invoice(w http.ResponseWriter, r *http.Request) {
	var invoiceRequest invoiceRequestPayload

	err := json.NewDecoder(r.Body).Decode(&invoiceRequest)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// validate data

	out := []byte(`{
		"Transaction Number": "13",
		"Bill Number": "37",
		"Type of Service": "Show Room",
		"Vehicle Type": "Sedan",
		"Date": "14 Mar 2023",
		"Time": "15:00",
		"Service Cost": "169.00 $",
		"Discount": "Not Specified",
		"Total": "169.00 $",
		"Deposit": "30.00 $",
		"Remaining": "139.00 $"
	}`)

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}
