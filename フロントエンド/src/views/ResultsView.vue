<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

onBeforeMount(() => {
  const authenticated = localStorage.getItem('authenticated');
  if (authenticated !== 'true') {
    router.push('/auth'); // 認証されていない場合は認証画面にリダイレクト
  }
});

const results = ref([]); // 結果を保存する配列
const currentPage = ref(1);
const resultsPerPage = 5;

// コンポーネントがマウントされたときに結果を取得
onMounted(() => {
  fetchResults();
});

async function fetchResults() {
  try {
    const response = await axios.get('http://localhost:3000/api/results');
    results.value = response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
  }
}

const totalPages = computed(() => Math.ceil(results.value.length / resultsPerPage));

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return results.value.slice(start, end);
});

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function handleLogout() {
  localStorage.removeItem('authenticated'); // localStorage を使用
  router.push('/auth');
}

</script>

<template>
  <div class="results-container">
    <button @click="handleLogout">ログアウト</button>
    <h1>アンケート結果</h1>
    <div v-if="results.length" class="results-grid">
      <div v-for="(result, index) in paginatedResults" :key="index" class="result-card">
        <h2>アンケート {{ (currentPage - 1) * resultsPerPage + index + 1 }}</h2>
        <p><strong>出店形態:</strong> {{ result.format }}</p>
        <p><strong>出店番号:</strong> {{ result.number }}</p>
        <p><strong>満足度:</strong> {{ result.satisfaction }}</p>
        <p><strong>実行委員会の対応:</strong> {{ result.support }}</p>
        <p><strong>知った経緯:</strong> {{ result.publicity }}</p>
        <p><strong>不満:</strong> {{ result.unsatisfied }}</p>
        <p><strong>ゴミの分別:</strong> {{ result.garbage }}</p>
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
.results-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.result-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
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
