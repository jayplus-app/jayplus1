import { ReactNode } from 'react'
import './DayNavigationButton.css'

interface DayNavigationButtonProps {
	children: ReactNode
	onClick: () => void
	disabled?: boolean
}

const DayNavigationButton = ({
	children,
	onClick,
	disabled = false,
}: DayNavigationButtonProps) => {
	return (
		<button
			className={`day-navigation-button px-2 rounded ${
				disabled ? 'disabled' : ''
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default DayNavigationButton
