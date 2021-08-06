import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import songs from './songs'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
  }
  },
  actions: {
  },
  modules: {
    auth, songs, user
  },
  getters: {
    error: s => s.error
  }
  })
