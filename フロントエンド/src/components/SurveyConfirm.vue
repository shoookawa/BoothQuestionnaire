<script setup>
import { defineProps, defineEmits } from 'vue';
import questions from '../questions'; // 質問データをインポート

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['goBack', 'submitSurvey']);

function goBack() {
  emit('goBack');
}

function submitSurvey() {
  emit('submitSurvey', props.formData);
}
</script>

<template>
  <div class="survey-confirm-container">
    <h1>アンケート内容の確認</h1>
    <p class="survey-note">以下の内容でよろしければ、送信ボタンを押してください。</p>
    
    <div class="survey-summary">
      <!-- props.formData を questions の順番に沿って表示する -->
      <div v-for="(question, index) in questions" :key="index" class="summary-item">
        <p class="summary-label">{{ question.label }}</p>
        <p class="summary-value">{{ props.formData[question.name]?.answer }}</p>
      </div>
    </div>
    
    <div class="buttons">
      <button class="back-button" @click="goBack">戻る</button>
      <button class="submit-button" @click="submitSurvey">送信する</button>
    </div>
  </div>
</template>

<style scoped>
.survey-confirm-container {
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
  color:black;
}

.survey-note {
  margin-bottom: 20px;
  color: #333;
  font-size: 1em;
  line-height: 1.5;
}

.survey-summary {
  margin-bottom: 20px;
}

.summary-item {
  margin-bottom: 10px;
}

.summary-label {
  font-weight: bold;
  color: #666;
}

.summary-value {
  color: #333;
  margin-bottom: 20px;
  word-wrap: break-word;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.back-button, .submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .survey-confirm-container {
    padding: 10px;
  }

  h1 {
    font-size: 1.5em;
  }

  .survey-note {
    font-size: 0.9em;
  }

  .summary-item {
    font-size: 0.9em;
  }

  .back-button, .submit-button {
    font-size: 1em;
    padding: 12px;
  }
}
</style>
