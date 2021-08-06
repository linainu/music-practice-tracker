import db from '../firebaseInit'
import firebase from 'firebase/app'

export default {
    actions: {
        async fetchUserInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const user = await db.collection('users').doc(uid).get()
                return user.data()
            } catch(e) {
               commit('setError', e)
               throw e
            }
        },
        async updateUserName({dispatch, commit}, name) {
            try {
                const uid = await dispatch('getUid')
                const user = await db.collection('users').doc(uid).update({name})
 
            } catch(e) {
               commit('setError', e)
               throw e
            }
        }
    },
    
}