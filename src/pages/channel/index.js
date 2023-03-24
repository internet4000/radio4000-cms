import {useState} from 'react'
import {useParams} from 'react-router-dom'
import useChannel from 'hooks/use-channel'
import useCanEdit from 'hooks/use-can-edit'
import {firebaseGetChannelBySlug} from 'sdk/firebase-client'
import {Channel} from 'components/channels'
import config from 'config'

export default function PageChannel({dbSession: {database, session, userChannels}}) {
	const {slug} = useParams()
	const {data: channel, error, loading} = useChannel(database, slug)
	const canEdit = useCanEdit(userChannels, channel)
	const [firebaseChannel, setFirebaseChannel] = useState()

	if (loading) return <p>Loading...</p>

	if (firebaseChannel) {
		return (
			<iframe
				src={`${config.RADIO4000_API_URL}/embed?slug=${slug}`}
				width="320"
				height="500"
				frameBorder="0"
				title={firebaseChannel.title}
			></iframe>
		)
	}

	// If there is no supabase channel, before returning 404,
	// check if there's a channel in the old Firebase to use.
	if (error) {
		firebaseGetChannelBySlug(slug).then(setFirebaseChannel)
	}

	// if (error) return <p>{error.details}</p>
	if (!channel) return <p>Channel not found</p>

	return (
		<Channel
			key={channel.id}
			channel={channel}
			session={session}
			database={database}
			canEdit={canEdit}
		/>
	)
}
