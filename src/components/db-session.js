import config from 'config'
import {useState, useEffect} from 'react'
import {supabase} from 'utils/supabase-client'
import {signUp, signIn, signOut} from 'utils/auth'
import {DbSessionContext} from 'contexts/db-session'
import useSession from 'hooks/use-session'
import useUserChannels from 'hooks/use-user-channels'

const {RADIO4000_API_URL} = config

export default function DbSession({children}) {
	const radio4000ApiUrl = RADIO4000_API_URL

	const database = supabase
	const session = useSession(database)
	const {userChannels, channelIdByActivity} = useUserChannels(database, session?.user?.id)
	const [userChannel, setUserChannel] = useState(null)

	// Not sure why this would be needed?
	// useEffect(() => {
	// 	if (!userChannel) {
	// 		setUserChannel(null)
	// 	}
	// }, [userChannel])

	useEffect(() => {
		if (userChannels?.length) {
			const x = userChannels.find((c) => c.id === channelIdByActivity)
			setUserChannel(x || userChannels[0])
		}
	}, [userChannels, channelIdByActivity])

	const dbSessionContext = {
		/* r4 context */
		radio4000ApiUrl,

		/* supabase context */
		database,
		session,
		userChannels,
		userChannel,
		setUserChannel /* usisng the state setter to set active channel as userChannel */,
		signOut,
		signIn,
		signUp,
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>
			{children}
		</DbSessionContext.Provider>
	)
}
