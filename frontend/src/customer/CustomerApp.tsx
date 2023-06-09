import { Outlet } from 'react-router-dom'
import CustomerBookingProvider from './context/CustomerBookingProvider'

const CustomerApp = () => {
	return (
		<CustomerBookingProvider>
			<Outlet />
		</CustomerBookingProvider>
	)
}

export default CustomerApp
