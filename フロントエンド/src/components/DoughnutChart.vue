<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // プラグインをインポート

// Chart.js の登録
Chart.register(...registerables);
Chart.register(ChartDataLabels); // プラグインを登録

// Propsを受け取る
const props = defineProps({
  data: {
    type: Object,
    required: true // データは必須
  },
  title: {
    type: String,
    default: 'グラフタイトル' // デフォルトタイトル
  }
});

// グラフの初期設定
const chartInstance = ref(null);
const canvas = ref(null);

// グラフの描画を行う関数
function renderChart() {
  if (chartInstance.value) {
    chartInstance.value.destroy(); // 既に存在するグラフを破棄
  }

  const chartData = props.data.data;
  const total = chartData.reduce((acc, val) => acc + val, 0);

  // グラフのデータがすべて0の場合、空のグラフを表示
  if (total === 0) {
    chartInstance.value = new Chart(canvas.value, {
      type: 'doughnut',
      data: {
        labels: props.data.labels,
        datasets: [{
          label: props.title,
          data: chartData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: false // データラベルを表示しない
          }
        }
      }
    });
    return; // グラフの描画を終了
  }

  chartInstance.value = new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels: props.data.labels,
      datasets: [{
        label: props.title,
        data: chartData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    },
    options:{
      plugins:{
        datalabels:{
          formatter: (value) => {
            const percentage = Math.round(value) // 小数点以下を丸めて整数に変換
            return percentage + '%'; // パーセンテージを返す
          },
          color:'black'
        }
      }
    }
  });
}

// 初回レンダー時とデータ変更時にグラフを描画
onMounted(renderChart);
watch(() => props.data, renderChart);
</script>

<template>
  <div class="chart-container">
    <h3>{{ title }}</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

canvas {
  max-width: 400px;
  max-height: 400px;
}
</style>
