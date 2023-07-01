import { useState, useContext, useEffect } from 'react'
import TypeList from '../shared/TypeList'
import TypeDescription from '../shared/TypeDescription'
import CustomerBookingContext from '../../../context/CustomerBookingContext'

type VehicleType = {
	id: string
	name: string
	icon: string
	description: string
}

type VehicleTypes = {
	name: string
	types: VehicleType[]
}

const VehicleTypeSelection = () => {
	const [vehicleTypes, setVehicleTypes] = useState<VehicleTypes>()

	const { vehicleTypeSelected, setVehicleTypeSelected } = useContext(
		CustomerBookingContext
	)

	const getDescription = (): string => {
		const matchingType = vehicleTypes?.types.find(
			(t) => t.name === vehicleTypeSelected
		)
		return matchingType ? matchingType.description : 'No description found.'
	}

	useEffect(() => {
		fetch('http://localhost:4001/api/v1.0/booking/vehicle-types')
			.then((res) => res.json())
			.then((data) => {
				setVehicleTypes(data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div id="vehicle-type-selection">
			<h3>Vehicle Type</h3>
			{vehicleTypes && (
				<TypeList
					types={vehicleTypes}
					select={(type) => setVehicleTypeSelected(type)}
				/>
			)}
			<TypeDescription description={getDescription()} />
		</div>
	)
}

export default VehicleTypeSelection
