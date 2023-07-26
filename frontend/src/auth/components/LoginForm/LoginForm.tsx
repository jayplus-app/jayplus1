import { useState, useContext, useCallback } from 'react'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const { setAuthToken, setRefreshInterval } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')

	const navigate = useNavigate()

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const payload = {
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
						setLoginError(data.message)
					} else {
						setAuthToken(data.access_token)
						setLoginError('')
						navigate('/admin/booking')
						setRefreshInterval(true)
					}
				})
				.catch((err) => {
					setLoginError(err.message)
				})
		},
		[email, password, navigate, setAuthToken, setRefreshInterval]
	)

	return (
		<div>
			<div id="form-error" className="mb-4">
				<p className="text-red-500">{loginError}</p>
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
							onChange={(e) => setPassword(e.target.value)}
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
	)
}

export default LoginForm
