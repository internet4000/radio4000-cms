import config from 'config'
import {useState, useEffect} from 'react'
import {supabase} from 'utils/supabase-client'
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
		signOut: () => database.auth.signOut(),
		signIn: ({email, password, token}) => {
			const options = {captchaToken: token}
			if (password) {
				return database.auth.signIn({email, password, options})
			} else {
				return database.auth.signIn({email, options})
			}
		},
		signUp: async ({email, password}) => {
			if (!email) return
			if (password) {
				return database.auth.signUp({email, password})
			} else {
				// here we need to create a user with sign in, when no pw
				return database.auth.signIn({email})
			}
		},
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>
			{children}
		</DbSessionContext.Provider>
	)
}
