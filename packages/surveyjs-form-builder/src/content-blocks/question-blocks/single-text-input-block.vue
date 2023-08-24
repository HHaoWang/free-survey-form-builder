<template>
  <div>
    <editable-text v-model:value="currentQuestion.title"></editable-text>
    <div class="answer-input-area">
      <t-input input-class="answer-input" disabled placeholder="填写者回答区"></t-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SingleTextQuestion } from 'free-survey-core';
import { Input as TInput } from 'tdesign-vue-next';
import { computed } from 'vue';
import EditableText from '../../components/editable-text.vue';
const props = defineProps<{
  element: SingleTextQuestion;
  groupNumber: number;
}>();

const emits = defineEmits(['update:element']);

const currentQuestion = computed({
  get() {
    return props.element;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});
</script>

<style lang="less" scoped>
.answer-input-area {
  margin-top: var(--space-2);
}

:deep(.answer-input) {
  width: 45%;
  cursor: default;

  & input {
    cursor: default !important;
  }
}
</style>
