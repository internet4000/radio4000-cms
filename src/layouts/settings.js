import React from 'react'
import {Link} from 'react-router-dom'

export default function LayoutSettings({children}) {
	return (
		<>
			<header>
				<h1>
					Settings
				</h1>
				<menu>
					<li>
						<Link to="/settings/account">Account</Link>
					</li>
					<li>
						<Link to="/settings/channels">Channels</Link>
					</li>
				</menu>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}
