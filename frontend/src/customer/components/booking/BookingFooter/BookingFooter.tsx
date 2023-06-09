import { useContext } from 'react'
import CustomerBookingContext from '../../../context/CustomerBookingContext'

import Button from '../../../../shared/Button'

import './BookingFooter.css'

const BookingFooter = () => {
	const {
		serviceCost,
		vehicleTypeSelected,
		serviceTypeSelected,
		dateTimeSelected,
	} = useContext(CustomerBookingContext)

	const isDisabled =
		dateTimeSelected === '' ||
		vehicleTypeSelected === '' ||
		serviceTypeSelected === ''

	return (
		<div id="booking-footer">
			<div className="flex flex-col items-center justify-center">
				<div className="price mb-4 mt-2 text-lg">
					Price: <span className="price-amount">${serviceCost}</span>
				</div>
				<Button
					to="/payment"
					disabled={isDisabled}
					backgroundColor="#FFC960"
					width="280px"
					height="45px"
				>
					Payment
				</Button>
			</div>
		</div>
	)
}

export default BookingFooter
