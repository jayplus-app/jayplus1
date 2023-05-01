package models

import "database/sql"

// DBModel is the type for the database connection values
type DBModel struct {
	DB *sql.DB
}

// User is the type for user model
type User struct {
	ID          uint `gorm:"primaryKey"`
	FirstName   string
	LastName    string
	Email       string
	Password    []byte
	AccessLevel int
	CreatedAt   string
	UpdatedAt   string
}

// Service is the type for service model
type Service struct {
	ID          int
	VehicleType string
	ServiceType string
	Duration    int
	Price       float32
	CreatedAt   string
	UpdatedAt   string
}
