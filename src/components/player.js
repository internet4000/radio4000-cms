import 'radio4000-player'
import {useRef, useEffect} from 'react'
import {usePlayer} from 'contexts/player'
import useTracks from 'hooks/use-tracks'

export default function Player({database}) {
	const ref = useRef(null)
	const {channel, track} = usePlayer()
	const {data: tracks} = useTracks(channel?.id, database)

	// console.log('<Player>', {channel, track})

	function trackChanged(event) {
		console.log('track changed', event)
	}

	// Set up event listeners for <radio4000-player>
	useEffect(() => {
		const element = ref.current
		element.addEventListener('trackChanged', trackChanged)
		return () => {
			element.removeEventListener('click', trackChanged)
		}
	}, [])

	// Load channel or track into player
	if (ref.current) {
		const vue = ref.current.getVueInstance()

		if (channel && tracks?.length) {
			vue.updatePlaylist(buildPlaylist(channel, tracks))
			console.log('sat playlist from channel')
		} else if (track) {
			vue.updatePlaylist({
				title: 'meh',
				tracks: [track],
			})
			console.log('sat playlist from track')
		}
	}

	return (
		<div className="Player">
			<Statusline />
			<radio4000-player
				ref={ref}
				autoplay="true"
				show-header="false"
				show-tracklist="true"
				show-controls="false"
				// channel-slug={channel?.slug}
				// volume="0"
			></radio4000-player>
		</div>
	)
}

function Statusline() {
	const {channel, track} = usePlayer()
	return (
		<div className="Statusline">
			{channel?.name}
			{track && ` | ${track.title}`}
		</div>
	)
}

function buildPlaylist(channel, tracks) {
	return {
		title: channel.title,
		tracks,
	}
}
