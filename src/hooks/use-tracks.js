import {useState, useEffect} from 'react'

export default function useTracks(channelId, database) {
	const [tracks, setTracks] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			let res
			try {
				res = await database
					.from('channel_track')
					.select('id:track_id, created_at, track_id(url, title, description, tags)')
					.limit(3000)
					.eq('channel_id', channelId)
					.order('created_at', {ascending: false})
				setTracks(serializeAll(res.data))
				setError(null)
			} catch (error) {
				setError(error)
				console.log('Error fetching tracks', error)
			}
		}
		if (channelId) fetchData()
	}, [channelId, database])

	return {data: tracks, error, setTracks}
}

// Because of the nested query we get a track like this:
// {id, track_id: {title, url...}}
// This flattens it back.
function serializeAll(tracks) {
	return tracks.map((track) => {
		track.url = track.track_id.url
		track.title = track.track_id.title
		track.description = track.track_id.description
		track.tags = track.track_id.tags
		delete track.track_id
		return track
	})
}
