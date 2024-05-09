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

    <setting-item title="最多选择">
      <t-input-number
        :autoWidth="true"
        v-model="currentQuestion.maxSelect"
        size="small"
        theme="column"
        :decimal-places="0"
        :max="currentQuestion.choices.length"
        :min="(currentQuestion.minSelect ?? 0) + 1"
      />
      <icon-font name="close-circle" size="medium" class="del-btn" @click="clearMax" />
    </setting-item>

    <setting-item title="最少选择">
      <t-input-number
        :autoWidth="true"
        v-model="currentQuestion.minSelect"
        size="small"
        :decimal-places="0"
        theme="column"
        :max="(currentQuestion.maxSelect ?? Number.POSITIVE_INFINITY) - 1"
        :min="0"
      />
      <icon-font name="close-circle" size="16px" class="del-btn" @click="clearMin" />
    </setting-item>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { type CheckBoxQuestion } from 'free-survey-core';
import {
  Input as TInput,
  Textarea as TTextarea,
  Switch as TSwitch,
  InputNumber as TInputNumber
} from 'tdesign-vue-next';
import type { SettingElementEmits, SettingElementProps } from '../../types/common';
import SettingItem from '../../components/setting-item.vue';
import { IconFont } from 'tdesign-icons-vue-next';

const props = defineProps<SettingElementProps>();
const emits = defineEmits<SettingElementEmits>();
const currentQuestion = computed({
  get() {
    return props.settingElement as CheckBoxQuestion;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});

const clearMax = () => {
  currentQuestion.value.maxSelect = undefined;
};

const clearMin = () => {
  currentQuestion.value.minSelect = undefined;
};
</script>

<style lang="less" scoped>
.del-btn {
  color: red;
  cursor: pointer;
  margin-left: 8px;
}
</style>
