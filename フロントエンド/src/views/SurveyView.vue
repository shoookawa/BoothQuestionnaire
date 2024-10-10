<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SurveyForm from '../components/SurveyForm.vue';
import SurveyConfirm from '../components/SurveyConfirm.vue';
import SurveyComplete from '../components/SurveyComplete.vue';
import SurveyDeadline from '../components/SurveyDeadline.vue';
import availableDate from '../deadline.js';

const surveyYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDate = new Date().getDate();
const currentStep = ref('form'); // 現在のステップを管理
const formData = ref({}); // フォームデータを管理

onMounted(() => {
  console.log("surveyView mounted");
  if(todayMonth < availableDate.startMonth || todayMonth > availableDate.endMonth || todayDate < availableDate.startDate || todayDate > availableDate.endDate){
    currentStep.value = 'deadline'
    return;
  }
  const submitted = localStorage.getItem('formSubmitted' + surveyYear);
  if (submitted === 'true') {
    // 既に送信済みなら、フォーム送信完了ページにリダイレクト
    currentStep.value = 'complete';
  }
});

function showConfirm(data) {
  formData.value = data; // データを保存
  currentStep.value = 'confirm'; // 確認画面に移行
  window.scrollTo({ top: 0 });
}

function showForm() {
  currentStep.value = 'form'; // 入力画面に戻る
}

function submitSurvey(data) {
  // pureData を作成し、各質問の answer だけを抽出
  const pureData = {};
  for (const key in data) {
    if (data[key] && data[key].answer !== undefined) {
      pureData[key] = data[key].answer; // answer だけを抽出
    }
  }
  pureData['year'] = surveyYear;

  axios.post('https://cloverfes.com/booth_questionnaire/submit.php', pureData, {
    headers: {
        'Content-Type': 'application/json' // ヘッダーを設定
    }
  })
    .then(response => {
      console.log('Survey data submitted:', response.data);
      // フォーム送信完了後、localStorageにフラグを保存
      localStorage.setItem('formSubmitted' + surveyYear, 'true');
      currentStep.value = 'complete'; // 送信完了画面に移行
    })
    .catch(error => {
      console.error('Error submitting survey data:', error);
      currentStep.value = 'confirm';
    });
}

</script>

<template>
  <div class="full-view">
    <h1>{{ surveyYear }}年度同志社クローバー祭</h1><h1>出店アンケート</h1>
    <div class="survey-view">
      <!-- アンケート入力画面 -->
      <SurveyForm 
        v-if="currentStep === 'form'"
        :formData="formData"
        @goToConfirm="showConfirm"
      />
      
      <!-- 確認画面 -->
      <SurveyConfirm
        v-if="currentStep === 'confirm'"
        :formData="formData"
        @goBack="showForm"
        @submitSurvey="submitSurvey"
      />
      
      <!-- 送信完了画面 -->
      <SurveyComplete
        v-if="currentStep === 'complete'"
      />

      <!-- 送信完了画面 -->
      <SurveyDeadline
        v-if="currentStep === 'deadline'"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  color:black;

}

.full-view{
  margin: 60px auto;
}

.survey-view {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.5em;
  }
}
</style>
