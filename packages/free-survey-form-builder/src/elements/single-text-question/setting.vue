<template>
  <div>
    <div class="setting-item">
      <div class="setting-item-title">问题</div>
      <div class="setting-item-value">
        <t-input v-model="currentSingleTextQuestion.title" size="small"></t-input>
      </div>
    </div>
    <div class="setting-item">
      <div class="setting-item-title">问题描述</div>
      <div class="setting-item-value">
        <t-textarea v-model="currentSingleTextQuestion.description"></t-textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { AbstractElement, SingleTextQuestion } from 'free-survey-core';
import { Input as TInput, Textarea as TTextarea } from 'tdesign-vue-next';

const props = defineProps<{
  settingElement: AbstractElement;
}>();
const emits = defineEmits(['update:settingElement']);
const currentSingleTextQuestion = computed({
  get() {
    return props.settingElement as SingleTextQuestion;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});
</script>

<style lang="less" scoped></style>
