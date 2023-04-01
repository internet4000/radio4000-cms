import config from 'config'
import {Link} from 'react-router-dom'
import useChannels from 'hooks/use-channels'
// import Channels from 'components/channels'

const {RADIO4000_APP_NAME} = config

export default function PageHome({dbSession: {database, session, userChannel}}) {
	// const { channels } = useChannels(database, 30)
	// const channelsLastCreated = [...channels].slice(0)

	if (userChannel)
		return (
			<div>
				<p>Your channel has already been migrated. Great!</p>
				<p>
					It's name is <em>{userChannel.name}</em> and the slug is <code>{userChannel.slug}</code>
				</p>
			</div>
		)

	return (
		<>

			{session && !userChannel && (
				<p>
					<h2>
						<Link to="/create/channel/import">Import from the old Radio4000.</Link>
					</h2>
				</p>
			)}
		</>
	)
}
