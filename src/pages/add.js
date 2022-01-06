import {Link} from 'react-router-dom'
import {useState} from 'react'
import {CreateTrackForm} from '../components/track-forms'

export default function PageAdd({dbSession}) {
	const [message, setMessage] = useState('')
	const channel = dbSession.userChannel
	if (!channel) return <p>Loading</p>

	return (
		<>
			<p>
				<Link to={`/${channel.slug}`}>&larr; Back to {channel.name}</Link>
			</p>
			<h1>Add track</h1>
			<CreateTrackForm
				channelId={channel.id}
				database={dbSession.database}
				userId={dbSession.session.user.id}
				afterSubmit={({data: track}) => {
					console.log('added track', track)
					setMessage('Track added')
					setTimeout(() => setMessage(''), 3000)
				}}
			></CreateTrackForm>
			{message}
		</>
	)
}
