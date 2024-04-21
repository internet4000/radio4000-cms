import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import FirebaseAuth from 'components/firebase-ui/auth'
import ErrorDisplay from 'components/error-display'
// import LoginRequired from 'components/login-required'

import {firebase, startFirebase} from 'utils/firebase-client'
import useSessionFirebase from 'hooks/use-session-firebase'
import useUserChannelFirebase from 'hooks/use-user-channel-firebase'

// This is not how to do it (?), but we can delay figuring it out until we need Firebase in a second place.
startFirebase()

export default function PageNewChannelImport({dbSession: {radio4000ApiUrl, session}}) {
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
			setMigrationResult(data)
			console.log(
				res.ok,
				res.status,
				res.statusText,
				'api/import/firebase-realtime response data',
				data,
			)
			if (!res.ok) throw Error(data.message)
			if (Object.keys(data).length === 0) throw Error('Empty response from migration backend')
		} catch (error) {
			console.error(error)
			setError(error)
		} finally {
			setLoading(false)
			// firebase.auth().signOut()
		}
	}


	if (!sessionFirebase && !session) {
		// return <p>Loading</p>
	}

	return (
		<>
			<p>This tool will help you migrate your old Radio4000 channel to the new system.</p>
			<p>
				You will need an account for each. You can not use your old Radio4000 account to sign in to
				the new.
			</p>

			{/* LOGIN STUFF */}

			<h3>Old account</h3>
			{sessionFirebase?.email ? (
				<p>
					✔ {sessionFirebase.email}{' '}
					<button onClick={() => firebase.auth().signOut()} className="ButtonReset underline">
						Log out
					</button>
				</p>
			) : (
				<FirebaseAuth firebase={firebase} />
			)}

			<h2>New account</h2>
			{session?.user?.email ? (
				<p>
					✔ {session?.user.email} <Link to="/logout">Log out</Link>
				</p>
			) : (
				<p>
					<Link to="/login">Sign in to your NEW Radio4000 account</Link>
				</p>
			)}

			{/* MIGRATE STUFF */}
			{sessionFirebase?.email && session?.user?.email && (
				<>
					{!migrationResult && !userChannelFirebase ? (
						<p>
							This old Radio4000 account has no channel to migrate.
							<br />
							You can <button onClick={() => firebase.auth().signOut()}>sign out</button> and forget
							about this account.
						</p>
					) : (
						<section>
							<h2>
								Ready to import the radio channel <strong>@{userChannelFirebase.slug}</strong> into
								the new Radio4000 system.
							</h2>
							<h2>
								<button
									onClick={startMigration}
									disabled={loading || !tokenSupabase || !tokenFirebase}
									className="SuperImportantButton"
								>
									<strong>
										{loading ? 'Importing…' : 'Import'} <em>@{userChannelFirebase.slug}</em>
									</strong>
								</button>
							</h2>
						</section>
					)}

					{migrationResult && !error ? (
						<>
							<h1>Successfully imported @{userChannelFirebase.slug}!</h1>
							<p>Go to the new Radio4000. Your channel is waiting for you.</p>
							<p>
								<a href={`https://beta.radio4000.com/${userChannelFirebase.slug}`}>
									beta.radio4000.com/{userChannelFirebase.slug}
								</a>
							</p>
						</>
					) : (
						<ErrorDisplay error={error} />
					)}
				</>
			)}
		</>
	)
}
