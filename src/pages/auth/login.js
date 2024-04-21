import {useNavigate, useSearchParams} from 'react-router-dom'
import ResetPasswordForm from 'components/auth-reset-password-form'

export default function PageLogin(props) {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const {dbSession: {database, session, signIn, signOut}} = props
	const {auth} = database

	return !session ? (
		<>
			<p>Migration of a v1 radio4000 channel, requires a v2 user account.</p>
		<p>If you don't have one yet,<a href="https://radio4000.com">create it</a> then come back here</p>
		</>
		) : (
		<>
			<p>You are logged in.</p>
			<button onClick={signOut}>Log out</button>
			</>
		)
}
