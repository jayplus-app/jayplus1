import { useContext } from 'react'
import TypeList from '../shared/TypeList'
import TypeDescription from '../shared/TypeDescription'
import CustomerBookingContext from '../../../context/CustomerBookingContext'

const getServiceTypes = () => {
	return {
		name: 'service-types',
		types: [
			{
				id: 'Show-Room',
				name: 'Show Room',
				description: (
					<div>
						<div className="grid grid-cols-2 gap-3">
							<ul className="list-disc list-inside">
								<li>
									Complete Interior Fine Detail with Shampoo
								</li>
								<li>Full Steam Cleaning on the Dashboard</li>
								<li>Full Steam Cleaning on seats and Floor</li>
								<li>Vacuum (Including Trunk Compartment)</li>
								<li>
									Detail all Panels, Surfaces &amp;
									Compartments, etc.
								</li>
								<li>
									Shampoo Clean all Carpeted Areas (Cloth
									Seats Included)
								</li>
								<li>Shampoo Clean Leather Seats</li>
								<li>Leather Conditioner if you have leather</li>
								<li>Remove all Salt Stains</li>
								<li>
									Interior Polish on Dashboard, Doors, and
									Leather Seats
								</li>
								<li>
									Remove &amp; Wash all Rubber Mats / Shampoo
									&amp; Extract all Carpeted Mats
								</li>
								<li>
									Interior Shine on Dashboard, Doors, and
									Leather Seats
								</li>
							</ul>
							<ul className="list-disc list-inside">
								<li>Apply Odor Eliminator</li>
								<li>Final Inspection &amp; Touch Up’s</li>
								<li>Meticulous Foam &amp; Hand Wash</li>
								<li>Full Body Wax</li>
								<li>
									Remove Brake Dust from Wheels, Clean &amp;
									Dress Tires
								</li>
								<li>Full Wax on Tires</li>
								<li>Power Wash &amp; Clean Wheel Wells</li>
								<li>Shampoo Clean and Dress Engine</li>
								<li>Air Dry Entire Vehicle</li>
								<li>Clean Exterior and Interior Glass</li>
								<li>Wipe Down Door Jams</li>
							</ul>
						</div>
					</div>
				),
			},
			{
				id: 'Basic',
				name: 'Basic',
				description: (
					<div>
						<div className="grid grid-cols-2 gap-3">
							<ul className="list-disc list-inside">
								<li>Vacuum (Including Trunk Compartment)</li>
								<li>Remove &amp; Wash all Rubber Mats</li>
								<li>Wipe All Over The dashboard</li>
							</ul>
							<ul className="list-disc list-inside">
								<li>Power Wash Body and Windows</li>
								<li>Power Wash &amp; Clean Wheel Wells</li>
							</ul>
						</div>
					</div>
				),
			},
			{
				id: 'Interior',
				name: 'Interior',
				description: (
					<div>
						<div className="grid grid-cols-2 gap-3">
							<ul className="list-disc list-inside">
								<li>
									Complete Interior Fine Detail with Shampoo
								</li>
								<li>Full Steam Cleaning on the Dashboard</li>
								<li>Full Steam Cleaning on seats and Floor</li>
								<li>Vacuum (Including Trunk Compartment)</li>
								<li>
									Detail all Panels, Surfaces &amp;
									Compartments, etc.
								</li>
								<li>
									Shampoo Clean all Carpeted Areas (Cloth
									Seats Included)
								</li>
								<li>Shampoo Clean Leather Seats</li>
							</ul>
							<ul className="list-disc list-inside">
								<li>Leather Conditioner</li>
								<li>Remove all Salt Stains</li>
								<li>
									Interior Polish on Dashboard, Doors, and
									Leather Seats
								</li>
								<li>
									Remove &amp; Wash all Rubber Mats / Shampoo
									&amp; Extract all Carpeted Mats
								</li>
								<li>
									Interior Shine on Dashboard, Doors, and
									Leather Seats
								</li>
								<li>Apply Odor Eliminator</li>
								<li>Final Inspection &amp; Touch Up</li>
							</ul>
						</div>
					</div>
				),
			},
			{
				id: 'Exterior',
				name: 'Exterior',
				description: (
					<div>
						<div className="grid grid-cols-2 gap-3">
							<ul className="list-disc list-inside">
								<li>Meticulous Foam &amp; Hand Wash</li>
								<li>
									Remove Brake Dust from Wheels, Clean &amp;
									Dress Tires
								</li>
								<li>Power Wash &amp; Clean Wheel Wells</li>
							</ul>
							<ul className="list-disc list-inside">
								<li>Shampoo Clean and Dress Engine</li>
								<li>Air Dry Entire Vehicle</li>
								<li>Clean Windows</li>
								<li>Wipe Down Door Jams</li>
							</ul>
						</div>
					</div>
				),
			},
		],
	}
}

const ServiceTypeSelection = () => {
	const serviceTypes = getServiceTypes()

	const { serviceTypeSelected, setServiceTypeSelected } = useContext(
		CustomerBookingContext
	)

	const getDescription = () => {
		const matchingType = serviceTypes.types.find(
			(t) => t.name === serviceTypeSelected
		)
		return matchingType ? matchingType.description : 'No description found.'
	}

	return (
		<div id="service-type-selection">
			<h3 className="mt-4">Service Type</h3>
			<TypeList
				types={serviceTypes}
				select={(type) => setServiceTypeSelected(type)}
			/>
			<TypeDescription description={getDescription()} />
		</div>
	)
}

export default ServiceTypeSelection
