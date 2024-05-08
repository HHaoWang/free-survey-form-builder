<template>
  <div>
    <setting-item title="问题">
      <t-input v-model="currentQuestion.title" size="small" />
    </setting-item>

    <setting-item title="问题描述">
      <t-textarea v-model="currentQuestion.description" />
    </setting-item>

    <setting-item title="占位提示">
      <t-input v-model="currentQuestion.placeholder" size="small" />
    </setting-item>

    <setting-item title="必填">
      <t-switch v-model="currentQuestion.isRequired" />
    </setting-item>

    <setting-item title="最大长度">
      <t-input-number
        :autoWidth="true"
        v-model="currentQuestion.maxLength"
        size="small"
        theme="column"
        :decimal-places="0"
        :min="(currentQuestion.minLength ?? 0) + 1"
      />
      <icon-font name="close-circle" size="medium" class="del-btn" @click="clearMax" />
    </setting-item>

    <setting-item title="最小长度">
      <t-input-number
        :autoWidth="true"
        v-model="currentQuestion.minLength"
        size="small"
        :decimal-places="0"
        theme="column"
        :max="(currentQuestion.maxLength ?? Number.POSITIVE_INFINITY) + 1"
        :min="0"
      />
      <icon-font name="close-circle" size="16px" class="del-btn" @click="clearMin" />
    </setting-item>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { AbstractElement, SingleTextQuestion } from 'free-survey-core';
import {
  Input as TInput,
  Textarea as TTextarea,
  Switch as TSwitch,
  InputNumber as TInputNumber
} from 'tdesign-vue-next';
import SettingItem from '../../components/setting-item.vue';
import { IconFont } from 'tdesign-icons-vue-next';

const props = defineProps<{
  settingElement: AbstractElement;
}>();
const emits = defineEmits(['update:settingElement']);
const currentQuestion = computed({
  get() {
    return props.settingElement as SingleTextQuestion;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});

const clearMax = () => {
  currentQuestion.value.maxLength = undefined;
};

const clearMin = () => {
  currentQuestion.value.minLength = undefined;
};
</script>

<style lang="less" scoped>
.del-btn {
  color: red;
  cursor: pointer;
  margin-left: 8px;
}
</style>
