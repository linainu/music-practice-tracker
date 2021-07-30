import db from '../firebaseInit'
import firebase from 'firebase'

export default {
    actions: {
        async login({commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
              commit('setError', e)
              console.log(e)
              throw e
            }
        },
        async logout({commit}) {
            await firebase.auth().signOut()
        },
        // регистрация пользователя
        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await db.collection('users').doc(uid).set({name})
            } catch(e) { 
               commit('setError', e)
               console.log(e)
               throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    },
    
}

