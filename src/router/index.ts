import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '@/views/Import.vue';
import AnchorPonit from '@/views/AnchorPonit.vue';
import BigData from '@/views/BigData.vue';
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
    path: '/import',
    name: 'Import',
    component: HomeView,
  },
  {
    path: '/anchor',
    name: 'Anchor',
    component: AnchorPonit,
  },
  {
    path: '/exportcsv',
    name: 'exportcsv',
    component: BigData,
    meta: {
      keepAlive: true, // 需要被缓存
    },
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
