<script setup>
import { ref, onMounted, defineProps, watch} from 'vue';
import questions from '@/questions';
import axios from 'axios';
import DoughnutChart from '@/components/DoughnutChart.vue';

const props = defineProps(['year']);
const results = ref([]); // 結果を保存する配列
const groupedResults = ref([]); // 質問ごとにグループ化された結果
const pieQuestions = ['satisfaction', 'support', 'advertisement', 'nextyear'];  //割合を表示する質問のname

onMounted(() => {
  fetchResults();
});

watch(() => props.year, (newYear, oldYear) => {
  if (newYear !== oldYear) {
    groupResultsByQuestion(); // データを再度グループ化
  }
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
  const filteredResults = results.value.filter(result => result.year === props.year);

  const questionKeys = questions.map(q => q.name);

  const grouped = filteredResults.reduce((acc, result) => {
    questionKeys.forEach(key => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(result[key] || '未回答');
    });
    return acc;
  }, {});

  groupedResults.value = grouped;

  questions.forEach(question => {
    if(pieQuestions.includes(question.name)){
      groupedResults.value[question.name] = {
        ...groupedResults.value[question.name],
        percentages: calculatePercentage(question.name) // 各質問の割合を計算して保存
      }
    }
  });

}

// 質問の変数名に対応する質問文を取得する関数
function getQuestionText(name) {
  const question = questions.find(q => q.name === name);
  return question ? question.label : name; // 見つからない場合は変数名をそのまま表示
}

// 各質問に対する回答の割合を計算する関数
function calculatePercentage(questionId) {
  const total = groupedResults.value[questionId]?.length;
  const counts = {};
  const percentages = {};
  const options = questions.find(q => q.name === questionId).options;
  
  // 各選択肢のカウントを行う
  groupedResults.value[questionId]?.forEach(result => {
    const answer = result;
    if (answer) {
        counts[answer] = (counts[answer] || 0) + 1; // 回答をカウント
      }
    });
  
    // 各選択肢に対する割合を計算
    options.forEach(option => {
      const count = counts[option] || 0; // 選択肢のカウント
      percentages[option] = total > 0 ? ((count / total) * 100).toFixed(2) : 0; // 割合を計算
    });
  
    return percentages;
  }

  console.log(groupedResults);

</script>

<template>
  <div class="results-by-question-container">
    <h1>質問ごとのアンケート結果</h1>
    <div v-for="(answers, questionName) in groupedResults" :key="questionName" class="question-group">
      <h2>{{ getQuestionText(questionName) }}</h2> <!-- 質問文を表示 -->
      <ul v-if="!pieQuestions.includes(questionName)">
        <li v-for="(answer, index) in answers" :key="index">
          {{ answer }}
        </li>
      </ul>
      <div v-if="pieQuestions.includes(questionName)">
        <div style="margin-bottom: 80px;">
          <DoughnutChart 
            :data="{
              labels: Object.keys(groupedResults[questionName].percentages),
              data: Object.values(groupedResults[questionName].percentages)
            }" 
            :title="getQuestionText(questionName)" 
          />
        </div>
      </div>
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
