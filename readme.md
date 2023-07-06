# JayPlus

JayPlus is a business management software for auto detailing businesses. It includes a booking system and a booking management system. The software is divided into three main components: Frontend, Backend, and Database.

## Frontend

The frontend is built with React and react-router-dom v6. It consists of two parts: the Customer and Admin interfaces.

### Customer Interface

This interface allows customers to make bookings, choose the type of service and vehicle, view prices, make payments, and view the final invoice. Key routes in this interface include "/booking", "/booking/book", "/booking/payment", and "/booking/payment-success".

### Admin Interface

The admin interface, accessible via the "/admin" route, allows administrators to add bookings on behalf of customers, view all bookings, and cancel bookings. The key routes in this interface are "/admin/add-booking" and "/admin/manage-bookings".

## Backend

The backend is written in Golang and serves as a REST API. It is also divided into two parts, each handling functionalities specific to the Customer and Admin.

### Shared Endpoints
- Get Vehicle Types
- Get Service Types
- Calculate Price
- Get Available Times
- Create Invoice

### Customer Endpoints:
- Create Payment Intent (Stripe)

### Admin-specific Endpoints:
- Login
- Confirm Booking
- Get Bookings
- Get Booking Details
- Cancel Booking

## Database

The database uses PostgreSQL and stores data related to bookings, services, vehicles, invoices, payments, and user details.

