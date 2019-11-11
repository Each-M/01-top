import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '@/views/login/index.vue'
import home from '@/views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  // @是系统封装好的别名，代表src绝对路径的信息
  { path: '/login', name: 'login', component: Login },
  { path: '/home', name: 'home', component: home }
]

const router = new VueRouter({
  routes
})

export default router
