<script setup>
import { ref, onMounted, computed, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps(['year']);
const results = ref([]); // 結果を保存する配列
const currentPage = ref(1);
const resultsPerPage = 12;
const errorMessage = ref('');

// コンポーネントがマウントされたときに結果を取得
onMounted(async () => {
  await fetchResults();
});

async function fetchResults() {
  try {
    const response = await axios.get('https://cloverfes.com/booth_questionnaire/results.php');
    if (Array.isArray(response.data)) {
      results.value = response.data;
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
  const resultsArray = results.value.filter(result => {
    return result.year.toString() === props.year.toString();
  });
  return resultsArray;
});

const totalPages = computed(() => Math.ceil(filteredResults.value.length / resultsPerPage));

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return filteredResults.value.slice(start, end);
});

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  window.scrollTo({ top: 0 });
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  window.scrollTo({ top: 0 });
}
</script>

<template>
  <div class="page-container">
    <h2>団体ごと</h2>  
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="filteredResults.length" class="results-grid">
      <div v-for="(result, index) in paginatedResults" :key="index" class="result-card">
        <h2>アンケート {{ (currentPage - 1) * resultsPerPage + index + 1 }}</h2>
        <p><strong>出店形態:</strong> {{ result.format }}</p>
        <p><strong>満足度:</strong> {{ result.satisfaction }}</p>
        <p><strong>満足度の理由:</strong> {{ result.reason_satisfaction }}</p>
        <p><strong>実行委員会の対応:</strong> {{ result.support }}</p>
        <p><strong>対応の理由:</strong> {{ result.reason_support }}</p>
        <p><strong>知った経緯:</strong> {{ result.advertisement }}</p>
        <p><strong>その他:</strong> {{ result.other_advertisement }}</p>
        <p><strong>きっかけ:</strong> {{ result.opportunity }}</p>
        <p><strong>不満:</strong> {{ result.dissatisfaction }}</p>
        <p><strong>ゴミの分別:</strong> {{ result.garbage }}</p>
        <p><strong>売上金額:</strong> {{ result.amount }}</p>
        <p><strong>来年:</strong> {{ result.nextyear }}</p>
        <p><strong>来年理由:</strong> {{ result.reason_nextyear }}</p>
        <p><strong>意見・感想:</strong> {{ result.comment }}</p>
      </div>
    </div>

    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">前のページ</button>
      <button @click="nextPage" :disabled="currentPage >= totalPages">次のページ</button>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

/* メニューバーのスタイル */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 30%; /* 全幅に変更 */
  background-color: rgba(255, 255, 255, 0.5); /* 半透明 */
  color: rgb(255, 255, 255);
  padding: 10px;
  z-index: 1000;
  display: flex;
  justify-content: start;
}

.navbar button {
  background-color: rgba(76, 175, 80, 0.8);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.navbar button:hover {
  background-color: rgba(69, 160, 73, 0.8);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr); /* 1200px以下の時に2列表示 */
  }
}

@media (max-width: 800px) {
  .results-grid {
    grid-template-columns: repeat(1, 1fr); /* 800px以下の時に1列表示 */
  }
}

.result-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-height: 700px; /* 任意の高さを設定 */
  overflow-y: auto;  /* 縦のスクロールバーを表示 */
  flex: 1 1 100%;
}

.button-wrapper {
  position: fixed; /* スクロールに固定 */
  top: 90px; /* 上からの距離 */
  left: 10px; /* 左からの距離 */
}

.fixed-button {
  padding: 10px 36px;
  font-size: 16px;
  cursor: pointer;
}

.detailed-buttons {
  display: flex;
  flex-direction: column; /* 縦に並べる */
  margin-top: -5px; /* すべてのボタンの上に空白を開ける */
}

.detailed-button {
  margin-top: 0px; /* 各ボタンの間に空白を開ける */
}


h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;
}

button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.pagination-controls {
  text-align: center;
  margin-top: 20px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
