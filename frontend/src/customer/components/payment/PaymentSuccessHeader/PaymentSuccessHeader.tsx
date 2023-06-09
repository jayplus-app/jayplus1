import './PaymentSuccessHeader.css'

const PaymentSuccessHeader = () => {
	return (
		<div id="payment-success-header">
			<img
				className="inline-block"
				src="https://jayplus.app/images/check-circle.svg"
				alt="JayPlus"
			/>
			<h1 className="font-bold text-lg text-[#367763] mb-2">
				DONE SUCCESSFULLY
			</h1>
		</div>
	)
}

export default PaymentSuccessHeader
