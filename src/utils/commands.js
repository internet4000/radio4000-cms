export default function createCommands({isSignedIn, navigate, userChannel}) {
	let commands = []

	commands.push({
		label: 'Go to home',
		keys: 'g h',
		action: () => {
			navigate('/')
		},
	})

	/* commands.push({
		 label: 'Go to channels',
		 action: () => {
		 navigate('/channels')
		 },
		 }) */

	// Has a channel
	if (userChannel) {
		/* commands.push({
			 label: `Go to your channel: ${userChannel.name}`,
			 keys: 'g c',
			 action: () => navigate(`/${userChannel.slug}`),
			 }) */
		/* commands.push({
			 label: `Create track`,
			 keys: 'c c',
			 action: () => navigate('/create/track'),
			 }) */
		/* commands.push({
			 label: `Edit your channel`,
			 keys: 'g e',
			 action: () => navigate(`/${userChannel.slug}/edit`),
			 }) */
		// Does not have a channel
	} else {
		/* commands.push({
			 label: `Create new channel`,
			 action: () => navigate(`/create/channel`),
			 }) */
		commands.push({
			label: `Import channel`,
			action: () => navigate(`/create/channel/import`),
		})
	}

	commands.push({
		label: 'Go to account',
		keys: 'g a',
		action: () => {
			navigate('/account')
		},
	})

	commands.push(
		{
			label: 'Set interface theme to light',
			action: () => {
				// context too hard, yolo
				document.querySelector('.Layout').classList.add('Layout--theme-light')
				document.querySelector('.Layout').classList.remove('Layout--theme-dark')
			},
		},
		{
			label: 'Set interface theme to dark',
			action: () => {
				document.querySelector('.Layout').classList.remove('Layout--theme-light')
				document.querySelector('.Layout').classList.add('Layout--theme-dark')
			},
		}
	)

	if (isSignedIn && !userChannel) {
		commands.push({
			label: 'Create channel',
			keys: 'c c',
			action: () => {
				navigate('/create/channel')
			},
		})
	}

	if (isSignedIn) {
		commands.push({
			label: 'Log out',
			action: () => {
				navigate('/logout')
			},
		})
	} else {
		commands.push(
			{
				label: 'Register',
				action: () => {
					navigate('/register')
				},
			},
			{
				label: 'Log in',
				action: () => {
					navigate('/login')
				},
			}
		)
	}

	return commands
}
