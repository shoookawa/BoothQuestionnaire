<script setup>
  import { ref } from 'vue'

  const currentComponent = ref('SurveyForm');
  const formData = ref({});

  function hadleGoToConfirm(data){
    formData.value = data;
    currentComponent.value = 'SurveyConfirm';
  }
  function hadleGoBack(){
    currentComponent.value = 'SurveyForm';
  }
  async function hadleSubmitForm(data){
    currentComponent.value = 'SurveyComplete';
    //try{
      //await axios.post('/', data);
      //currentComponent.value = 'SurveyComplete';
    //} catch(error){
      //console.error('アンケートの送信に失敗しました:', error);
    //}
  }
</script>

<template>
  <main>
    <div id="app">
      <SurveyHeader />
      <component :is="currentComponent" :formData="formData" @goToConfirm="hadleGoToConfirm" @goBack="hadleGoBack" @submitForm="hadleSubmitForm" />
    </div>
  </main>
</template>

<style scoped>

</style>
