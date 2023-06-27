import { useState, useContext, useEffect } from 'react'
import TypeList from '../shared/TypeList'
import TypeDescription from '../shared/TypeDescription'
import CustomerBookingContext from '../../../context/CustomerBookingContext'

type ServiceType = {
	id: string
	name: string
	icon: string
	description: string
}

type ServiceTypes = {
	name: string
	types: ServiceType[]
}

const ServiceTypeSelection = () => {
	const [serviceTypes, setServiceTypes] = useState<ServiceTypes>()

	const { serviceTypeSelected, setServiceTypeSelected } = useContext(
		CustomerBookingContext
	)

	const getDescription = () => {
		const matchingType = serviceTypes?.types.find(
			(t) => t.name === serviceTypeSelected
		)
		return matchingType ? matchingType.description : 'No description found.'
	}

	useEffect(() => {
		fetch('http://localhost:4001/api/v1.0/booking/service-types')
			.then((res) => res.json())
			.then((data) => {
				setServiceTypes(data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div id="service-type-selection">
			<h3 className="mt-4">Service Type</h3>
			{serviceTypes && (
				<TypeList
					types={serviceTypes}
					select={(type) => setServiceTypeSelected(type)}
				/>
			)}
			<TypeDescription description={getDescription()} />
		</div>
	)
}

export default ServiceTypeSelection
