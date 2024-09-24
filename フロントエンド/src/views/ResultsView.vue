
<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import ResultsPage from '@/components/ResultsPage.vue';
import ResultsQuestion from '@/components/ResultsQuestion.vue';
import ResultsRatio from '@/components/ResultsRatio.vue';

const router = useRouter();
const currentPage = ref('page'); // 現在のページを管理
const selectedYear = ref(new Date().getFullYear()); // 現在の年度をデフォルトに設定
const maxYear = ref(new Date().getFullYear());


onBeforeMount(() => {
  const authenticated = localStorage.getItem('authenticated');
  if (authenticated !== 'true') {
    router.push('/auth'); // 認証されていない場合は認証画面にリダイレクト
  }
});

function handleLogout() {
  localStorage.removeItem('authenticated'); // localStorage を使用
  router.push('/auth');
}

function handlePage() {
  currentPage.value = 'page'
}

function handleQuestion() {
  currentPage.value = 'question'
}

function handleResultsRatio(){
  currentPage.value='ratio';
}

</script>

<template>
  <div class="results-container">
    <button @click="handleLogout">ログアウト</button>
    <button @click="handlePage">質問ごと</button>
    <button @click="handleQuestion">団体ごと</button>
    <button @click="handleResultsRatio">割合表示ページへ</button>
    <br><label for="year-select">年度を選択:</label>
    <input
      type="number"
      id="year-select"
      v-model="selectedYear"
      @change="handleYearChange"
      min="2024"
      :max="maxYear"
    />
    <ResultsPage v-if="currentPage === 'page'" :year="selectedYear" />
    <ResultsQuestion v-if="currentPage === 'question'" :year="selectedYear" />
    <ResultsRatio v-if="currentPage === 'ratio'" :year="selectedYear" />
  </div>
</template>

<style scoped>
.results-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
