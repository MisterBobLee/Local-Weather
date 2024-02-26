import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '主頁'
      }
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: CityView,
      meta: {
        title: '天氣'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}  | 當地天氣`
  next()
})

export default router
