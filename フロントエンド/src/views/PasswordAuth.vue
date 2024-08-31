<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const correctPassword = 'KingGnu2024'; // ここに正しいパスワードを設定

function authenticate() {
  console.log('Attempting authentication with password:', password.value);
  if (password.value === correctPassword) {
    console.log('Authentication successful');
    localStorage.setItem('authenticated', 'true');
    router.push('/admin-results').then(() => {
      console.log('Redirection successful');
    }).catch(err => {
      console.log('Redirection failed', err);
    });
  } else {
    console.log('Authentication failed');
    errorMessage.value = 'パスワードが間違っています。';
  }
}

</script>

<template>
  <div class="auth-container">
    <h1>結果ページへのアクセス</h1>
    <form @submit.prevent="authenticate">
      <label for="password">パスワード:</label>
      <input id="password" v-model="password" type="password" placeholder="パスワードを入力" required />
      <button type="submit">確認</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.error {
  color: red;
}

input {
  margin-bottom: 10px;
}
</style>
