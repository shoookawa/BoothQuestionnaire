<template>
    <div class="results-by-question-container">
      <h1>{{ props.year }} 年度の回答割合</h1>
      <div v-for="question in questionPercentages" :key="question.id" style="margin-bottom: 80px;">
        <DoughnutChart 
          :data="{
            labels: Object.keys(question.percentages),
            data: Object.values(question.percentages)
          }" 
          :title="question.title" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, onMounted, watch } from 'vue';
  import axios from 'axios';
  import DoughnutChart from '@/components/DoughnutChart.vue';
  
  const props = defineProps(['year']);
  const results = ref([]); // 結果を保存する配列
  
  // 各質問とその選択肢を定義
  const questions = ref([
    {
      id: 'satisfaction',
      title: 'Q1. 総合的な満足度',
      options: ['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満']
    },
    {
      id: 'support',
      title: 'Q3. 実行委員会の対応の良さ',
      options: ['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満']
    },
    {
      id: 'advertisement',
      title: 'Q5. 出店募集をどこで知りましたか',
      options: ['HP', 'ポスター', 'SNS', 'その他']
    }
  ]);
  
  // コンポーネントがマウントされたときに結果を取得
  onMounted(() => {
    fetchResults();
  });
  
  // 年度が変更されたときに再取得
  watch(() => props.year, () => {
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
  
  // 年度に基づいてフィルタリング
  const filteredResults = computed(() => {
    return results.value.filter(result => result.year === props.year);
  });
  
  // 各質問に対する回答の割合を計算する関数
  function calculatePercentage(questionId) {
    const total = filteredResults.value.length; // フィルタリングされた結果の長さ
    const counts = {};
  
    // 各選択肢のカウントを行う
    filteredResults.value.forEach(result => {
      const answer = result[questionId];
      if (answer) {
        counts[answer] = (counts[answer] || 0) + 1; // 回答をカウント
      }
    });
  
    // 割合を計算
    const percentages = {};
    const options = questions.value.find(q => q.id === questionId).options;
  
    // 各選択肢に対する割合を計算
    options.forEach(option => {
      const count = counts[option] || 0; // 選択肢のカウント
      percentages[option] = total > 0 ? ((count / total) * 100).toFixed(2) : 0; // 割合を計算
    });
  
    return percentages;
  }
  
  // 全質問に対して割合を計算
  const questionPercentages = computed(() => {
    return questions.value.map(question => ({
      ...question,
      percentages: calculatePercentage(question.id) // 各質問の割合を計算して保存
    }));
  });
  
  // ここで questionPercentages の変更を監視し、DoughnutChartに再読み込みを指示
  watch(questionPercentages, () => {
    // グラフを再描画するロジックを追加する場合、ここに記述
  }, { deep: true }); // deepオプションを追加してオブジェクトの変更を監視
  </script>
  
  <style scoped>
  .results-by-question-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  canvas {
    margin-bottom: 20px;
  }
  </style>
  