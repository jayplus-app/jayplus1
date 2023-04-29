package main

import (
	"encoding/json"
	"net/http"
	"time"
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
	var dateTimeListRequest dateTimeListRequestPayload

	err := json.NewDecoder(r.Body).Decode(&dateTimeListRequest)
	if err != nil {
		app.errorLog.Println(err)
		return
	}

	// validate data

	t, err := time.Parse(YYYYMMDD, dateTimeListRequest.StartDate)

	out := []byte(`{
        "` + t.Format(YYYYMMDD) + `": [
            {
                "start": "09:00",
                "end": "10:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": false
            },
            {
                "start": "10:00",
                "end": "11:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": false
            },
            {
                "start": "11:00",
                "end": "12:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": false
            },
            {
                "start": "12:00",
                "end": "13:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "13:00",
                "end": "14:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "14:00",
                "end": "15:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "15:00",
                "end": "16:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "16:00",
                "end": "17:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "17:00",
                "end": "18:00",
                "freeMinutes": 180,
                "available": false,
                "isPast": true
            }
        ],
        "` + t.Add(24*time.Hour).Format(YYYYMMDD) + `": [
            {
                "start": "09:00",
                "end": "10:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "10:00",
                "end": "11:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "11:00",
                "end": "12:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "12:00",
                "end": "13:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "13:00",
                "end": "14:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "14:00",
                "end": "15:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "15:00",
                "end": "16:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "16:00",
                "end": "17:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "17:00",
                "end": "18:00",
                "freeMinutes": 180,
                "available": false,
                "isPast": true
            }
        ],
        "` + t.Add(48*time.Hour).Format(YYYYMMDD) + `": [
            {
                "start": "09:00",
                "end": "10:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "10:00",
                "end": "11:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "11:00",
                "end": "12:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "12:00",
                "end": "13:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "13:00",
                "end": "14:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "14:00",
                "end": "15:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "15:00",
                "end": "16:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "16:00",
                "end": "17:00",
                "freeMinutes": 270,
                "available": false,
                "isPast": true
            },
            {
                "start": "17:00",
                "end": "18:00",
                "freeMinutes": 180,
                "available": false,
                "isPast": true
            }
        ]
    }`)

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}
