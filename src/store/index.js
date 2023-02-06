import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allUsers: [],
    currentUser: {}
  },

  getters: {
    ALL_USERS: state => state.allUsers,
    CURRENT_USER: state => state.currentUser
  },

  mutations: {
    SET_ALL_USERS (state, users) {
      state.allUsers = users
    },

    setCurrentUser (state, currentUser) {
      state.currentUser = currentUser
    }
  },

  actions: {
    async getUsers (context) {
      await axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
        context.commit('SET_ALL_USERS', users.data)
        return users.data
      })
    }
  }
})
