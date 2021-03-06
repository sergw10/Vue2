import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '@/views/LoginPage.vue'
import UsersList from '@/views/UsersList.vue'
import SingleUser from '@/views/SingleUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/users',
    name: 'UsersListPage',
    component: UsersList
  },
  {
    path: '/users/:id',
    name: 'SingleUserPage',
    component: SingleUser
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
