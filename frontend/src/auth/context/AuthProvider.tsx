import { ReactNode, useMemo, useState } from 'react'
import AuthContext from './AuthContext'

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authToken, setAuthToken] = useState('')

	const contextValue = useMemo(
		() => ({
			authToken,
			setAuthToken,
		}),
		[authToken, setAuthToken]
	)

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
