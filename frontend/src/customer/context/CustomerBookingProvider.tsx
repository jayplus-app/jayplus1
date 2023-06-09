import { ReactNode, useMemo, useState } from 'react'
import CustomerBookingContext from './CustomerBookingContext'

interface CustomerBookingProviderProps {
	children: ReactNode
}

const CustomerBookingProvider = ({
	children,
}: CustomerBookingProviderProps) => {
	const [vehicleTypeSelected, setVehicleTypeSelected] = useState('')
	const [serviceTypeSelected, setServiceTypeSelected] = useState('')
	const [dateTimeSelected, setDateTimeSelected] = useState('')
	const [serviceCost, setServiceCost] = useState(0)

	const contextValue = useMemo(
		() => ({
			vehicleTypeSelected,
			setVehicleTypeSelected,
			serviceTypeSelected,
			setServiceTypeSelected,
			dateTimeSelected,
			setDateTimeSelected,
			serviceCost,
			setServiceCost,
		}),
		[
			vehicleTypeSelected,
			setVehicleTypeSelected,
			serviceTypeSelected,
			setServiceTypeSelected,
			dateTimeSelected,
			setDateTimeSelected,
			serviceCost,
			setServiceCost,
		]
	)

	return (
		<CustomerBookingContext.Provider value={contextValue}>
			{children}
		</CustomerBookingContext.Provider>
	)
}

export default CustomerBookingProvider
