<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

// props の定義
const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  answer: {
    type: String,
    default: '' // デフォルト値を設定
  }
});

// emit の定義
const emit = defineEmits(['putAnswer']);

// local state の定義
const localAnswer = ref(props.answer.value);

// 質問の回答を更新するメソッド
function updateAnswer(event) {
  localAnswer.value = event.target.value;
}

// watch で回答を監視
watch(localAnswer, (newAnswer) => {
  emit('putAnswer', { name: props.question.name, value: newAnswer });
});

console.log(localAnswer.value);
</script>

<template>
  <div>
    <label :for="`question-${index}`">{{ question.label }}</label>
    
    <!-- 質問タイプごとのフォーム要素 -->
    <div v-if="question.type === 'text'">
      <input
        :id="`question-${index}`"
        v-model="localAnswer"
        type="text"
        :required="question.required"
        @input="updateAnswer"
      />
    </div>

    <div v-if="question.type === 'email'">
      <input
        :id="`question-${index}`"
        v-model="localAnswer"
        type="email"
        :required="question.required"
        @input="updateAnswer"
      />
    </div>

    <div v-if="question.type === 'textarea'">
      <textarea
        :id="`question-${index}`"
        v-model="localAnswer"
        :required="question.required"
        @input="updateAnswer"
      ></textarea>
    </div>

    <div v-if="question.type === 'number'">
      <input
        :id="`question-${index}`"
        v-model="localAnswer"
        type="number"
        :required="question.required"
        :min="question.min"
        :max="question.max"
        @input="updateAnswer"
      />
    </div>

    <div v-if="question.type === 'list'">
      <select
        :id="`question-${index}`"
        v-model="localAnswer"
        :required="question.required"
        @change="updateAnswer"
      >
        <option v-for="(option, i) in question.options" :key="i" :value="option">{{ option }}</option>
      </select>
    </div>

    <div v-if="question.type === 'radio'" class="radio-group">
      <div v-for="(option, i) in question.options" :key="i">
        <input
          :id="`question-${index}-${option}`"
          v-model="localAnswer"
          type="radio"
          :value="option"
          :name="`question-${index}`"
          :required="question.required"
          @change="updateAnswer"
        />
        <label :for="`question-${index}-${option}`">{{ option }}</label>
      </div>
    </div>
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
  margin-right: 5px; /* ラジオボタンとラベルの間にスペースを追加 */
}

.radio-group {
  display: flex; /* 横並びにする */
  flex-wrap: wrap; /* ラベルが長すぎる場合は折り返す */
  align-items: center; /* 中央揃え */
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
