<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['goToConfirm']);

const questions = ref([
  { label: '出店形態', name: 'format', type: 'list', options:['模擬店', '屋外物販', '教室出店', '福島出店'], required: true },
  { label: '出店番号', name: 'number', type: 'number', required: true, min: 1, max: 100},
  { label: '満足度', name: 'satisfaction', type: 'radio', options:['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満'], required: true },
  { label: '意見・感想', name: 'comment', type: 'textarea', required: true }
])
const formData = ref({
  format: '',
  number: '',
  satisfaction: '',
  comment: ''
})

function  goToConfirm() {
  emit('goToConfirm', formData.value);
}
</script>


<template>
  <div>
    <p>注意事項</p>
    <form @submit.prevent="goToConfirm">
      <div v-for="(question, index) in questions" :key="index">
        <label :for="`question-${index}`">{{ question.label }}</label>
        <div v-if="question.type === 'text'">
          <input
            :id="`question-${index}`"
            type="text"
            v-model="formData[question.name]"
            :required="question.required"
          />
        </div>
        <div v-if="question.type === 'email'">
          <input
            :id="`question-${index}`"
            type="email"
            v-model="formData[question.name]"
            :required="question.required"
          />
        </div>
        <div v-if="question.type === 'textarea'">
          <textarea
            :id="`question-${index}`"
            v-model="formData[question.name]"
            :required="question.required"
          ></textarea>
        </div>
        <div v-if="question.type === 'number'">
          <input
            :id="`question-${index}`"
            type="number"
            v-model="formData[question.name]"
            :required="question.required"
            :min="question.min"
            :max="question.max"
          />
        </div>
        <div v-if="question.type === 'list'">
          <select :id="`question-${index}`" v-model="formData[question.name]" :required="question.required">
            <option v-for="(option, index) in question.options" :key="index">{{ option }}</option>
          </select>
        </div>
        <div v-if="question.type === 'radio'">
          <span v-for="(option, index) in question.options" :key="index">
            <input id="`question-${index}`" v-model="formData[question.name]" type="radio" :value="option" :required="question.required">
            <label for="`question-${index}`">{{ option }}</label>
          </span>
        </div>
      </div>
      <button type="submit">確認画面へ</button>
    </form>
  </div>
</template>