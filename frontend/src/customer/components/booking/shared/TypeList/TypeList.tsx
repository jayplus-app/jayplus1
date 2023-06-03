import { useState, useContext, SetStateAction, ChangeEvent } from 'react'
import './TypeList.css'
import CustomerBookingContext from '../../../../context/CustomerBookingContext'

function calculatePrice(
	vehicleTypeSelected: string,
	serviceTypeSelected: string
) {
	// Calculate the price based on the vehicle type and service type selected
	return 140
}

interface Type {
	id: string
	name: string
	icon: string
}

interface Types {
	types: Type[]
	name: string
}

interface TypeListProps {
	types: Types
	select: (selected: string) => void
}

function TypeList({ types, select }: TypeListProps) {
	// Set the default selected type to the first type in the types list
	const [selected, setSelected] = useState(types.types[0].name)
	// Function received as a prop from the parent component that is called when a type is selected.
	// Function passes the state to parent component, which then sets the state in context.
	select(selected)

	// Retrieve the state of vehicleTypeSelected and serviceTypeSelected from context to calculate the price
	// setServiceCost are also retrieved from context to reset the service cost when a new type is selected
	// setDateTimeSelected is also retrieved from context to deselect the date and time when a new type is selected
	const {
		vehicleTypeSelected,
		serviceTypeSelected,
		setServiceCost,
		setDateTimeSelected,
	} = useContext(CustomerBookingContext)

	// Calculate the price when a new type is selected and set the service cost in context
	setServiceCost(calculatePrice(vehicleTypeSelected, serviceTypeSelected))

	// Function to handle the change of the type selected
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// Set the state of selected to the value of the type selected
		setSelected(e.currentTarget.value)
		// Call the function received as a prop from the parent component to set the state in context
		select(e.currentTarget.value)
		// Calculate the price when a new type is selected and set the service cost in context
		setServiceCost(calculatePrice(vehicleTypeSelected, serviceTypeSelected))
		// Deselect the date and time when a new type is selected
		setDateTimeSelected('')
	}

	return (
		<div
			id="type-list"
			className="type-list items-center justify-between mt-2"
		>
			<ul className="type-list-ul flex gap-2">
				{types.types.map(
					(
						type // Map through the types list and return a list item for each type
					) => (
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
					)
				)}
			</ul>
		</div>
	)
}

export default TypeList
