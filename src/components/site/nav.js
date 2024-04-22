import {NavLink as Link} from 'react-router-dom'
import {DbSessionContext} from 'contexts/db-session'

export default function Nav() {
	return (
		<DbSessionContext.Consumer>
			{({session,  userChannels}) => {
				return (
					<>
						<menu>
							<li>
								<Link to="/">Radio4000 migration (v1 → v2)</Link>
								{/* {!session && <Link to="/login">Login</Link>} */}
								{session && (
									<>
										{/* <Link to="/account">Account</Link> */}
										{/* <Link to="/channels" end>Channels</Link> */}
									</>
								)}
							</li>
						</menu>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
