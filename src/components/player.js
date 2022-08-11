import 'radio4000-player'
import {useRef, useEffect} from 'react'
import {usePlayer} from 'contexts/player'
import useTracks from 'hooks/use-tracks'

export default function Player({database}) {
	const {channel} = usePlayer()
	const playerEl = useRef(null)
	const {data: tracks} = useTracks(channel?.id, database)

	if (tracks?.length) {
		const vue = playerEl.current.getVueInstance()
		vue.updatePlaylist(buildPlaylist(channel, tracks))
	}

	return (
		<div className="Player">
			<Statusline />
			<radio4000-player
				ref={playerEl}
				// channel-slug={channel?.slug}
				// autoplay="true"
				// volume="0"
				show-header="false"
				show-controls="false"
				show-tracklist="true"
			></radio4000-player>
		</div>
	)
}

function Statusline() {
	const {channel, track} = usePlayer()
	return (
		<div className="Statusline">
			{channel && channel.name} | {track && track.title}
		</div>
	)
}

function buildPlaylist(channel, tracks) {
	return {
		title: channel.title,
		tracks,
	}
}
