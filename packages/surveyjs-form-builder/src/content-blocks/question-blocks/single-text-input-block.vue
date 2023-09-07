<template>
  <div tabindex="0" @blur="onBlur" class="single-text-question">
    <div class="left">{{ groupNumber + 1 }}</div>
    <div class="right">
      <editable-text v-model:value="currentQuestion.title"></editable-text>
      <div class="answer-input-area">
        <t-input input-class="answer-input" disabled placeholder="填写者回答区"></t-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SingleTextQuestion } from 'free-survey-core';
import { Input as TInput } from 'tdesign-vue-next';
import { computed } from 'vue';
import EditableText from '../../components/editable-text.vue';
import type { AddableQuestionType } from '../../types/question-type-group';
const props = defineProps<{
  element: SingleTextQuestion;
  groupNumber: number;
}>();

const emits = defineEmits(['update:element', 'addNewPageElement']);

const currentQuestion = computed({
  get() {
    return props.element;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});

const onBlur = (event: FocusEvent) => {
  if (!event.relatedTarget) return;
  if (!(event.relatedTarget as HTMLElement).classList.contains('addable-survey-element')) {
    return;
  }
  const needAddedElementType: AddableQuestionType | undefined = (event.relatedTarget as HTMLElement)
    .dataset.type as AddableQuestionType | undefined;
  if (!needAddedElementType || needAddedElementType === 'page') return;
  emits('addNewPageElement', needAddedElementType);
  return;
};
</script>

<style lang="less" scoped>
.single-text-question {
  padding: var(--space-2) var(--space-2) var(--space-2) 0;
  border-radius: 4px;
  display: flex;

  &:focus {
    outline: solid 1px deepskyblue;
  }

  .left {
    flex: 0 0 2em;
    line-height: 30px;
    border: dashed 1px transparent;
    font-size: 14px;
    text-align: right;
  }

  .right {
    flex: 1;
  }
}
.answer-input-area {
  margin-top: var(--space-2);
  margin-left: var(--space);
}

:deep(.answer-input) {
  width: 45%;
  cursor: default;

  & input {
    cursor: default !important;
  }
}
</style>
