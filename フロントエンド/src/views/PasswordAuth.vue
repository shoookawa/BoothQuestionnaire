<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const passwordVisible = ref(false);

const correctPassword = import.meta.env.VITE_APP_PASSWORD;

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

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

</script>

<template>
  <div class="auth-container">
    <h1>結果ページへのアクセス</h1>
    <form @submit.prevent="authenticate">
      <label for="password">パスワード:</label>
      <input id="password" v-model="password" style="margin-left: 10px;" :type="passwordVisible ? 'text' : 'password'" placeholder="パスワードを入力" required />
      <button type="button" style="margin-left: 10px;" @click="togglePasswordVisibility">
        {{ passwordVisible ? '非表示' : '表示' }}
      </button>
      <button type="submit" style="margin-left: 10px;">ログイン</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 500px;
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
