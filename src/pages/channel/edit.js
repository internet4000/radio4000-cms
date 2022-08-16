import {Link, useNavigate, useParams} from 'react-router-dom'
import useChannel from 'hooks/use-channel'
import useTracks from 'hooks/use-tracks'
import useCanEdit from 'hooks/use-can-edit'

import {updateChannel, deleteChannel} from 'utils/crud/channel'
import {UpdateForm, DeleteForm} from 'components/channels/forms'

export default function PageChannelEdit({dbSession: {database, session, userChannels}}) {
	const {slug} = useParams()
	const {data: channel, error, loading} = useChannel(database, slug)
	const canEdit = useCanEdit(userChannels, channel)

	if (loading) return <p>Loading...</p>
	if (!channel) return <p>Channel not found</p>
	if (error) return <p>{error.details}</p>

	return <Channel key={channel.id} channel={channel} database={database} canEdit={canEdit} />
}

function Channel({channel, database, canEdit}) {
	const navigate = useNavigate()
	const {data: tracks, error} = useTracks(channel.id, database)

	if (error) return <p>{error.details}</p>
	if (!canEdit) return <p>Nop</p>

	return (
		<article key={channel.id}>
			<header>
				<p>
					<Link to={`/${channel.slug}/`}>&larr; back to @{channel.slug}</Link>
				</p>
				<h1>Edit channel</h1>
			</header>

			<UpdateForm
				channel={channel}
				onSubmit={(changes) => updateChannel({database, id: channel.id, changes})}
			/>

			<h2>Delete channel</h2>
			<DeleteForm
				channel={channel}
				onSubmit={() =>
					deleteChannel({database, id: channel.id}).then(() => {
						navigate('/channels/me')
					})
				}
			/>

			<h2>{tracks.length} Tracks</h2>
		</article>
	)
}
