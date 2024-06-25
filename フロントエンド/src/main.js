import { createApp } from 'vue'
import App from './App.vue'

import SurveyHeader from '@/components/SurbeyHeader.vue'
import SurveyForm from './components/SurveyForm.vue';
import SurveyConfirm from './components/SurveyConfirm.vue';
import SurveyComplete from './components/SurveyComplete.vue';

const app = createApp(App);
app.component('SurveyHeader', SurveyHeader);
app.component('SurveyForm', SurveyForm);
app.component('SurveyConfirm', SurveyConfirm);
app.component('SurveyComplete', SurveyComplete);

app.mount('#app');
