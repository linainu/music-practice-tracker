import db from '../firebaseInit'

export default {
  actions: {
    async fetchSongs({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const songs = await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .orderBy('creation_date', 'desc')
          .get()
        const res = []

        if (songs.empty) {
          return res
        }

        songs.forEach(doc => {
          const data = {}
          data.id = doc.id
          data.artist = doc.data().artist
          data.title = doc.data().title
          data.status = doc.data().status
          data.favorite = doc.data().favorite || false
          data.creation_date = doc.data().creation_date.toDate()
          data.last_practiced = doc.data().last_practiced
            ? doc.data().last_practiced.toDate()
            : null
          res.push(data)
        })

        return res
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSongById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const song = await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .get()
        return song.data()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async changeStatus({ commit, dispatch }, { id, status }) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .update({ status })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateLastPracticedDate({ commit, dispatch }, { id, date }) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .update({ last_practiced: date })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createSong({ commit, dispatch }, { title, artist, status }) {
      try {
        const uid = await dispatch('getUid')
        const { id } = await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .add({
            title,
            artist,
            status,
            creation_date: new Date()
          })
        return id
      } catch (e) {
        commit('setError', e)
      }
    },
    async updateSongTitle({ commit, dispatch }, { id, title }) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .update({ title })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateSongArtist({ commit, dispatch }, { id, artist }) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .update({ artist })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateSongStatus({ commit, dispatch }, { id, status }) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .update({ status })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateFavorite({ commit, dispatch }, { id, favorite }) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .update({ favorite })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteSong({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        await db
          .collection('users')
          .doc(uid)
          .collection('songs')
          .doc(id)
          .delete()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
