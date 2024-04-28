import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function useSession(sessionProvider) {
	const [session, setSession] = useState(sessionProvider.auth.getSession())
	const navigate = useNavigate()

	useEffect(() => {
		sessionProvider.auth.onAuthStateChange((eventName, session) => {
			/* Handle redirect, when clicked <email link to reset your password>. */
			if (eventName === 'PASSWORD_RECOVERY') {
				navigate('/reset-password/')
			}
			setSession(session)
		})
	}, [sessionProvider.auth, navigate])

	return session
}
