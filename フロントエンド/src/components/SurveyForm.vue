<script setup>
import { ref, defineEmits } from 'vue'
import SurveyFormQustion from "./SurveyFormQuestion.vue"

const emit = defineEmits(['goToConfirm']);

const questions = ref([
  { label: '出店形態', name: 'format', type: 'list', options:['模擬店', '屋外物販', '教室出店', '福島出店'], required: true },
  { label: '出店番号', name: 'number', type: 'number', required: true, min: 1, max: 100},
  { label: '満足度', name: 'satisfaction', type: 'radio', options:['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満'], required: true },
  { label: '意見・感想', name: 'comment', type: 'textarea', required: true }
])
const formData = ref()

function  goToConfirm() {
  emit('goToConfirm', formData.value);
}

function hadlePutAnswer(name, data){
  formData.value[name] = data;
}
</script>


<template>
  <div>
    <p>注意事項</p>
    <form @submit.prevent="goToConfirm">
      <SurveyFormQustion v-for="(question, index) in questions" :key="index":question="question" :index="index" @putAnswer="hadlePutAnswer"/>
      <button type="submit">確認画面へ</button>
    </form>
  </div>
</template>