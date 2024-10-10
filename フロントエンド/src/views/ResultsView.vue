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
  <div>
    <header>
      <div class="header-center">
        <h1>アンケート結果</h1>
      </div>
      <div class="header-right">
        <button class="category-button" v-if="currentPage === 'page'" @click="handlePage">質問ごと</button> <!-- 質問ごとのボタン -->
        <button class="category-button" v-if="currentPage === 'question'" @click="handleQuestion">団体ごと</button>
        <div class="year-container">
          <label class="year-label" for="year-select">年度を選択</label>
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
        <button class="logout-button" @click="handleLogout">ログアウト</button>
      </div>
    </header>
    <div class="results-container">
      <div class="results-view">
        <ResultsPage v-if="currentPage === 'page'" :year="selectedYear" />
        <ResultsQuestion v-if="currentPage === 'question'" :year="selectedYear" />
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-left {
  display: flex;
  justify-content: flex-start;
  min-width: 260px;
}

.category-button {
  padding: 10px 20px;
  margin-right: 10px; /* ボタンを少し内側に */
  font-size: 16px;
  cursor: pointer;
}

.year-container{
  margin-left: 20px;
  display:flex;
  flex-direction: column;
  align-items: center;
}

/* 年度選択のスタイル */
.year-label {
  font-size: 18px; /* 文字の大きさを変更 */
}

#year-select {
  font-size: 16px; /* 入力フィールドの文字の大きさを変更 */
  height: 30px; /* 入力フィールドの高さを変更 */
  padding: 0px;
  text-align: center;
}

.header-center {
  display: flex;
  justify-content: flex-start;
  margin-left: 60px;
}

header h1 {
  text-align: center;
  margin: 0px;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  min-width: 260px;
  margin-right: 90px;
}

.logout-button {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 30px;
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
}

.results-view {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* アンケート結果を中央揃えに */
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

/* レスポンシブ対応 */
@media (max-width: 800px) {
  header {
    flex-direction: column; /* 小さい画面でヘッダーの要素を縦に並べる */
    padding: 10px;
  }

  .header-left{
    justify-content: center;
    margin-bottom: 10px;
  }

  .header-right {
    justify-content: center;
    margin-bottom: 10px;
    margin-right: 5px;
  }

  .header-center{
    margin-left: 0px;
    margin-right: 22px;
  }

  .results-container {
    padding: 10px;
    margin-top: 150px;
  }

  .category-button,
  .logout-button {
    font-size: 14px; /* ボタンの文字サイズを小さく */
    padding: 8px 12px;
  }

  #year-select {
    font-size: 14px;
    height: 25px;
  }
}
</style>
