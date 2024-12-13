import {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import HCaptcha from "@hcaptcha/react-hcaptcha"
import config from 'config'


export default function Auth({onSubmit, submitLabel, redirectTo}) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [data, setData] = useState({email: '', password: '', token: ''})

	const captchaEl = useRef()

	const handleChange = ({target}) => {
		const {name, value} = target
		setData({
			...data,
			[name]: value,
		})
	}
	const handleVerificationSuccess = (newToken) => {
		setData({
			...data,
			token: newToken
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
			} else {
				setErrorMessage(false)
			}
			if (!data.password) {
				setMessage('Check your email for the login link!')
			} else if (redirectTo) {
				navigate(redirectTo, {replace: true})
			}
		} catch(err) {
			setErrorMessage(err)
		} finally {
			setLoading(false)
			captchaEl?.current?.resetCaptcha()
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="FormStacked" name="login-v2">
				<label>Email
					<input
						name="email"
						type="email"
						placeholder="Your email"
						autoFocus={true}
						value={data.email}
						disabled={loading}
						onChange={handleChange}
						required
					/>
				</label>
				<label>Password
					<input
						name="password"
						type="password"
						placeholder="Your password"
						value={data.password}
						disabled={loading}
						onChange={handleChange}
					/>
				</label>
				<label>Captcha
					<HCaptcha
						ref={captchaEl}
						sitekey={config.HCAPTCHA_SITE_KEY}
						onVerify={handleVerificationSuccess}
					/>
				</label>
				<button disabled={loading} type="submit">
					{loading ? <span>Loading</span> : <span>{submitLabel || 'Send magic link'}</span>}
				</button>
			</form>
			{errorMessage && <p danger="true">Error: {errorMessage.message}</p>}
			{message && <p>{message}</p>}
		</div>
	)
}
