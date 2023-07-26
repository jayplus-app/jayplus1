import React, { ReactNode, useState, useRef, useEffect } from 'react'
import AuthContext from './AuthContext'

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authToken, setAuthToken] = useState('')
	const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const setRefreshInterval = (shouldStart: boolean) => {
		if (shouldStart) {
			tickIntervalRef.current = setInterval(() => {
				fetch('/refresh', {
					method: 'GET',
					credentials: 'include',
				})
					.then((res) => {
						if (!res.ok) {
							throw new Error('Failed to refresh the token')
						}
						return res.json()
					})
					.then((data) => {
						if (data.access_token) {
							setAuthToken(data.access_token)
						}
					})
					.catch((err) => {
						console.error('Error:', err.message)
					})
			}, 900000) // 15 minutes
		} else {
			if (tickIntervalRef.current) {
				clearInterval(tickIntervalRef.current)
				tickIntervalRef.current = null
			}
		}
	}

	useEffect(() => {
		return () => {
			if (tickIntervalRef.current) {
				clearInterval(tickIntervalRef.current)
			}
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				authToken,
				setAuthToken,
				setRefreshInterval,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
