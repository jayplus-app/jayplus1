import { useState, useContext, ChangeEvent, useEffect } from 'react'
import './TypeList.css'
import CustomerBookingContext from '../../../../context/CustomerBookingContext'

interface Type {
	id: string
	name: string
	icon?: string
}

interface Types {
	types: Type[]
	name: string
}

interface TypeListProps {
	types: Types
	select: (selected: string) => void
}

function getPrice(vehicleTypeSelected: string, serviceTypeSelected: string) {
	// Fetch the price data from the backend based on the vehicle type and service type selected
	return fetch('/api/v1.0/booking/price', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			vehicleType: vehicleTypeSelected || 'Sedan',
			serviceType: serviceTypeSelected || 'Show Room',
			time: '2024-06-29T10:00:00Z',
		}),
	})
		.then((response) => response.json())
		.then((price) => {
			return price
		})
		.catch((error) => {
			console.log(error)
			return 0
		})
}

function TypeList({ types, select }: TypeListProps) {
	const [selected, setSelected] = useState(types.types[0].name)
	const {
		vehicleTypeSelected,
		serviceTypeSelected,
		setServiceCost,
		setDateTimeSelected,
	} = useContext(CustomerBookingContext)

	useEffect(() => {
		getPrice(vehicleTypeSelected, serviceTypeSelected).then((price) => {
			setServiceCost(price)
		})
	}, [vehicleTypeSelected, serviceTypeSelected, setServiceCost])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelected(e.currentTarget.value)
		select(e.currentTarget.value)
		setDateTimeSelected('')

		getPrice(vehicleTypeSelected, serviceTypeSelected).then((price) => {
			setServiceCost(price)
		})
	}

	return (
		<div
			id="type-list"
			className="type-list items-center justify-between mt-2"
		>
			<ul className="type-list-ul flex gap-2">
				{types.types.map((type) => (
					<li
						className="type-list-li border-2 w-1/4 text-center"
						key={type.id}
					>
						<input
							className="type-list-input hidden"
							type="radio"
							id={type.id}
							name={types.name}
							value={type.name}
							onChange={handleChange}
							checked={selected === type.name}
						/>
						<label
							htmlFor={type.id}
							className="type-list-label flex flex-col items-center justify-center"
						>
							<img src={type.icon} alt="" />
							<span
								className={
									type.name === 'Large SUV / Truck'
										? 'type-list-label-span-small'
										: 'type-list-label-span'
								}
							>
								{type.name}
							</span>
						</label>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TypeList
