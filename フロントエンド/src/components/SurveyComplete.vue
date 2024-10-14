<script setup>
</script>

<template>
  <div class="survey-complete-container">
    <h1>送信完了</h1>
    <p class="survey-note">アンケートの送信が<br class="complete-br2">完了しました。</p>
    <p class="survey-note">ご協力ありがとう<br class="complete-br3">ございました。</p>
    <p class="survey-note">何かご不明な点が<br class="complete-br2">ございましたら、<br class="complete-br">下記の連絡先に<br class="complete-br2">ご連絡ください。</p>
    <p class="survey-note">Mail：store-clover<br class="complete-br4">@mail.doshisha.ac.jp</p>
  </div>
</template>

<style scoped>
.survey-complete-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.survey-note {
  color: #333;
  line-height: 120%;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.2em;
}

.complete-br{
  display: none;
}

.complete-br2{
  display: none;
}

.complete-br3{
  display: none;
}

.complete-br4{
  display: none;
}

@media (max-width: 700px) {
  .complete-br{
    display: block;
  }
}

@media (max-width: 435px) {
  .complete-br4{
    display: block;
  }
}

@media (max-width: 405px) {
  .complete-br2{
    display: block;
  }
}

@media (max-width: 385px) {
  .complete-br3{
    display: block;
  }
}

</style>
