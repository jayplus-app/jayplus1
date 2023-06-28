import React from 'react'
import DayColumnHeader from './DayColumnHeader'
import TimeSlotButtonList from './TimeSlotButtonList'

interface TimeSlot {
	start: string
	end: string
	freeMinutes: number
	available: boolean
}

interface DayColumnProps {
	date: string
	timeSlotList: TimeSlot[]
}

const DayColumn = ({ date, timeSlotList }: DayColumnProps) => {
	return (
		<div>
			<DayColumnHeader date={date} />
			<TimeSlotButtonList date={date} timeSlotList={timeSlotList} />
		</div>
	)
}

export default DayColumn
