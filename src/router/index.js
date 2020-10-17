import Vue from 'vue'
import VueRouter from 'vue-router'
import Counting from "../components/Counting"
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "counting",
    component: Counting,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
