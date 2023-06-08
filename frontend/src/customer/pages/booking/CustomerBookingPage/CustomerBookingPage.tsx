import BookingFooter from '../../../components/booking/BookingFooter'
import ServiceTypeSelection from '../../../components/booking/ServiceTypeSelection'
import TimeSelection from '../../../components/booking/TimeSelection'
import VehicleTypeSelection from '../../../components/booking/VehicleTypeSelection'

import './CustomerBookingPage.css'

const CustomerBookingPage = () => {
	return (
		<div id="customer-booking-page">
			<VehicleTypeSelection />
			<ServiceTypeSelection />
			<TimeSelection />
			<BookingFooter />
		</div>
	)
}

export default CustomerBookingPage
