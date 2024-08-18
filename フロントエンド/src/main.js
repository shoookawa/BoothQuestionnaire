import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import SurveyForm from './components/SurveyForm.vue';
import SurveyConfirm from './components/SurveyConfirm.vue';
import SurveyComplete from './components/SurveyComplete.vue';

// ルーティングの設定
const routes = [
  { path: '/', component: SurveyForm },
  { path: '/confirm', component: SurveyConfirm },
  { path: '/complete', component: SurveyComplete },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// アプリケーションの作成とマウント
const app = createApp(App);
app.use(router);
app.mount('#app');
