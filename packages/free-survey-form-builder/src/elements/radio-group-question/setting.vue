<template>
  <div>
    <div class="setting-item">
      <div class="setting-item-title">问题</div>
      <div class="setting-item-value">
        <t-input v-model="currentQuestion.title" size="small"></t-input>
      </div>
    </div>
    <div class="setting-item">
      <div class="setting-item-title">问题描述</div>
      <div class="setting-item-value">
        <t-textarea v-model="currentQuestion.description"></t-textarea>
      </div>
    </div>
    <div class="setting-item">
      <div class="setting-item-title">其它选项</div>
      <div class="setting-item-value">
        <t-switch v-model="currentQuestion.allowOther" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { RadioGroupQuestion } from 'free-survey-core';
import { Input as TInput, Textarea as TTextarea, Switch as TSwitch } from 'tdesign-vue-next';
import type { SettingElementEmits, SettingElementProps } from '../../types/common';

const props = defineProps<SettingElementProps>();
const emits = defineEmits<SettingElementEmits>();
const currentQuestion = computed({
  get() {
    return props.settingElement as RadioGroupQuestion;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});
</script>

<style lang="less" scoped></style>
