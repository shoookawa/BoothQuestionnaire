<script setup>
import { ref, onMounted } from 'vue';
import questions from '@/questions';
import axios from 'axios';

const results = ref([]); // 結果を保存する配列
const groupedResults = ref([]); // 質問ごとにグループ化された結果

onMounted(() => {
  fetchResults();
});

async function fetchResults() {
  try {
    const response = await axios.get('http://localhost:3000/api/results');
    results.value = response.data.map(({ _id, __v, ...rest }) => rest); // _id と __v を除外
    groupResultsByQuestion();
  } catch (error) {
    console.error('Error fetching results:', error);
  }
}

function groupResultsByQuestion() {
  // 質問ごとに結果をグループ化する処理を実装
  const grouped = results.value.reduce((acc, result) => {
    Object.keys(result).forEach(key => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(result[key]);
    });
    return acc;
  }, {});
  
  groupedResults.value = grouped;
}

// 質問の変数名に対応する質問文を取得する関数
function getQuestionText(name) {
  const question = questions.find(q => q.name === name);
  return question ? question.label : name; // 見つからない場合は変数名をそのまま表示
}

</script>

<template>
  <div class="results-by-question-container">
    <h1>質問ごとのアンケート結果</h1>
    <div v-for="(answers, questionName) in groupedResults" :key="questionName" class="question-group">
      <h2>{{ getQuestionText(questionName) }}</h2> <!-- 質問文を表示 -->
      <ul>
        <li v-for="(answer, index) in answers" :key="index">
          {{ answer }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.results-by-question-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.question-group {
  margin-bottom: 30px;
}

.question-group h2 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-height: 500px; /* 任意の高さを設定 */
  overflow-y: auto;  /* 縦のスクロールバーを表示 */
}
</style>
