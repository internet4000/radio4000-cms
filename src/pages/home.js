import config from 'config'
// import {Link} from 'react-router-dom'
import useChannels from 'hooks/use-channels'
import Channels from 'components/channels'

const {RADIO4000_APP_NAME} = config

export default function PageHome({dbSession: {database, session, userChannel}}) {
	const { channels } = useChannels(database, 30)
	const channelsLastCreated = [...channels].slice(0)

	return (
		<>
			{!session && (
				<header>
					<p>Welcome to the new {RADIO4000_APP_NAME}!</p>
				</header>
			)}

			{/* {userChannel && (
				<p>
					Go to your channel <Link to={`/${userChannel.slug}/`}>{userChannel.slug}</Link>.
				</p>
			)} */}

			{channelsLastCreated && (
				<section>
					<p>Latest channels</p>
					<Channels channels={channelsLastCreated} />
				</section>
			)}
		</>
	)
}
