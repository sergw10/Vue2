import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    certainUser: {},
    users: [],
    posts: []
  },

  getters: {
    CERTAIN_USER: state => state.certainUser,
    USERS: state => state.users,
    POSTS: state => state.posts
  },

  actions: {
    async getUser (context, userId) {
      await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(certainUser => {
          context.commit('SET_CERTAIN_USER_TO_STATE', certainUser.data)
          return certainUser.data
        })
    },

    async getUsers (context) {
      await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(users => {
          context.commit('SET_USERS_TO_STATE', users.data)
          return users.data
        })
    },

    getPosts (context) {
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(posts => {
          context.commit('SET_POSTS_TO_STATE', posts.data)
          return posts.data
        })
    }
  },

  mutations: {
    SET_CERTAIN_USER_TO_STATE (state, certainUser) {
      state.certainUser = certainUser
    },

    SET_USERS_TO_STATE (state, users) {
      state.users = users
    },

    SET_POSTS_TO_STATE (state, posts) {
      state.posts = posts
    }
  }
})
