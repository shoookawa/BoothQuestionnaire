const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// ミドルウェア
app.use(cors()); // CORS ミドルウェアを追加
app.use(bodyParser.json());

// MongoDB 接続
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// スキーマの定義
const SurveySchema = new mongoose.Schema({
  format: { type: String, required: true },
  satisfaction: { type: String, required: true },
  reason_satisfaction: { type: String, required: false },
  support: { type: String, required: true },
  reason_support: { type: String, required: false },
  advertisement: { type: String, required: true },
  other_advertisement: { type: String, required: false },
  opportunity: { type: String, required: true },
  dissatisfaction: { type: String, required: true},
  garbage: { type: String, required: true },
  amount: { type: String, required: false },
  nextyear: { type: String, required: true },
  reason_nextyear: { type: String, required: false },
  comment: { type: String, default: '' },
  year: { type: Number, required: true }
});

// モデルの作成
const Survey = mongoose.model('Survey', SurveySchema);

// ルート: フォームデータの受信
app.post('/api/submit', async (req, res) => {
  try {
    const surveyData = req.body;
    console.log('Received survey data:', surveyData); // 受け取ったデータをログに出力
    const newSurvey = new Survey(surveyData);
    await newSurvey.save();
    res.status(201).send('Survey data saved successfully');
  } catch (error) {
    console.error('Error saving survey data:', error); // 詳細なエラーメッセージをログに出力
    res.status(500).send('Error saving survey data');
  }
});

// アンケート結果を取得するエンドポイント
app.get('/api/results', async (req, res) => {
  try {
    const results = await Survey.find(); // 全てのアンケート結果を取得
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching survey results:', error);
    res.status(500).send('Error fetching survey results');
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
