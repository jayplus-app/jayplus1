import Button from '../../../../shared/Button/Button'
import './PaymentForm.css'

interface PaymentFormProps {
	invoiceDetails: {
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
}

const PaymentForm = ({ invoiceDetails }: PaymentFormProps) => {
	return (
		<div id="payment-form">
			<form className="w-full mt-4">
				<div className="flex flex-wrap">
					<div className="w-full">
						<label className="block tracking-wide" htmlFor="phone">
							Phone Number
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="phone"
							type="text"
							placeholder="Enter your phone number"
						/>
					</div>
				</div>
				<div className="flex flex-wrap">
					<div className="w-full">
						<label
							className="block tracking-wide"
							htmlFor="cardNumber"
						>
							Card Number
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="cardNumber"
							type="text"
							placeholder="Enter your card number"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="w-1/2">
						<label
							className="block tracking-wide"
							htmlFor="expiryDate"
						>
							Expiry Date
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="expiryDate"
							type="text"
							placeholder="MM/YY"
						/>
					</div>
					<div className="w-1/2">
						<label className="block tracking-wide" htmlFor="cvc">
							CVC
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="cvc"
							type="text"
							placeholder="Enter your CVC"
						/>
					</div>
				</div>
				<div className="flex flex-wrap">
					<div className="w-full">
						<label
							className="block tracking-wide"
							htmlFor="nameOnCard"
						>
							Name on Card
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="nameOnCard"
							type="text"
							placeholder="Enter the name on your card"
						/>
					</div>
				</div>
				<div className="flex items-center justify-center gap-2 mt-4">
					<Button to="/" backgroundColor="#CED4DA" fullWidth={true}>
						Cancel
					</Button>
					<Button
						to="/payment-success"
						backgroundColor="#FFC960"
						fullWidth={true}
					>
						Pay {invoiceDetails.deposit}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default PaymentForm
