<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import ResultsPage from '@/components/ResultsPage.vue';
import ResultsQuestion from '@/components/ResultsQuestion.vue';

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
  currentPage.value = 'question'
}

function handleQuestion() {
  currentPage.value = 'page'
}

function checkSessionValidity() {
  const expiryTime = localStorage.getItem('expiryTime');
  const now = new Date().getTime();
  
  if (!expiryTime || now > expiryTime) {
    console.log('Session expired');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('expiryTime');
    router.push('/auth');
  } else {
    console.log('Session is still valid');
  }
}

// ページ読み込み時にセッションが有効か確認
checkSessionValidity();

</script>

<template>
  <div class="results-container">
    <h1>アンケート結果</h1>
    <div class="menu">
      <button class="logout-button" @click="handleLogout">ログアウト</button>
      <button class="fixed-button" v-if="currentPage === 'page'" @click="handlePage">質問ごと</button> <!-- 質問ごとのボタン -->
      <button class="fixed-button" v-if="currentPage === 'question'" @click="handleQuestion">団体ごと</button>
      <label class="year-label" for="year-select">年度を選択:</label>
      <input
      type="number"
      id="year-select"
      v-model="selectedYear"
      @change="handleYearChange"
      min="2024"
      :max="maxYear"
      onkeydown="return false;"
      />
    </div>
    <div class="results-view">

      <ResultsPage v-if="currentPage === 'page'" :year="selectedYear" />
      <ResultsQuestion v-if="currentPage === 'question'" :year="selectedYear" />
    </div>
  </div>
</template>

<style scoped>
.results-view {
  max-width: 100%;
  margin: 10px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.logout-button {
  position: fixed; /* 絶対位置を指定 */
  top: 40px; /* 上からの距離 */
  right: 0px; /* 右からの距離 */
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}

.fixed-button {
  position: fixed; /* スクロールに固定 */
  top: 40px; /* 上からの距離を調整 */
  left: 10px; /* 左からの距離 */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.menu button {
  display: block; /* 各ボタンをブロック要素にして縦に並べる */
  margin-top: 5px; /* ボタン間の余白 */
}

/* 年度選択のスタイル */
.year-label {
  font-size: 18px; /* 文字の大きさを変更 */
  margin-right: 10px;
}

#year-select {
  font-size: 16px; /* 入力フィールドの文字の大きさを変更 */
  height: 30px; /* 入力フィールドの高さを変更 */
  padding: 0px; /* 内側の余白を追加 */
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
