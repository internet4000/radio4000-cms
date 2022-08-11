import React from 'react'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import StyledFirebaseAuth from 'components/styled-firebase-auth'

export default function FirebaseAuth({firebase}) {
	const {auth} = firebase

	const firebaseUiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			auth.EmailAuthProvider.PROVIDER_ID,
			auth.GoogleAuthProvider.PROVIDER_ID,
			auth.FacebookAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			// need to return false for same page redirect
			signInSuccessWithAuthResult: () => false,
		},
	}

	return <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth()} />
}
