import React from 'react'
import {NavLink as Link} from 'react-router-dom'

export default function LayoutAccount({children}) {
	return (
		<>
			<header>
				<h1>
					Account
				</h1>
				<menu>
					<li>
						<Link to="/account/">Account</Link>
					</li>
					<li>
						<Link to="/account/channels/">My channels</Link>
					</li>
				</menu>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}