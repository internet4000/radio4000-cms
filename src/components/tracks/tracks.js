import {usePlayer} from 'contexts/player'
import Track from './track'

export default function Tracks({database, tracks, canEdit, afterDelete}) {
	const player = usePlayer()
	if (!tracks?.length) return <p>No tracks</p>

	return (
		<section className="Tracks">
			{tracks.map((track) => (
				<div key={track.id}>
					<button type="button" onClick={() => player.setTrack(track)}>▶</button>
					<Track
						database={database}
						track={track}
						canEdit={canEdit}
						afterDelete={afterDelete}
					></Track>
				</div>
			))}
		</section>
	)
}
