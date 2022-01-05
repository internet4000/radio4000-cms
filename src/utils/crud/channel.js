// import {firebaseGetChannelBySlug} from '../firebase-client'

export const createChannel = async ({database, channel, user}) => {
	const {name, slug} = channel
	const {id: user_id} = user

	// Check if slug exists in firebase-radio4000
	// const isSlugTaken = await firebaseGetChannelBySlug(slug)
	// console.log(isSlugTaken)
	// if (isSlugTaken) throw new Error('Sorry. This channel slug is already taken by someone else.')

	// Create channel
	const res = await database.from('channels').insert({name, slug}).single()

	// Stop if the first query failed.
	if (res.error) return res

	// Create junction table
	const channel_id = res.data.id
	return database.from('user_channel').insert({user_id, channel_id}).single()
}

export const updateChannel = async ({database, id, changes}) => {
	console.log('updating channel', id, changes)
	const {name, slug, description} = changes
	return database.from('channels').update({name, slug, description}).eq('id', id)
}

export const deleteChannel = async ({database, id}) => {
	if (!id) return
	console.log('deleting channel', id)
	return database.from('channels').delete().eq('id', id)
}
