import AuthGuard from '@/router/auth-guard'
import VisitorGuard from '@/router/visitor-guard'

const paths = [
  {
    path: '/login',
    component: () => import('../views/authentication/login.vue'),
    name: 'Login',
    beforeEnter: VisitorGuard,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/register',
    component: () => import('../views/authentication/register.vue'),
    name: 'Register',
    beforeEnter: VisitorGuard,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/products',
    component: () => import('../views/dashboard/products.vue'),
    name: 'dashboardIndex',
    beforeEnter: AuthGuard,
    meta: {
      layout: 'dashboard',
      name: 'Overview',
    },
  },

  {
    path: '/product/:id',
    component: () => import('../views/dashboard/product.vue'),
    name: 'dashboardProduct',
    beforeEnter: AuthGuard,
    meta: {
      layout: 'dashboard',
      name: 'Overview',
    },
  },
  {
    path: '/cart',
    component: () => import('../views/dashboard/cart.vue'),
    name: 'dashboardCart',
    beforeEnter: AuthGuard,
    meta: {
      layout: 'dashboard',
      name: 'Cart',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: {
      layout: 'empty',
    },
  },
]

export default paths
