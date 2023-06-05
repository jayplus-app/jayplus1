import ServiceTypeSelection from '../../components/booking/ServiceTypeSelection'
import TimeSelection from '../../components/booking/timeSelection/TimeSelection'
import VehicleTypeSelection from '../../components/booking/VehicleTypeSelection'

const CustomerBookingPage = () => {
	return (
		<div id="customer-booking-page">
			<VehicleTypeSelection />
			<ServiceTypeSelection />
			<TimeSelection />
		</div>
	)
}

export default CustomerBookingPage
