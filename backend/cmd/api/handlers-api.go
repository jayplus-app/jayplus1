package main

import (
	"net/http"
)

func (app *application) ServiceTypes(w http.ResponseWriter, r *http.Request) {
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
