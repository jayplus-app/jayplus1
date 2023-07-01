import { ChangeEvent, useContext } from 'react'
import CustomerBookingContext from '../../../../../../context/CustomerBookingContext'
import './TimeSlotButtonList.css'

interface TimeSlot {
	start: string
	end: string
	freeMinutes: number
	available: boolean
}

interface TimeSlotButtonListProps {
	date: string
	timeSlotList: TimeSlot[]
}

const TimeSlotButtonList = ({
	date,
	timeSlotList,
}: TimeSlotButtonListProps) => {
	const { dateTimeSelected, setDateTimeSelected } = useContext(
		CustomerBookingContext
	)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDateTimeSelected(e.currentTarget.value)
	}

	return (
		<div id="time-list">
			<ul>
				{timeSlotList.map((time) => (
					<li
						key={date + time.start}
						className={`mb-4 ${
							!time.available ? 'li-disabled' : ''
						}`}
					>
						<input
							type="radio"
							id={date + time.start}
							className="hidden"
							name="timeSlot"
							value={date + time.start}
							onChange={handleChange}
							checked={dateTimeSelected === date + time.start}
							disabled={!time.available}
						/>
						<label
							htmlFor={date + time.start}
							className={`flex flex-col items-center justify-center ${
								!time.available ? 'label-disabled' : ''
							}`}
						>
							{time.start}
						</label>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TimeSlotButtonList
