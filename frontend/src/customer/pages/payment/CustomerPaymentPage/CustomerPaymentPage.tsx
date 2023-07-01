import { useContext, useEffect, useState } from 'react'
import BookingInvoice from '../../../components/payment/BookingInvoice/BookingInvoice'
import PaymentForm from '../../../components/payment/PaymentForm/PaymentForm'
import CustomerBookingContext from '../../../context/CustomerBookingContext'

import './CustomerPaymentPage.css'

interface InvoiceDetails {
	billNumber: number
	time: string
	cancelledAt: string
	TransactionNumber: number
	serviceType: string
	vehicleType: string
	serviceCost: number
	discount: number
	total: number
	deposit: number
	remaining: number
	payedAt: string
}

function getInvoice(
	vehicleTypeSelected: string,
	serviceTypeSelected: string,
	dateTimeSelected: string
) {
	// Fetch the price data from the backend based on the vehicle type and service type selected
	return fetch('/api/v1.0/booking/invoice', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			vehicleType: vehicleTypeSelected,
			serviceType: serviceTypeSelected,
			time: '2024-06-29T10:00:00Z',
		}),
	})
		.then((response) => response.json())
		.then((invoice) => {
			return invoice
		})
		.catch((error) => {
			console.log(error)
		})
}

const CustomerPaymentPage = () => {
	const { vehicleTypeSelected, serviceTypeSelected, dateTimeSelected } =
		useContext(CustomerBookingContext)
	const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>(
		{} as InvoiceDetails
	)

	useEffect(() => {
		getInvoice(
			vehicleTypeSelected,
			serviceTypeSelected,
			dateTimeSelected
		).then((invoice) => {
			setInvoiceDetails(invoice)
		})
	}, [vehicleTypeSelected, serviceTypeSelected, dateTimeSelected])

	return (
		<div id="customer-payment-page">
			<BookingInvoice invoiceDetails={invoiceDetails} />
			<PaymentForm invoiceDetails={invoiceDetails} />
		</div>
	)
}

export default CustomerPaymentPage
