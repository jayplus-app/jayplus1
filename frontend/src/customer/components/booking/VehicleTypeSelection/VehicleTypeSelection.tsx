import { useContext } from 'react'
import TypeList from '../shared/TypeList'
import TypeDescription from '../shared/TypeDescription'
import CustomerBookingContext from '../../../context/CustomerBookingContext'

const getVehicleTypes = () => {
	return {
		name: 'vehicle-types',
		types: [
			{
				id: 'Sedan',
				name: 'Sedan',
				icon: 'sedan.svg',
				description:
					'Any 5-seater sedan, any hatchback, any two or mini car',
			},
			{
				id: 'SUV',
				name: 'SUV',
				icon: 'suv.svg',
				description: 'Any 5 seater SUV',
			},
			{
				id: 'Large-SUV-Truck',
				name: 'Large SUV / Truck',
				icon: 'largeSuvTruck.svg',
				description:
					'Any 6, 7, or 8 seater, minivan or van, pickup truck',
			},
			{
				id: 'Motorcycle',
				name: 'Motorcycle',
				icon: 'motorcycle.svg',
				description: 'Any motorcycle',
			},
		],
	}
}

const VehicleTypeSelection = () => {
	const vehicleTypes = getVehicleTypes()

	const { vehicleTypeSelected, setVehicleTypeSelected } = useContext(
		CustomerBookingContext
	)

	const getDescription = (): string => {
		const matchingType = vehicleTypes.types.find(
			(t) => t.name === vehicleTypeSelected
		)
		return matchingType ? matchingType.description : 'No description found.'
	}

	return (
		<div id="vehicle-type-selection">
			<div className="w-full">
				<h3>Vehicle Type</h3>
				<TypeList
					types={vehicleTypes}
					select={(type) => setVehicleTypeSelected(type)}
				/>
				<TypeDescription description={getDescription()} />
			</div>
		</div>
	)
}

export default VehicleTypeSelection
