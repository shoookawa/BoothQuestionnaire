<script setup>
import { ref } from 'vue';
import SurveyForm from '../components/SurveyForm.vue';
import SurveyConfirm from '../components/SurveyConfirm.vue';
import SurveyComplete from '../components/SurveyComplete.vue';

const currentStep = ref('form'); // 現在のステップを管理
const formData = ref({}); // フォームデータを管理

function showConfirm(data) {
  formData.value = data; // データを保存
  currentStep.value = 'confirm'; // 確認画面に移行
}

function showForm() {
  currentStep.value = 'form'; // 入力画面に戻る
}

function submitSurvey(data) {
  // Axiosでデータをサーバーに送信する処理を追加
  // axios.post('/api/submit', data).then(() => {
  //   currentStep.value = 'complete';
  // });
  currentStep.value = 'complete'; // 送信完了画面に移行
}

</script>

<template>
  <h1>2024クローバー祭 出店アンケート</h1>
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
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.survey-view {
  max-width: 600px;
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
