import useForm from 'hooks/use-form'
import ErrorDisplay from 'components/error-display'

export function ResetPasswordForm({onResetPassword}) {
	const {form, bind, handleSubmit, error, loading, result} = useForm(
		{},
		{
			onSubmit: (changes) => onResetPassword(changes.email),
		}
	)

	if (result) {
		return <p>OK, now check your email for a link to reset your password.</p>
	}

	return (
		<details>
			<summary>Reset password</summary>
			<form onSubmit={handleSubmit}>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Your email"
					autoFocus={true}
					value={form.email}
					onChange={bind}
					required
				/>
				<button disabled={result || loading}>
					{loading ? <span>Loading</span> : <span>Reset password</span>}
				</button>
			</form>
			<ErrorDisplay error={error} />
		</details>
	)
}

export function ResetPasswordFormSession({onResetPassword, session}) {
	const {user} = session
	const {form, error, bind, handleSubmit} = useForm(
		{},
		{
			onSubmit: () =>
				onResetPassword(session.access_token, {
					password: form.password,
				}),
		}
	)
	return (
		<form onSubmit={handleSubmit}>
			<h2>Reset password for {user.email}</h2>
			<input
				id="password"
				placeholder="Enter a new password"
				type="text"
				minLength="6"
				required
				onChange={bind}
			></input>
			<button type="submit">Set new password</button>
			<ErrorDisplay error={error} />
		</form>
	)
}

export default ResetPasswordForm
