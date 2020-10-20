import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import SearchSubreddits from '../views/SearchSubreddits.vue'
import Post from '../views/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/search-subreddits',
    name: 'SearchSubreddits',
    component: SearchSubreddits,
  },
  {
    path: '/post/:sub_name/:id',
    name: 'Post',
    component: Post,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
