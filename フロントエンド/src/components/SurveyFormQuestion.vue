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
  },
  hasError:{
    type: Boolean,
    default: false
  }
});

// emit の定義
const emit = defineEmits(['putAnswer']);

// local state の定義
const localAnswer = ref(props.answer);

// 質問の回答を更新するメソッド
function updateAnswer(event) {
  localAnswer.value = event.target.value;
}

// watch で回答を監視
watch(localAnswer, (newAnswer) => {
  emit('putAnswer', { index: props.index, answer: newAnswer }); // indexを渡す
});
console.log(props.hasError);
</script>

<template>
  <div :class="(question.name === 'format' || question.name === 'number') ? 'no-margin' : ''">
    <!-- 名前やメールなど相手の情報のセクション -->
    <h2 v-if="question.name === 'format'">団体情報</h2>

    <!-- 質問セクションの見出し -->
    <h2 v-if="question.name === 'satisfaction'">同志社クローバー祭に関する質問</h2>
    
    <label :for="`question-${index}`">{{ question.label }}<span v-if="question.required" class="colorRed"> *</span></label>
    
    <!-- 質問タイプごとのフォーム要素 -->
    <div v-if="question.type === 'text'">
      <input
        :id="`question-${index}`"
        v-model="localAnswer"
        type="text"
        :class="{ 'error': hasError }"
        @input="updateAnswer"
      />
    </div>

    <div v-if="question.type === 'email'">
      <input
        :id="`question-${index}`"
        v-model="localAnswer"
        type="email"
        :class="{ 'error': hasError }"
        @input="updateAnswer"
      />
    </div>

    <div v-if="question.type === 'textarea'">
      <textarea
        :id="`question-${index}`"
        v-model="localAnswer"
        :class="{ 'error': props.hasError }"
        @input="updateAnswer"
      ></textarea>
    </div>

    <div v-if="question.type === 'number'">
      <input
        :id="`question-${index}`"
        v-model="localAnswer"
        type="number"
        :min="question.min"
        :max="question.max"
        :class="{ 'error': hasError }"
        @input="updateAnswer"
      />
    </div>

    <div v-if="question.type === 'list'">
      <select
        :id="`question-${index}`"
        v-model="localAnswer"
        @change="updateAnswer"
        :class="{ 'error': hasError }"
        class="type-list"
      >
        <option v-for="(option, i) in question.options" :key="i" :value="option">{{ option }}</option>
      </select>
    </div>

    <div v-if="question.type === 'radio'" class="radio-group" :class="{ 'error': hasError }">
      <div v-for="(option, i) in question.options" :key="i">
        <input
          :id="`question-${index}-${option}`"
          v-model="localAnswer"
          type="radio"
          :value="option"
          :name="`question-${index}`"
          @change="updateAnswer"
        />
        <label :for="`question-${index}-${option}`">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>

.no-margin {
  margin-bottom: 0; /* 余白をゼロに設定 */
}

.error {
  border: 1px solid red; /* エラー時のボーダーを赤に */
}

.radio-group.error {
  border: 1px solid red; /* ラジオボタングループのエラー時のボーダー */
  padding: 5px; /* パディングを追加してラベルを囲む */
}

.colorRed{
  color:red;
}

h2.format {
  margin-top: 30px;
  margin-bottom: 0; /* 団体情報のセクションには余白をなくす */
}

h2 {
  margin-bottom: 15px;
  font-size: 1.0em;
  color: #333;
  border-bottom: 2px solid #007bff; /* セクションを区切る線 */
  padding-bottom: 5px;
  text-align: left;
  text-indent: 1em; /* 一文字分の空白を追加 */
}

.radio-group label {
  margin-left: 5px; /* ラジオボタンとラベルの間にスペース */
  display: inline-block; /* インライン要素として扱う */
  text-align: left; /* 左寄せ */
}

textarea {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
}

input[type='number'],select {
  width: 40%; /* 幅を調整 */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  display: block; /* ブロック要素として表示 */
}

input[type="radio"] {
  width: auto;
  margin-right: 0px; /* ラジオボタンとラベルの間にスペースを追加 */
}

.type-list{
  width:40%;
}

.radio-group {
  display: flex; /* 横並びにする */
  flex-wrap: wrap; /* ラベルが長すぎる場合は折り返す */
  align-items: center; /* 中央揃え */
}

.radio-group label {
  margin-right: 20px; /* ラジオボタンの選択肢間にスペースを追加 */
}

label {
  margin-left: 0;
  text-align: left;
  display: block;
  margin-bottom: 5px;
}

@media (max-width: 600px) {
  input, textarea, select {
    font-size: 1em;
    padding: 8px;
  }
}
</style>
