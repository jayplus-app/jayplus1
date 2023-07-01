import { useEffect, useState, useContext } from 'react'
import CustomerBookingContext from '../../../../../context/CustomerBookingContext'
import DayColumn from '../DayColumn'

interface TimeSlot {
	start: string
	end: string
	freeMinutes: number
	available: boolean
}

interface DayColumnListProps {
	startDate: string
}

const DayColumnList = ({ startDate }: DayColumnListProps) => {
	const [dateTimeList, setDateTimeList] = useState<
		Record<string, TimeSlot[]>
	>({})

	const { vehicleTypeSelected, serviceTypeSelected } = useContext(
		CustomerBookingContext
	)

	useEffect(() => {
		const fetchData = (date: string) => {
			const headers = new Headers()
			headers.append('Content-Type', 'application/json')
			headers.append('Accept', 'application/json')

			const options = {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({
					vehicleType: vehicleTypeSelected,
					serviceType: serviceTypeSelected,
					dateTime: date,
				}),
			}

			fetch('/api/v1.0/booking/date-time-list', options)
				.then((response) => response.json())
				.then((data) => {
					setDateTimeList((prevDateTimeList) => ({
						...prevDateTimeList,
						[date]: data[date],
					}))
				})
				.catch((error) => {
					console.log(error)
				})
		}

		const addDaysToDate = (inputDate: string, by: number) => {
			// Parse the input date string into year, month, and day components
			let parts = inputDate.split('-')
			let year = parseInt(parts[0], 10).toString()
			let month = (parseInt(parts[1], 10) - 1).toString() // month is 0-indexed
			let day = parseInt(parts[2], 10).toString()

			// Creates a new Date object using the year, month, and day components
			let date = new Date(parseInt(year), parseInt(month), parseInt(day))

			// Adds the number of days to the date
			date.setDate(date.getDate() + by)

			// Converts the date back to the "yyyy-mm-dd" format
			year = date.getFullYear().toString()
			month = ('0' + (date.getMonth() + 1)).slice(-2)
			day = ('0' + date.getDate()).slice(-2)

			return year + '-' + month + '-' + day
		}

		const dates = [
			startDate,
			addDaysToDate(startDate, 1),
			addDaysToDate(startDate, 2),
		]

		dates.forEach((date) => fetchData(date))
	}, [startDate, vehicleTypeSelected, serviceTypeSelected])

	return (
		<div className="grid grid-cols-3 gap-4 w-full justify-between text-center">
			{Object.entries(dateTimeList)
				.sort(([dateA], [dateB]) => dateA.localeCompare(dateB)) // Sort the entries by date
				.map(([date, timeSlotList]) => (
					<DayColumn
						key={date}
						date={date}
						timeSlotList={timeSlotList}
					/>
				))}
		</div>
	)
}

export default DayColumnList
