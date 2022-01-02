import {Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => (
				<>
					{!session ? (
						<header>
							<p>
								Welcome to the new radio4000 website!
							</p>
						</header>
					) : (
						<>
							{userChannel && (
								<p>
									You channel is {userChannel.title}
								</p>
							)}
							{!userChannel && (
								<p>
									You don't have a channel yet: <Link to="/new">create one</Link>. You can import one from radio4000 version 1.
								</p>
							)}
						</>
					)}
				</>
			)}
		</DbSessionContext.Consumer>
	)
}
