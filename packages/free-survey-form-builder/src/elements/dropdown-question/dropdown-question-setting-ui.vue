<template>
  <div>
    <setting-item title="问题">
      <t-input v-model="currentQuestion.title" size="small" />
    </setting-item>

    <setting-item title="问题描述">
      <t-textarea v-model="currentQuestion.description" />
    </setting-item>

    <setting-item title="必填">
      <t-switch v-model="currentQuestion.isRequired" />
    </setting-item>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { type DropdownQuestion } from 'free-survey-core';
import { Input as TInput, Textarea as TTextarea, Switch as TSwitch } from 'tdesign-vue-next';
import type { SettingElementEmits, SettingElementProps } from '../../types/common';
import SettingItem from '../../components/setting-item.vue';

const props = defineProps<SettingElementProps>();
const emits = defineEmits<SettingElementEmits>();
const currentQuestion = computed({
  get() {
    return props.settingElement as DropdownQuestion;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});
</script>

<style lang="less" scoped></style>
