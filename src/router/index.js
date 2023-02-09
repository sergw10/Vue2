import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import UserTodoList from '../views/UserTodoList'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/user/:id',
    name: 'UserTodoListPage',
    component: UserTodoList,
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
