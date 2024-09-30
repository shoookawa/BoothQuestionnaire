// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import SurveyView from '../views/SurveyView.vue';
import ResultsView from '../views/ResultsView.vue';
import PasswordAuthView from '../views/PasswordAuth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SurveyView
  },
  {
    path: '/admin-results',
    name: 'ResultsView',
    component: ResultsView,
    meta: { requiresAuth: true } // 認証が必要
  },
  {
    path: '/auth',
    name: 'PasswordAuthView',
    component: PasswordAuthView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 認証ガード
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth'); // 認証ページへリダイレクト
  } else {
    next();
  }
});


export default router;
