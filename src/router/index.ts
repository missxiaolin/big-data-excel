import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import VideoDemo from '../views/VideoDemo.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/export',
  },
  {
    path: '/video',
    name: 'video',
    component: VideoDemo,
  },
  {
    path: '/export',
    name: 'Export',
    component: () => import('@/views/Export.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
