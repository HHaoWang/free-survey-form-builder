<template>
  <basic-question-ui-element :group-number="props.groupNumber" :element="props.element">
    <editable-text v-model:value="currentQuestion.title"></editable-text>
    <editable-text v-model:value="currentQuestion.description"></editable-text>
    <div class="answer-input-area">
      <t-upload :disabled="true" title="文件上传题型编辑期间只能预览无法操作"/>
    </div>
  </basic-question-ui-element>
</template>

<script lang="ts" setup>
import { Upload as TUpload } from 'tdesign-vue-next';
import { computed } from 'vue';
import EditableText from '../../components/editable-text.vue';
import type { ElementEmits, ElementProps } from '../../types/common';
import type { FileQuestion } from 'free-survey-core';
import BasicQuestionUiElement from '../../components/basic-question-ui-element.vue';

const props = defineProps<ElementProps>();

const emits = defineEmits<ElementEmits>();

const currentQuestion = computed({
  get() {
    return props.element as FileQuestion;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});
</script>

<style lang="less" scoped>
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
