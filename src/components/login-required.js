import React from 'react'
import {Link} from 'react-router-dom'

export default function LoginRequired({
	message = '',
	register = false,
	importChannel = false,
}) {
	let href = '/login'
	console.log(register, importChannel)
	if (register) {
		href = '/register'
	}
	if (importChannel) {
		href = `${href}?import=true`
	}
	return (
		<small>
			<i>
				<Link to={href}>
					{register ? 'Register' : 'Login'}
				</Link>
				{' '}
				into the new r4
				{!message ? `.` : (
					`, ${message}.`
				)}
			</i>
		</small>
	)
}
