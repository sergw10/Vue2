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
    component: LoginPage,
    props: true
  },
  {
    path: '/users',
    name: 'UsersListPage',
    component: UsersList,
    props: true
  },
  {
    path: '/users/:id',
    name: 'SingleUserPage',
    component: SingleUser,
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
