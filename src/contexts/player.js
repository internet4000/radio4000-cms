const {createContext, useContext, useState} = require('react')

const PlayerContext = createContext()

function PlayerProvider(props) {
	const [channel, setChannel] = useState()
	const [track, setTrack] = useState()
	const value = {channel, setChannel, track, setTrack}
	return <PlayerContext.Provider value={value}>{props.children}</PlayerContext.Provider>
}

function usePlayer() {
	const context = useContext(PlayerContext)
	if (context === undefined) throw new Error('usePlayer must be used within a PlayerProvider')
	return context
}

export {PlayerProvider, usePlayer}
