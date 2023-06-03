import { createContext } from 'react'

interface CustomerBookingContextProps {
	vehicleTypeSelected: string
	setVehicleTypeSelected: (vehicleType: string) => void
	serviceTypeSelected: string
	setServiceTypeSelected: (serviceType: string) => void
	dateTimeSelected: string
	setDateTimeSelected: (dateTime: string) => void
	serviceCost: number
	setServiceCost: (cost: number) => void
}

const CustomerBookingContext = createContext<CustomerBookingContextProps>(
	{} as CustomerBookingContextProps
)

export default CustomerBookingContext
