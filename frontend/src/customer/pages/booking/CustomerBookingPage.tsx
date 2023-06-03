import ServiceType from '../../components/booking/serviceType/ServiceType'
import TimeSelection from '../../components/booking/timeSelection/TimeSelection'
import VehicleType from '../../components/booking/vehicleType/VehicleType'

const CustomerBookingPage = () => {
	return (
		<div id="customer-booking-page">
			<VehicleType />
			<ServiceType />
			<TimeSelection />
		</div>
	)
}

export default CustomerBookingPage
