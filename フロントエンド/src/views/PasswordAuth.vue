<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const passwordVisible = ref(false);

const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2時間をミリ秒に変換

async function authenticate() {
  console.log('Attempting authentication with password:', password.value);
  try {
    const response = await axios.post('https://cloverfes.com/booth_questionnaire/password.php', {
      password: password.value // 入力されたパスワードを送信
    });
    if (response.data.status === 'success') {
      console.log('Authentication successful');

      const now = new Date().getTime(); // 現在の時間を取得
      const expiryTime = now + SESSION_DURATION; // 有効期限の設定

      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('expiryTime', expiryTime); // 有効期限を保存

      router.push('/admin-results').then(() => {
        console.log('Redirection successful');
      }).catch(err => {
        console.log('Redirection failed', err);
      });
    } else {
      console.log('Authentication failed');
      errorMessage.value = response.data.message || 'パスワードが間違っています。';
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    errorMessage.value = '認証中にエラーが発生しました。';
  }
}

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>アンケート結果ページ<br>ログイン</h1>
      <form @submit.prevent="authenticate">
        <div class="form-group">
          <label for="password">パスワード:</label>
          <div class="pass-group">
            <input id="password" v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="パスワードを入力" required />
            <button type="button" @click="togglePasswordVisibility">
              {{ passwordVisible ? '非表示' : '表示' }}
            </button>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-btn">ログイン</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.auth-box {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333333;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 5px;
  font-size: 16px;
  color: #333333;
}

.pass-group {
  display: flex;
  width: 100%;
  align-items: center; /* これで垂直中央揃えに */
}

input {
  padding: 10px;
  width: 80%;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 8px 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 20%;
  text-align: center;
  margin-left: 5px; /* 少しスペースを追加 */
}

button:hover {
  background-color: #0056b3;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #28a745;
  border-radius: 4px;
}

.submit-btn:hover {
  background-color: #218838;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
