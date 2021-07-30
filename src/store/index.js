import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import songs from './songs'

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
    auth, songs
  },
  getters: {
    error: s => s.error
  }
  })
