import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import FirebaseAuth from 'components/firebase-ui/auth'
import ErrorDisplay from 'components/error-display'
import LoginRequired from 'components/login-required'

import {firebase, startFirebase} from 'utils/firebase-client'
import useSessionFirebase from 'hooks/use-session-firebase'
import useUserChannelFirebase from 'hooks/use-user-channel-firebase'

// This is not how to do it (?), but we can delay figuring it out until we need Firebase in a second place.
startFirebase()

export default function PageNewChannelImport({dbSession: {radio4000ApiUrl, session, userChannel}}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [migrationResult, setMigrationResult] = useState(false)

	const sessionFirebase = useSessionFirebase(firebase)
	const userChannelFirebase = useUserChannelFirebase(sessionFirebase?.uid)

	const tokenSupabase = session?.access_token
	const tokenFirebase = sessionFirebase?.accessToken

	const startMigration = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${radio4000ApiUrl}/api/import/firebase-realtime`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					tokenTest: 'r4@anonymous',
					tokenFirebase,
					tokenSupabase,
				}),
			})
			const data = await res.json()
			console.log('api/import/firebase-realtime response data', data)
			setMigrationResult(data)

			if (Object.keys(data).length === 0) {
				setError({message: 'Empty response from migration backend'})
			} else if (data.code && data.message) {
				setError(data)
			} else {
				setError(false)
			}
		} catch (error) {
			console.error('Error calling migration backend', error)
			setError(error)
		} finally {
			setLoading(false)
			// firebase.auth().signOut()
		}
	}

	let loginMessage
	if (userChannelFirebase) {
		loginMessage = `to finish importing ${userChannelFirebase.title} (@${userChannelFirebase.slug})`
	} else {
		loginMessage = `to import a radio channel from the previous system`
	}

	if (!session) {
		return (
			<>
				<p>This tool will help you migrate your old Radio4000 channel to the new system.</p>
				<p>You will need two accounts: one from the old Radio4000, one from the new.</p>
				<h2>
					<Link to="/login">First, sign in to your NEW Radio4000 account</Link>
				</h2>
			</>
		)
	}

	if (!sessionFirebase && !migrationResult)
		return (
			<>
				<h2>
					Now, sign in to your <em>OLD</em> account:
				</h2>
				<FirebaseAuth firebase={firebase} />
			</>
		)

	return (
		<>
			<p>
				✔ Access to new account: {session.user.email}
				<br />✔ Access to old account: {sessionFirebase.email}
			</p>

			{sessionFirebase && !userChannelFirebase && (
				<p>
					This old Radio4000 account has no channel to migrate.
					<br />
					You can <button onClick={() => firebase.auth().signOut()}>sign out</button> and forget
					about this account.
				</p>
			)}

			{!migrationResult && userChannelFirebase && (
				<section>
					<p>
						Ready to import the channel <strong>@{userChannelFirebase.slug}</strong> into the new Radio4000 system.
					</p>
					<h2>
						<button onClick={startMigration} disabled={loading || !tokenSupabase || !tokenFirebase}>
							<strong>
								Import <em>@{userChannelFirebase.slug}</em>
							</strong>
						</button>
					</h2>
					<button onClick={() => firebase.auth().signOut()}>
						Cancel and sign out of the old R4 system
					</button>
				</section>
			)}

			{migrationResult && !error ? (
				<>
					<h1>Successfully imported @{userChannelFirebase.slug}!</h1>
					<p>Go to the new Radio4000. Your channel is waiting for you.</p>
					<p><a href={`https://beta.radio4000.com/${userChannelFirebase.slug}`}>beta.radio4000.com/{userChannelFirebase.slug}</a></p>
				</>
			) : (
				<ErrorDisplay error={error} />
			)}

			{userChannelFirebase && !session && (
				<footer>
					<small>You'll have to </small>
					<LoginRequired register={true} importChannel={true} message={loginMessage} />
				</footer>
			)}
		</>
	)
}
