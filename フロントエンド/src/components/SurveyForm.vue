<script setup>
import { ref, defineEmits } from 'vue'
import SurveyFormQustion from "./SurveyFormQuestion.vue"

const emit = defineEmits(['goToConfirm']);

const questions = ref([
  { label: '出店形態', name: 'format', type: 'list', options:['模擬店', '屋外物販', '教室出店', '福島出店'], required: true },
  { label: '出店番号', name: 'number', type: 'number', required: true, min: 1, max: 100},
  { label: '満足度', name: 'satisfaction', type: 'radio', options:['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満'], required: true },
  { label: '実行委員会の対応の良さ', name: 'support', type: 'radio', options:['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満'], required: true },
  { label: '出店募集をどこで知ったか', name: 'publicity', type: 'radio', options:['HP', 'ポスター', 'SNS', 'その他'], required: true },
  { label: 'ゴミの分別方法について不満があれば記入お願いします', name: 'garbage', type: 'textarea', required: true },
  { label: '意見・感想', name: 'comment', type: 'textarea', required: true }
]);

const formData = ref({});

function  goToConfirm() {
  emit('goToConfirm', formData.value);
}

function handlePutAnswer({ name, value }) {
  const question = questions.value.find(q => q.name === name);
  formData.value[name] = {
    label: question.label,
    value: value
  };
}
</script>


<template>
  <div class="survey-container">
    <h1>アンケート入力</h1>
    <p class="survey-note">所要時間は5分、回答可能回数1回のみ</p>
    <form @submit.prevent="goToConfirm">
      <SurveyFormQustion v-for="(question, index) in questions" :key="index" :question="question" :index="index" @putAnswer="handlePutAnswer"/>
      <button type="submit" class="submit-button">確認画面へ</button>
    </form>
  </div>
</template>

<style scoped>
.survey-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.survey-note {
  margin-bottom: 20px;
  color: #333;
  font-size: 1em;
  line-height: 1.5;
}

form {
  display: flex;
  flex-direction: column;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* レスポンシブデザイン */
@media (max-width: 600px) {
  .survey-container {
    padding: 10px;
  }

  h1 {
    font-size: 1.5em;
  }

  .survey-note {
    font-size: 0.9em;
  }

  .submit-button {
    font-size: 1em;
    padding: 12px;
  }
}
</style>