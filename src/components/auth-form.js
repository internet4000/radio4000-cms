import {useState} from 'react'

export default function Auth({
	onSubmit
}) {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [data, setData] = useState({email: '', password: ''})
	const {email, password} = data

	const handleChange = ({target}) => {
		const {name, value} = target
		setData({
			...data,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleLogin(data)
	}

	const handleLogin = async (loginData) => {
		try {
			setLoading(true)
			const {error} = await onSubmit(loginData)
			if (error) {
				setErrorMessage(error)
				throw error
			}
			setErrorMessage(false)
			if (!password) {
				setMessage('Check your email for the login link!')
			}
		} catch (error) {
			console.log(error)
			setErrorMessage(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<p>Sign in via magic link with your email below</p>
			<form onSubmit={handleSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Your email"
					autoFocus={true}
					value={email}
					onChange={handleChange}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Your password"
					value={password}
					onChange={handleChange}
				/>
				<button disabled={loading}>
					{loading ? <span>Loading</span> : <span>Send magic link</span>}
				</button>
			</form>
			{errorMessage && <p danger="true">Error: {errorMessage.message}</p>}
			{message && <p>{message}</p>}
		</div>
	)
}