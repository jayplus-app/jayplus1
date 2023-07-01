import './BookingInvoice.css'

interface InvoiceDetails {
	billNumber: number
	time: string
	cancelledAt: string
	TransactionNumber: number
	serviceType: string
	vehicleType: string
	serviceCost: number
	discount: number
	total: number
	deposit: number
	remaining: number
	payedAt: string
}

interface BookingInvoiceProps {
	invoiceDetails: InvoiceDetails
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
