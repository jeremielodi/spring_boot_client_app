import { createRouter, createWebHashHistory } from 'vue-router';
// import Dashboard from './components/Dashboard.vue';

const routes = [
  {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import('./modules/user/signIn.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('./AppHome.vue'),
    children: [
      {
        path: '/home',
        name: 'landing',
        component: () => import('./modules/landingPage.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./modules/Dashboard.vue'),
      },
      {
        path: '/activities',
        name: 'activities',
        component: () => import('./modules/account/activities.vue'),
      },
      
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./modules/NotFound.vue'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
