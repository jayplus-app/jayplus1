import TypeList from '../shared/TypeList'

const VehicleType = () => {
	const vehicleTypes = {
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
	// fetch('http://45.195.250.164:4001/api/v1.0/booking/vehicle-types')
	// 	.then((res) => {
	// 		console.log(res)
	// 	})
	// 	.catch((err) => {
	// 		console.log(err)
	// 	})

	return (
		<section id="vehicle-type">
			<div className="w-full">
				<h3>Vehicle Type</h3>
				<TypeList />
			</div>
		</section>
	)
}

export default VehicleType
