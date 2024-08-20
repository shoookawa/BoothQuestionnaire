<script setup>
import { ref, defineEmits, watch, defineProps } from 'vue'
import SurveyFormQuestion from './SurveyFormQuestion.vue';
import questions from '../questions.js';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['goToConfirm']);

const formData = ref({ ...props.formData }); // 親から受け取ったデータで初期化

watch(() => props.formData, (newData) => {
  formData.value = { ...newData }; // 親からの変更を監視して更新
}, { deep: true });

function goToConfirm() {
  emit('goToConfirm', formData.value);
}

function handlePutAnswer({ name, value }) {
  const question = questions.find(q => q.name === name);
  if (question) {
    formData.value[name] = {
      label: question.label,
      value: value
    };
  }
}

</script>

<template>
  <div class="survey-container">
    <h1>アンケート入力</h1>
    <p class="survey-note">所要時間は5分、回答可能回数1回のみ</p>
    <form @submit.prevent="goToConfirm">
      <SurveyFormQuestion 
        v-for="(question, index) in questions" 
        :key="index" 
        :question="question" 
        :index="index" 
        :answer="formData[question.name]" 
        @putAnswer="handlePutAnswer"
      />
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
