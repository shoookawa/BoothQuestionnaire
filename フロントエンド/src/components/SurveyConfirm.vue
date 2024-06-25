<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['formData']);
const emit = defineEmits(['goBack', 'submitForm']);

const questions = [
  { label: '出店形態', name: 'format' },
  { label: '出店番号', name: 'number' },
  { label: '満足度', name: 'satisfaction' },
  { label: '意見・感想', name: 'comment' }
];

function goBack() {
  emit('goBack');
}

function submitForm() {
  emit('submitForm', props.formData);
}
</script>

<template>
  <h1>アンケート確認</h1>
  <div v-for="(question, index) in questions" :key="index">
    <p>{{ question.label }}: {{ formData[question.name] }}</p>
  </div>
  <button @click="goBack">戻る</button>
  <button @click="submitForm">送信</button>
</template>