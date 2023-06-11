import Button from '../../../../shared/Button'
import './PaymentSuccessFooter.css'

const PaymentSuccessFooter = () => {
	return (
		<div id="payment-success-footer">
			<div className="mt-4">
				<Button
					to="/"
					width="160px"
					height="45px"
					backgroundColor="#FFC960"
				>
					Back to Home
				</Button>
			</div>
		</div>
	)
}

export default PaymentSuccessFooter
