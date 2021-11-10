import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import FourOhFour from '../views/FourOhFour'
import LoginForm from '../views/LoginForm.vue'
import User from '@/views/users/User'
import UserCreate from '@/views/users/UserCreate'
import UserTable from '@/views/users/UserTable'
import UserDetails from '@/views/users/UserDetails'
import UserEdit from '@/views/users/UserEdit'
import DefaultLayout from '@/layouts/default/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: {name: 'Dashboard'}
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Home,
      },
      {
        path: 'users',
        component: User,
        children: [
          {
            path: '',
            name: "User Table",
            component: UserTable
          },
          {
            path: 'create',
            name: 'Create User',
            component: UserCreate
          },
          {
            path: 'details/:id',
            name: 'User Details',
            props: true,
            component: UserDetails
          },
          {
            path: 'edit/:id',
            name: 'User Edit',
            props: true,
            component: UserEdit
          },

        ]
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '*',
    component: FourOhFour
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.state.userAccountModule.isLoggedIn) {
      next();
    } else {
      next({name: "Login", query: { redirect: to.fullPath }});
    }
  } else {
    next();
  }
})


export default router
