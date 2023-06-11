import { useContext } from 'react'
import BookingInvoice from '../../../components/payment/BookingInvoice/BookingInvoice'
import CustomerBookingContext from '../../../context/CustomerBookingContext'
import PaymentSuccessHeader from '../../../components/payment/PaymentSuccessHeader'
import PaymentSuccessFooter from '../../../components/payment/PaymentSuccessFooter'
import './CustomerPaymentSuccessPage.css'

const CustomerPaymentSuccessPage = () => {
	const { vehicleTypeSelected, serviceTypeSelected, dateTimeSelected } =
		useContext(CustomerBookingContext)

	const getInvoiceDetails = (
		vehicleTypeSelected: string,
		serviceTypeSelected: string,
		dateTimeSelected: string
	) => {
		return {
			TransactionNumber: '13',
			BillNumber: '37',
			ServiceType: 'Show Room',
			VehicleType: 'Sedan',
			Date: '14 Mar 2023',
			Time: '15:00',
			ServiceCost: '169.00 $',
			Discount: 'Not Specified',
			Total: '169.00 $',
			Deposit: '30.00 $',
			Remaining: '139.00 $',
		}
	}

	const invoiceDetails = getInvoiceDetails(
		vehicleTypeSelected,
		serviceTypeSelected,
		dateTimeSelected
	)

	return (
		<div
			id="customer-payment-success-page"
			className="flex flex-col items-center"
		>
			<PaymentSuccessHeader />
			<BookingInvoice invoiceDetails={invoiceDetails} />
			<PaymentSuccessFooter />
		</div>
	)
}

export default CustomerPaymentSuccessPage
