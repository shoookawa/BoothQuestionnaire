<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import ResultsPage from '@/components/ResultsPage.vue';
import ResultsQuestion from '@/components/ResultsQuestion.vue';

const router = useRouter();
const currentPage = ref('page'); // 現在のページを管理

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
  currentPage.value = 'question'
}

function handleQuestion() {
  currentPage.value = 'page'
}

</script>

<template>
  <div class="results-container">
    <button @click="handleLogout">ログアウト</button>
    <button v-if="currentPage === 'page'" @click="handlePage">質問ごと</button>
    <button v-if="currentPage === 'question'" @click="handleQuestion">団体ごと</button>
    <ResultsPage v-if="currentPage === 'page'" />
    <ResultsQuestion v-if="currentPage === 'question'" />
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
