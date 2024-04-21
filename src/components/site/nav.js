import {NavLink as Link, useNavigate} from 'react-router-dom'
import config from 'config'
import {DbSessionContext} from 'contexts/db-session'
import CommandMenu from 'components/site/command-menu'
import createCommands from 'utils/commands'

const {RADIO4000_APP_NAME_MINI} = config

export default function Nav(props) {
	const navigate = useNavigate()

	return (
		<DbSessionContext.Consumer>
			{({session, setUserChannel, userChannel, userChannels}) => {
				const commands = createCommands({isSignedIn: session, navigate, userChannel})

				/* const handleChannelChanged = ({target: {name, value: selectedChannelSlug}}) => {
					 const selectedChannel = userChannels.find((channel) => {
					 return channel.slug === selectedChannelSlug
					 })
					 setUserChannel(selectedChannel)
					 navigate(`/${selectedChannelSlug}/`)
					 } */

				return (
					<>
						<CommandMenu commands={commands}></CommandMenu>
						<menu>
							<li>
								<Link to="/">{RADIO4000_APP_NAME_MINI} Migration Tool</Link>
								{/* {!session && <Link to="/login">Login</Link>} */}
								{session && (
									<>
										{/* <Link to="/account">Account</Link> */}
										{/* <Link to="/channels" end>Channels</Link> */}
										{userChannels?.length ? (
											<>
											{/*}
												<SelectUserChannel
													userChannel={userChannel}
													userChannels={userChannels}
													onChange={handleChannelChanged}
												/>
										*/}
												{/* <Link to="/create/track">+track</Link> */}
											</>
										) : null}
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
