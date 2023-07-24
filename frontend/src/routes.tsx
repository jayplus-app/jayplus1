import { createBrowserRouter } from 'react-router-dom'
import CustomerApp from './customer/CustomerApp'
import AdminApp from './admin/AdminApp'
import CustomerBookingPage from './customer/pages/booking/CustomerBookingPage'
import CustomerPaymentPage from './customer/pages/payment/CustomerPaymentPage'
import CustomerPaymentSuccessPage from './customer/pages/payment/CustomerPaymentSuccessPage'
import AuthApp from './auth/AuthApp'
import LoginPage from './auth/pages/LoginPage/LoginPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <CustomerApp />,
		children: [
			{
				path: '',
				element: <CustomerBookingPage />,
			},
			{
				path: 'payment',
				element: <CustomerPaymentPage />,
			},
			{
				path: 'payment-success',
				element: <CustomerPaymentSuccessPage />,
			},
		],
	},
	{
		path: '/auth',
		element: <AuthApp />,
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
		],
	},
	{
		path: '/admin',
		element: <AdminApp />,
	},
])

export default router
