<script setup>
import { ref, onMounted,computed, defineProps, watch} from 'vue';
import questions from '@/questions';
import axios from 'axios';
import DoughnutChart from '@/components/DoughnutChart.vue';

const props = defineProps(['year']);
const results = ref([]); // 結果を保存する配列
const groupedResults = ref([]); // 質問ごとにグループ化された結果
const pieQuestions = ['satisfaction', 'support', 'advertisement','amount', 'nextyear'];  //割合を表示する質問のname
const errorMessage = ref('');

onMounted(async () => {
  await fetchResults();
});

watch(() => props.year, (newYear, oldYear) => {
  if (newYear !== oldYear) {
    groupResultsByQuestion(); // データを再度グループ化
  }
});

async function fetchResults() {
  try {
    const response = await axios.get('https://cloverfes.com/booth_questionnaire/results.php');
    if (Array.isArray(response.data)) {
      results.value = response.data.map(({ _id, __v, ...rest }) => rest); // _id と __v を除外
      groupResultsByQuestion();
    } else {
      console.error('Unexpected data format:', response.data);
      results.value = []; // フォールバック
    }
    errorMessage.value = ''; // エラーメッセージをリセット
  } catch (error) {
    console.error('Error fetching results:', error);
    errorMessage.value = '結果の取得に失敗しました。'; // エラーメッセージを設定
  }
}
const filteredResults = computed(() => {
  return results.value.filter(result => result.year.toString() === props.year.toString());
});

function groupResultsByQuestion() {
  const resultsArray = filteredResults.value; // ここでfilteredResultsを使用
  const questionKeys = questions.map(q => q.name);

  const grouped = resultsArray.reduce((acc, result) => {
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
    if (pieQuestions.includes(question.name)) {
      groupedResults.value[question.name] = {
        ...groupedResults.value[question.name],
        percentages: calculatePercentage(question.name) // 割合を計算
      }
    }
  });
}

function calculatePercentage(questionId) {
  const total = groupedResults.value[questionId]?.length;
  const counts = {};
  const percentages = {};
  const options = questions.find(q => q.name === questionId).options;

  // 各選択肢のカウントを行う
  groupedResults.value[questionId]?.forEach(answer => {
    counts[answer] = (counts[answer] || 0) + 1; // 回答をカウント
  });

  // 各選択肢に対する割合を計算
  options.forEach(option => {
    const count = counts[option] || 0; // 選択肢のカウント
    percentages[option] = total > 0 ? ((count / total) * 100).toFixed(2) : 0; // 割合を計算
  });

  return percentages;
}



// 質問の変数名に対応する質問文を取得する関数
function getQuestionText(name) {
  const question = questions.find(q => q.name === name);
  return question ? question.label : name; // 見つからない場合は変数名をそのまま表示
}

// 出店形態別の集計
const formatCounts = computed(() => {
  const counts = {};
  filteredResults.value.forEach(result => {
    if (counts[result.format]) {
      counts[result.format]++;
    } else {
      counts[result.format] = 1;
    }
  });
  return counts;
});

// 合計数を計算するプロパティを追加
const totalFormatCounts = computed(() => {
  return Object.values(formatCounts.value).reduce((acc, count) => acc + count, 0);
});

// 出店形態別の出店数の集計
const detailedFormatCounts = computed(() => {
  const counts = {};
  filteredResults.value.forEach(result => {
    if (counts[result.format]) {
      counts[result.format]++;
    } else {
      counts[result.format] = 1;
    }
  });
  return counts;
});

</script>

<template>
  <div class="results-by-question-container">
    <h1>質問ごとのアンケート結果</h1>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <!-- 詳細な出店形態別の出店数表示 -->
        <div class="detailed-format-counts">
      <h2>出店形態別の回答数</h2>
      <ul>
        <li v-for="(count, format) in detailedFormatCounts" :key="format">
          {{ format }}: {{ count }}件
        </li>
      </ul>
      <h3>合計: {{ totalFormatCounts }}件</h3> <!-- 合計を表示 -->
    </div>

    <div v-for="(answers, questionName) in groupedResults" :key="questionName" class="question-group">
      <div v-if="questionName!=='format'">
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
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

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
