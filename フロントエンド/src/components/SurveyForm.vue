<script setup>
import { ref, defineEmits, watch, defineProps } from 'vue'
import SurveyFormQuestion from './SurveyFormQuestion.vue';
import questions from '../questions.js';
import availableDate from '../deadline';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['goToConfirm']);

const formData = ref({ ...props.formData }); // 親から受け取ったデータで初期化
const errorMessages = ref({}); // エラーメッセージを管理するためのオブジェクト

watch(() => props.formData, (newData) => {
  formData.value = { ...newData }; // 親からの変更を監視して更新
}, { deep: true });

function validateForm() {
  let isValid = true;
  errorMessages.value = {}; // エラーメッセージをリセット

  questions.forEach((question, index) => {
    const answer = formData.value[question.name]?.answer;

    if (question.required && !answer) {
      isValid = false;
      errorMessages.value[`question-${index}`] = 'この項目は回答必須です。'; // インデックスを追加
    } else if (question.type === 'textarea' && answer?.length > 2000) {
      isValid = false;
      errorMessages.value[`question-${index}`] = '2000文字以下で入力してください。'; // インデックスを追加
    }

    // Q5の条件チェック
    if (question.name === 'advertisement' && answer === 'その他') {
      const q6 = questions.find(q => q.name === 'other_advertisement');
      if (!formData.value[q6.name]?.answer) {
        isValid = false;
        errorMessages.value[`question-${index + 1}`] = 'Q5で「その他」を選んだ場合、回答必須です。'; // インデックスを追加
      }
    }
  });

  return isValid;
}

function goToConfirm() {
  if (validateForm()) {
    emit('goToConfirm', { ...formData.value });
  } else {
    const firstErrorQuestion = Object.keys(errorMessages.value).find(name => errorMessages.value[name]);

    if (firstErrorQuestion) {
      const questionContainers = document.querySelectorAll('.question-container');
      const indexMatch = firstErrorQuestion.match(/question-(\d+)/); // 正規表現でインデックスを取得
      
      if (indexMatch) {
        const index = indexMatch[1]; // インデックスを取得
        const container = questionContainers[index];
        if (container) {
          const labelElement = container.querySelector(`label[for="${firstErrorQuestion}"]`); // for属性にインデックスを追加          
          if (labelElement) {
            labelElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }
  }
}

function handlePutAnswer({ index, answer }) {
  const question = questions[index]; // indexを使って質問を取得
  if (question) {
    formData.value[question.name] = {
      label: question.label,
      answer: String(answer) // 数値を文字列に変換
    };
    errorMessages.value[`question-${index}`] = ''; // バリデーションをクリアしたらエラーメッセージを消す
  }
}

</script>

<template>
  <div class="survey-container">
    <h1>アンケート調査</h1>
    <p class="survey-note">同志社クローバー祭に出店していただき、誠にありがとうございました。<br>
      さらなるサービスの向上のため、出店団体様にアンケートのご協力をお願いしております。<br>
      所要時間は<span class="colorRed">約10分</span>、回答可能回数<span class="colorRed">1回</span>のみ、
      回答可能期間は<span class="colorRed">{{availableDate.endMonth}}月{{availableDate.endDate}}日</span>まで<br>
      <span class="colorRed">*</span> は回答必須です。
    </p>
      <hr>
      <form @submit.prevent="goToConfirm">
        <div v-for="(question, index) in questions" :key="index" class="question-container">
          <SurveyFormQuestion 
            :question="question" 
            :index="index" 
            :answer="formData[question.name]?.answer || ''"
            :hasError="!!errorMessages[`question-${index}`]"
            @putAnswer="handlePutAnswer"
          />
          <p v-if="errorMessages[`question-${index}`]" class="error-message">{{ errorMessages[`question-${index}`] }}</p>

        </div>
        <button type="submit" class="submit-button">確認画面へ</button>
      </form>
  </div>
</template>

<style scoped>
.question-container {
  margin-bottom: 30px; /* 各質問の間にデフォルトの余白を追加 */
}
.survey-container {
  max-width: 700px;
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

.colorRed{
  color:red;
}

hr{
  border:none;
    border-top-style:dashed; /*線の種類*/
    border-top-width:1px;  
    border-top-color:black;
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

.error-message {
  color: red;
  font-size: 0.9em;
  margin-bottom: 10px;
  text-align: left;
  display: block;
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
