import { Outlet } from 'react-router-dom'
// import CustomerBookingProvider from './context/CustomerBookingProvider'

const AuthApp = () => {
	return (
		// <CustomerBookingProvider>
		<Outlet />
		// </CustomerBookingProvider>
	)
}

export default AuthApp
