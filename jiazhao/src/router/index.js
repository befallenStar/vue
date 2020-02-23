import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/jiazhao',
    name: 'JiaZhao',
    component: () => import(/* webpackChunkName: "JiaZhao" */ '../views/JiaZhao.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
