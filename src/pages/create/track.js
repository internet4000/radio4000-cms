import {useState} from 'react'
import {CreateTrackForm} from 'components/tracks/forms'
import {UserChannelsSelect} from 'components/channels'
import LoginRequired from 'components/login-required'

export default function PageCreateTrack({
	dbSession: {setUserChannel, userChannel, userChannels, database, session},
}) {
	const [message, setMessage] = useState('')

	const handleChannelChanged = ({target: {name, value: selectedChannelSlug}}) => {
		const selectedChannel = userChannels.find((channel) => {
			return channel.slug === selectedChannelSlug
		})
		setUserChannel(selectedChannel)
	}

	return (
		<>
			<header>
				<menu>
					<li>
						Adding track to
						<UserChannelsSelect
							userChannel={userChannel}
							userChannels={userChannels}
							onChange={handleChannelChanged}
						/>
					</li>
				</menu>
			</header>
			<main>
				<CreateTrackForm
					channelId={userChannel?.id}
					database={database}
					userId={session?.user?.id}
					afterSubmit={({data: track}) => {
						setMessage('Track added')
						setTimeout(() => setMessage(''), 3000)
					}}
				></CreateTrackForm>
				{message}
			</main>
			{!session && (
				<footer>
					<i>
						<small>To add a track into a radio channel, </small>
						<LoginRequired fromTo={true} />
						<small> Then let's go!</small>
					</i>
				</footer>
			)}
		</>
	)
}