import React from 'react'
import DayColumnHeader from './DayColumnHeader'
import TimeSlotButtonList from './TimeSlotButtonList'

interface DayColumnProps {
	date: string
	timeSlotList: Array<{
		start: string
		end: string
		freeMinutes: number
		available: boolean
		isPast: boolean
	}>
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
