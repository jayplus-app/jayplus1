import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import CustomerBookingProvider from './customer/context/CustomerBookingProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<CustomerBookingProvider>
			<RouterProvider router={router} />
		</CustomerBookingProvider>
	</React.StrictMode>
)
