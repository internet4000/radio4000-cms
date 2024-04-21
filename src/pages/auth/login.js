import {useNavigate, useSearchParams} from 'react-router-dom'
import AuthForm from 'components/auth-form'
import ResetPasswordForm from 'components/auth-reset-password-form'

export default function PageLogin(props) {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const {dbSession: {database, session, signIn, signOut}} = props
	const {auth} = database
	const onResetPassword = auth?.api?.resetPasswordForEmail

	const handleSignIn = async (data) => {
		const redirect = searchParams.get('redirect')
		let res
		try {
			res = await signIn(data)
			/* navigate to previous page the user was visiting,
				after sign in (unless there is another pending redirect)  */
			if (!res.error & !redirect) {
				navigate(-1)
			} else if (redirect) {
				navigate('/' + redirect)
			}
		} catch (error) {
			console.log('Error login-in', error)
		}
		return res
	}

	return !session ? (
		<>
			{/* <details open={true}> */}
			{/* 	<summary>Log in to Radio4000</summary> */}
			{/* </details> */}
			{/* <br /> */}
			<AuthForm onSubmit={handleSignIn} submitLabel="Log in" />
			<LoginInfo onResetPassword={onResetPassword} />
			<p>Don't have one yet? Create one on <a href="https://beta.radio4000.com">beta.radio4000.com</a></p>
		</>
	) : (
		<>
			<p>You are logged in.</p>
			<button onClick={signOut}>Log out</button>
		</>
	)
}

function LoginInfo({onResetPassword}) {
	return (
		<>
			<ResetPasswordForm onResetPassword={onResetPassword} />
		</>
	)
}
