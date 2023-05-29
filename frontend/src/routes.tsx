import { createBrowserRouter } from 'react-router-dom'
import CustomerApp from './customer/CustomerApp'
import AdminApp from './admin/AdminApp'
import CustomerBookingPage from './customer/pages/CustomerBookingPage'
import CustomerPaymentPage from './customer/pages/CustomerPaymentPage'
import CustomerPaymentSuccessPage from './customer/pages/CustomerPaymentSuccessPage'

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
		path: '/admin',
		element: <AdminApp />,
	},
])

export default router
