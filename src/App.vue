<template>
  <div style="height: 100vh">
    <free-survey-form-builder v-model:survey="survey"></free-survey-form-builder>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Survey } from 'free-survey-core';

const survey = ref(new Survey());
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
}
</style>
