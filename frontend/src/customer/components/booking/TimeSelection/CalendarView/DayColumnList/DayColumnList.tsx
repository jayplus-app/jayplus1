import React from 'react'
import DayColumn from '../DayColumn'

interface TimeSlot {
	start: string
	end: string
	freeMinutes: number
	available: boolean
	isPast: boolean
}

interface DayColumnListProps {
	startDate: string
}

const DayColumnList = ({ startDate }: DayColumnListProps) => {
	const dateTimeList: { [date: string]: TimeSlot[] } =
		getDateTimeList(startDate)

	return (
		<div className="grid grid-cols-3 gap-4 w-full justify-between text-center">
			{Object.entries(dateTimeList).map(([key, value]) => (
				<DayColumn key={key} date={key} timeSlotList={value} />
			))}
		</div>
	)
}

export default DayColumnList

const getDateTimeList = (startDate: string) => {
	const dateTimeList20 = {
		'2023-01-20': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: false,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: false,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: false,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-21': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-22': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
	}
	const dateTimeList18 = {
		'2023-01-18': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-19': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-20': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
	}
	const dateTimeList19 = {
		'2023-01-19': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-20': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-21': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
	}
	const dateTimeList21 = {
		'2023-01-21': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-22': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-23': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
	}
	const dateTimeList22 = {
		'2023-01-22': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-23': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
		'2023-01-24': [
			{
				start: '09:00',
				end: '10:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '10:00',
				end: '11:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '11:00',
				end: '12:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '12:00',
				end: '13:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '13:00',
				end: '14:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '14:00',
				end: '15:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '15:00',
				end: '16:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '16:00',
				end: '17:00',
				freeMinutes: 270,
				available: false,
				isPast: true,
			},
			{
				start: '17:00',
				end: '18:00',
				freeMinutes: 180,
				available: false,
				isPast: true,
			},
		],
	}

	if (startDate === '2023-01-20') {
		return dateTimeList20
	} else if (startDate === '2023-01-18') {
		return dateTimeList18
	} else if (startDate === '2023-01-19') {
		return dateTimeList19
	} else if (startDate === '2023-01-21') {
		return dateTimeList21
	} else if (startDate === '2023-01-22') {
		return dateTimeList22
	}

	return {}
}
