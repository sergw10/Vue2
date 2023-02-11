import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allUsers: [],
    allTodoItems: [],
    currentUser: {}
  },

  getters: {
    ALL_USERS: state => state.allUsers,
    CURRENT_USER: state => state.currentUser,
    All_TODO_ITEMS: state => state.allTodoItems
  },

  mutations: {
    setAllUsers (state, users) {
      state.allUsers = users
    },

    setAllTodoItems (state, todoItems) {
      state.allTodoItems = todoItems
    },

    setNewTodoItem (state, newTodoOptions) {
      state.allTodoItems.push(newTodoOptions)
    },

    addFavoriteItemToState (state, todoItemId) {
      state.allTodoItems[todoItemId - 1] = Object.assign({}, state.allTodoItems[todoItemId - 1], {
        favorites: true
      })
    },

    removeFavoriteItemFromState (state, todoItemId) {
      state.allTodoItems[todoItemId - 1] = Object.assign({}, state.allTodoItems[todoItemId - 1], {
        favorites: false
      })
    },

    defineAndSetCurrentUser (state, loginParams) {
      let currentUser = {}
      state.allUsers.forEach(function (item) {
        if (item.username === loginParams.username && item.phone === loginParams.userPhoneNumber) {
          currentUser = item
        }
      })
      state.currentUser = currentUser
    }
  },

  actions: {
    async getUsers (context) {
      await axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
        context.commit('setAllUsers', users.data)
        return users.data
      })
    },

    async getAllTodoItems (context) {
      await axios.get('https://jsonplaceholder.typicode.com/todos').then(todoItems => {
        context.commit('setAllTodoItems', todoItems.data)
        return todoItems.data
      })
    }
  }
})
