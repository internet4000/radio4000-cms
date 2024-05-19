import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import FirebaseAuth from 'components/firebase-ui/auth'
import AuthForm from 'components/auth-form'
import ErrorDisplay from 'components/error-display'
// import LoginRequired from 'components/login-required'

import {firebase, startFirebase} from 'utils/firebase-client'
import useSessionFirebase from 'hooks/use-session-firebase'
import useUserChannelFirebase from 'hooks/use-user-channel-firebase'

// This is not how to do it (?), but we can delay figuring it out until we need Firebase in a second place.
startFirebase()

export default function PageNewChannelImport({dbSession: {radio4000ApiUrl, session, signIn}}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [migrationResult, setMigrationResult] = useState(false)

	const sessionFirebase = useSessionFirebase(firebase)
	const userChannelFirebase = useUserChannelFirebase(sessionFirebase?.uid)

	const tokenSupabase = session?.access_token
	const tokenFirebase = sessionFirebase?.accessToken

	const handleSignIn = async (data) => {
		let res
		try {
			res = await signIn(data)
			if (!res.error) {
			}
		} catch (error) {
			console.log('Error login-in', error)
		}
		return res
	}

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
			<header>
				<p>To <strong>migrate/import a radio channel</strong> from Radio4000 version 1 (<a href="https://v1.radio4000.com">v1.radio4000.com</a>) to the new Radio4000 version 2 (<a href="https://radio4000.com">radio4000.com</a>). If you're experiencing any issue, <a href="https://radio4000.com/settings#about">we can help</a>!</p>
		<ol>
			<li>
				<a href="https://radio4000.com/sign/up">Sign-up for a version 2 user account</a> (required for everyone, also for version 1 users)
			</li>
			<li>
				On this page, <strong>sign-in your two accounts</strong> (version 1 and version 2).
			</li>
			<li>
				Click the <strong>import</strong> button (the radio channel and all its tracks are imported)
			</li>
			<li>
				<strong>Visit your new radio</strong> page!
			</li>
			<li>
				<i>(Optional) Repeat the operation, to import multiple radio channels into one Radio4000 version 2 account.</i>
			</li>
		</ol>
		</header>

		{/* LOGIN STUFF */}

		<r4-migration>
			<r4-migration-step>
				<h3>Login Radio4000 <mark>version 1</mark></h3>
				{sessionFirebase ? (
					<p>
						✔ {sessionFirebase.email}{' '}
		<button onClick={() => firebase.auth().signOut()} className="ButtonReset underline">
			Log out
		</button>
				</p>
				) : (
				<>
					<FirebaseAuth firebase={firebase} />
					<blockquote>Use a Radio4000 version 1 account for this step.</blockquote>
					</>
)}
</r4-migration-step>

<r4-migration-step>
	<h3>Login Radio4000 <mark>version 2</mark> (new)</h3>
	{session?.user?.email ? (
		<p>
			✔ {session?.user.email} <Link to="/logout">Log out</Link>
		</p>
	) : (
		<>
			<AuthForm onSubmit={handleSignIn} submitLabel="Sign in" />
			<blockquote>Use a Radio4000 version 2 account for this step (this is a "new account" that everyone needs to create, in order to use the new radio system).</blockquote>
		</>

	)}
</r4-migration-step>

<r4-migration-step>
{/* MIGRATE STUFF */}
				{sessionFirebase && session?.user?.email ? (
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
								Start channel migration
							</h2>
							<p>
								Import channel <strong>@{userChannelFirebase.slug}</strong> into radio4000 v2.
							</p>
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
	<section>
		<h1>Successfully imported @{userChannelFirebase.slug}!</h1>
		<p>Go to the new Radio4000. Your channel is waiting for you.</p>
		<p><a href={`https://radio4000.com/${userChannelFirebase.slug}`}>radio4000.com/{userChannelFirebase.slug}</a></p>
	</section>
) : (
	<ErrorDisplay error={error} />
)}
</>
) : (
	<i>
		Waiting for user authentication into version 1 & version 2 accounts, to start radio channel migration. This will import to the version 2 website.
	</i>
)}
</r4-migration-step>
</r4-migration>
</>
)
}
