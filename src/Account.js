import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'

export default function Account({session}) {
	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState(null)
	const [website, setWebsite] = useState(null)
	const [avatar_url, setAvatarUrl] = useState(null)

	useEffect(() => {
		getProfile()
	}, [session])

	async function getProfile() {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			let {data, error, status} = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUsername(data.username)
				setWebsite(data.website)
				setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function updateProfile({username, website, avatar_url}) {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			}

			let {error} = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal', // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Account</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					updateProfile({username, website, avatar_url})
				}}
			>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
				<br />
				<label htmlFor="username">Name</label>
				<input
					id="username"
					type="text"
					value={username || ''}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<label htmlFor="website">Website</label>
				<input
					id="website"
					type="website"
					value={website || ''}
					onChange={(e) => setWebsite(e.target.value)}
				/>
				<br />
				<button type="submit" disabled={loading}>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</form>

			<p>
				<button onClick={() => supabase.auth.signOut()}>Sign Out</button>
			</p>
		</div>
	)
}
