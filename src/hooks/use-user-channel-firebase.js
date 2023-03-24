import {useState, useEffect} from 'react'
import {firebaseGetUserChannel} from 'sdk/firebase-client'

export default function useUserChannelFirebase(userId) {
	const [userChannel, setUserChannel] = useState(null)
	useEffect(() => {
		const fetchUserChannel = async () => {
			let channel
			try {
				channel = await firebaseGetUserChannel(userId)
			} catch (error) {
				console.error('Error getting firebase user', error)
				setUserChannel(null)
			}
			if (channel) setUserChannel(channel)
		}
		if (userId) fetchUserChannel()
	}, [userId])

	return userChannel
}
