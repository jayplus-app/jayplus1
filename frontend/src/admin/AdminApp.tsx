import { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../auth/context/AuthContext'

const AdminApp = () => {
	const { authToken, setAuthToken } = useContext(AuthContext)

	const navigate = useNavigate()

	const logOut = () => {
		const options: RequestInit = {
			method: 'GET',
			credentials: 'include',
		}

		fetch('/logout', options)
			.catch((error) => console.error('Error logging out', error))
			.finally(() => {
				setAuthToken('')
			})

		navigate('/auth/login')
	}

	useEffect(() => {
		if (authToken === '') {
			const options: RequestInit = {
				method: 'GET',
				credentials: 'include',
			}

			fetch('/refresh', options)
				.then((res) => res.json())
				.then((data) => {
					if (data.access_token) {
						setAuthToken(data.access_token)
					}
				})
				.catch((err) => {
					console.log('User not logged in')
				})
		}
	}, [authToken, setAuthToken])

	return (
		<div>
			{authToken === '' ? (
				<Link
					to="/auth/login"
					className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
				>
					<span className="">Login</span>
				</Link>
			) : (
				<Link
					to="#"
					onClick={logOut}
					className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
				>
					<span className="" onClick={logOut}>
						Logout
					</span>
				</Link>
			)}
			<Outlet />
		</div>
	)
}

export default AdminApp
