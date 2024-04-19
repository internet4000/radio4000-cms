import {Link} from 'react-router-dom'
import LayoutAccount from 'layouts/account'

export default function Account({dbSession: {database, session, userChannel}}) {
	return (
		<LayoutAccount>
			<section>
				<p>
					You are logged in and registered as:
					<br />
					<em>{session?.user?.email}</em>
				</p>
				<p>
					<Link to="/reset-password">Change password</Link>
				</p>
				<p>
					<Link to="/logout">Log out</Link>
				</p>
			</section>
			{/*
			<section>
				<header>
					<h2>Appearance</h2>
				</header>
				<ThemeToggleButton label="Change between light &amp; dark theme"></ThemeToggleButton>
			</section>
			<section>
				<details>
					<summary>Delete your Radio4000 account?</summary>
					<p>This will permanently wipe your:</p>
					<ul>
						<li>radio channel &amp; tracks</li>
						<li>user account &amp; settings</li>
					</ul>
					<DeleteUserForm onDelete={handleDeleteUser} />
				</details>
			</section>
	*/}
		</LayoutAccount>
	)
}
