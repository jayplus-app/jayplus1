import { createContext } from 'react'

interface AuthContextProps {
	authToken: string
	setAuthToken: (authToken: string) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export default AuthContext
