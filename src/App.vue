<template>
  <div class="panel">
    <free-survey-form-builder :survey="survey" class="form-builder"/>
    <div>
      <t-button @click="exportSurvey">复制</t-button>
    </div>
    <div>{{ survey }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Survey } from 'free-survey-core';
import { Button as TButton, DialogPlugin } from 'tdesign-vue-next';
import { FreeSurveyFormBuilder } from '../packages';

const survey = ref(new Survey());
const exportSurvey = () => {
  const text = survey.value.exportToJson();
  console.log(text);
  window.navigator.clipboard.writeText(text).then(() => {
    DialogPlugin.alert({
      body: '已经复制到剪贴板！'
    });
  });
};
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
}

.panel {
  .form-builder {
    height: 100vh;
  }
}
</style>
