import useSession from '../hooks/use-session'
import {DbSessionContext} from '../contexts/db-session'
import {supabase} from '../utils/supabase-client'

export default function DbSession({children}) {
	const database = supabase
	const session = useSession(database)
	const dbSessionContext = {
		session,
		database,
		signOut: () => database.auth.signOut(),
		signIn: ({email, password}) => {
			if (password) {
				return database.auth.signIn({email, password})
			} else {
				return database.auth.signIn({email})
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
		}
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>
			{children}
		</DbSessionContext.Provider>
	)
}
