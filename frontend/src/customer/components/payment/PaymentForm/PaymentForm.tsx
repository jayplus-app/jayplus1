import Button from '../../../../shared/Button/Button'
import './PaymentForm.css'
import StripeCheckoutForm from './StripeCheckoutForm'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu')

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
	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		const headers = new Headers()
		headers.append('Content-Type', 'application/json')
		headers.append('Accept', 'application/json')

		const options = {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				billNumber: invoiceDetails.billNumber,
			}),
		}
		// Create PaymentIntent as soon as the page loads
		// fetch('/api/v1.0/booking/pay-invoice', options)
		fetch('http://localhost:4242/create-payment-intent', options)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setClientSecret(data.clientSecret)
			})
			.catch((error) => {
				console.log('Error')
				console.log(error)
			})
	}, [invoiceDetails.billNumber])

	const options = {
		clientSecret,
	}

	return (
		<div id="payment-form">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<StripeCheckoutForm />
				</Elements>
			)}
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
