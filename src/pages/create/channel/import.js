import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import ChannelsLayout from 'layouts/channels'
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
			console.log(data)
			setMigrationResult(data)
			setError(false)
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

	return (
		<ChannelsLayout>
			{/* <h1>Import channel</h1> */}
			{!sessionFirebase && !migrationResult && (
				<>
					<p>
						This is a new version of Radio4000. <br />
						If you already have a radio from the old site, you can import it here.
					</p>
					<p>
						First sign in to your <em>old</em> account:
					</p>
					<FirebaseAuth firebase={firebase} />
				</>
			)}
			{sessionFirebase && !userChannelFirebase && (
				<p>
					This old Radio4000 account has no channel to migrate.
					<br />
					You can <button onClick={() => firebase.auth().signOut()}>sign out</button> and forget
					about this account.
				</p>
			)}
			{userChannelFirebase && (
				<section>
					<p>
						Import the channel <strong>@{userChannelFirebase.slug}</strong> and its tracks into the
						new Radio4000 system?
					</p>
					<nav>
						<button onClick={startMigration} disabled={loading || !tokenSupabase || !tokenFirebase}>
							<strong>
								Import <em>@{userChannelFirebase.slug}</em>
							</strong>
						</button>
						<button onClick={() => firebase.auth().signOut()}>
							Cancel and sign out of the old r4 system
						</button>
					</nav>
				</section>
			)}
			{migrationResult && !error ? (
				<>
					<p>Migration success!</p>
					{userChannel && <Link to={`${userChannel.slug}`}>{userChannel.title}</Link>}
				</>
			) : (
				<ErrorDisplay error={error} />
			)}

			{userChannelFirebase && !session && (
				<footer>
					<small>You'll have to</small>
					<LoginRequired register={true} importChannel={true} message={loginMessage} />
				</footer>
			)}
		</ChannelsLayout>
	)
}
