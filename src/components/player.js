import 'radio4000-player'
import {usePlayer} from 'contexts/player'
import {useRef, useEffect} from 'react'

export default function Player() {
	const {channel} = usePlayer()
	const playerEl = useRef(null)

	if (channel && playerEl.current) {
		var vue = playerEl.current.getVueInstance()
		vue.updatePlaylist(testPlaylist)
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

// Create a playlist.

const testPlaylist = {
	title: 'A title for this list',
	image:
		'https://78.media.tumblr.com/5080191d7d19fe64da558f2b4324563e/tumblr_p8eoiltn1t1twkjb3o1_1280.png',
	tracks: [
		{
			id: '1',
			title: 'Randomfunk.ogg',
			url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_01_-_Randomfunk.ogg',
		},
		{
			id: '2',
			title: 'Rare and Cheese - Jazzpolice',
			url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_02_-_Jazzpolice.ogg',
		},
	],
}
