import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'
import { isDisabled } from '@testing-library/user-event/dist/utils'

interface ButtonProps {
	backgroundColor?: string
	color?: string
	fullWidth?: boolean
	width?: string
	height?: string
	disabled?: boolean
	onClick?: () => void
	to?: string
	type?: 'button' | 'submit' | 'reset' | undefined
	children: React.ReactNode
}

const Button = ({
	backgroundColor,
	color,
	fullWidth = false,
	width = 'auto',
	height = 'auto',
	disabled = false,
	onClick,
	children,
	to,
	type = 'button',
}: ButtonProps) => {
	const style = {
		backgroundColor: backgroundColor,
		color: color,
		width: fullWidth ? '100%' : width,
		height: height,
	}

	// Checking whether it's a Link button or a normal button
	if (to) {
		return (
			<Link
				to={to}
				className={`btn flex justify-center ${
					disabled ? 'disabled' : ''
				}`}
				style={style}
				onClick={onClick}
			>
				{children}
			</Link>
		)
	} else {
		return (
			<button
				type={type}
				className={`btn ${disabled ? 'disabled' : ''}`}
				style={style}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		)
	}
}

export default Button
