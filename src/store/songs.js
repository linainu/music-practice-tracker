import db from '../firebaseInit'
import firebase from 'firebase'

export default {
    actions: {
        async fetchSongs({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const songs = (await db.collection('users').doc(`${uid}`).collection('songs').orderBy('creation_date').get())
                const res = []

                if (songs.empty) {
                    return res
                }

                songs.forEach(doc => {
                    const data = {}
                    data.id = doc.id
                    data.artist = doc.data().artist
                    data.title = doc.data().title
                    data.creation_date = doc.data().creation_date.toDate()
                    res.push(data)
                })
                
                return res
                
            } catch (e) {
                console.log(e)
                commit('setError', e)
                throw e
            }
        },    
    }
}