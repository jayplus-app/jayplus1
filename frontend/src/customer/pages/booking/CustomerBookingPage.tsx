import ServiceTypeSelection from '../../components/booking/ServiceTypeSelection/ServiceType'
import TimeSelection from '../../components/booking/timeSelection/TimeSelection'
import VehicleTypeSelection from '../../components/booking/VehicleTypeSelection/VehicleTypeSelection'

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
