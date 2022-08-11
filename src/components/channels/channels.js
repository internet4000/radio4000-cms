import {usePlayer} from 'contexts/player'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Channels({channels}) {
	const player = usePlayer()

	return channels ? (
		<ul>
			{channels.map((channel) => (
				<li key={channel.id}>
					<button type="button" onClick={() => player.setChannel(channel)}>
						▶
					</button>
					<Link to={`/${channel.slug}/`}>{channel.name}</Link>
				</li>
			))}
		</ul>
	) : (
		<p>No channelsi ??</p>
	)
}
