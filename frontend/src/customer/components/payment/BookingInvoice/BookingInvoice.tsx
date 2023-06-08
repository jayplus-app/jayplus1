import './BookingInvoice.css'

interface BookingInvoiceProps {
	invoiceDetails: {
		TransactionNumber: string
		BillNumber: string
		ServiceType: string
		VehicleType: string
		Date: string
		Time: string
		ServiceCost: string
		Discount: string
		Total: string
		Deposit: string
		Remaining: string
	}
}

const BookingInvoice = ({ invoiceDetails }: BookingInvoiceProps) => {
	return (
		<div id="booking-invoice">
			<div className="card">
				<table className="w-full">
					<tbody>
						{Object.entries(invoiceDetails).map(([key, value]) => (
							<tr key={key}>
								<td>{key}</td>
								<td>{value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BookingInvoice
