<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps(['question', 'index']);
const emit = defineEmits(['putAnswer']);

const answer = ref('')
watch(answer, (newAnswer) => {
  emit('putAnswer', {name: props.question.name, value: newAnswer})
})
</script>

<template>
  <label :for="`question-${index}`">{{ question.label }}</label>
  <div v-if="question.type === 'text'">
    <input :id="`question-${index}`" type="text" v-model="answer" :required="question.required"/>
  </div>
  <div v-if="question.type === 'email'">
    <input :id="`question-${index}`" type="email" v-model="answer" :required="question.required"/>
  </div>
  <div v-if="question.type === 'textarea'">
    <textarea :id="`question-${index}`" v-model="answer" :required="question.required"></textarea>
  </div>
  <div v-if="question.type === 'number'">
    <input :id="`question-${index}`" type="number" v-model="answer" :required="question.required" :min="question.min" :max="question.max"/>
  </div>
  <div v-if="question.type === 'list'">
    <select :id="`question-${index}`" v-model="answer" :required="question.required">
      <option v-for="(option, index) in question.options" :key="index">{{ option }}</option>
    </select>
  </div>
  <div v-if="question.type === 'radio'">
    <span v-for="(option, index) in question.options" :key="index">
      <input id="`question-${index}-${option}`" v-model="answer" type="radio" :value="option" :required="question.required">
      <label for="`question-${index}-${option}`">{{ option }}</label>
    </span>
  </div>
</template>

<style scoped>
input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
}

input[type="radio"] {
  width: auto;
}

label {
  margin-left: 8px;
}

@media (max-width: 600px) {
  input, textarea, select {
    font-size: 1em;
    padding: 8px;
  }
}
</style>