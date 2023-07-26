import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const { authToken, setAuthToken } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		setError('')
	}, [email, password])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		let payload = {
			email: email,
			password: password,
		}

		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(payload),
		}

		fetch('/authenticate', options)
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError(data.message)
				} else {
					setAuthToken(data.access_token)
					console.log(authToken)
					setIsLoggedIn(true)
					setError('')
					navigate('/admin/booking')
				}
			})
			.catch((err) => {
				setError(err.message)
			})
	}

	return (
		<div>
			{isLoggedIn ? (
				<div className="success">
					<p>Login success</p>
					<h1>Redirecting...</h1>
				</div>
			) : (
				<div>
					<div id="form-error" className="mb-4">
						<p className="text-red-500">{error}</p>
					</div>
					<h1 className="text-3xl font-bold mb-4">Login</h1>
					<form className="w-full mt-4" onSubmit={handleSubmit}>
						<div className="flex flex-wrap">
							<div className="w-full">
								<label
									className="block tracking-wide"
									htmlFor="username"
								>
									Username
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="username"
									type="text"
									placeholder="Enter your username"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="flex flex-wrap">
							<div className="w-full">
								<label
									className="block tracking-wide"
									htmlFor="password"
								>
									Password
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="password"
									type="password"
									placeholder="Enter your password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
						</div>
						<div className="flex flex-wrap">
							<div className="w-full">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									type="submit"
								>
									Login
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default LoginForm
