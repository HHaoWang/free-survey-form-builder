<template>
  <element-with-operations-bar
    :element-id="currentQuestion.id"
    @click.stop="EventBus.emit('focusElement', currentQuestion)"
    class="single-text-question question"
  >
    <div class="left">{{ groupNumber + 1 }}.</div>
    <div class="right">
      <editable-text v-model:value="currentQuestion.title"></editable-text>
      <div class="answer-input-area">
        <t-input input-class="answer-input" disabled placeholder="填写者回答区"></t-input>
      </div>
    </div>
  </element-with-operations-bar>
</template>

<script lang="ts" setup>
import { Input as TInput } from 'tdesign-vue-next';
import { computed } from 'vue';
import { EventBus } from '../../scripts/event-bus';
import ElementWithOperationsBar from '../../components/element-with-operations-bar.vue';
import EditableText from '../../components/editable-text.vue';
import type { ElementEmits, ElementProps } from '../../types/common';
import type { SingleTextQuestion } from 'free-survey-core';

const props = defineProps<ElementProps>();

const emits = defineEmits<ElementEmits>();

const currentQuestion = computed({
  get() {
    return props.element as SingleTextQuestion;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});
</script>

<style lang="less" scoped>
.single-text-question {
  padding: var(--space-2) var(--space-2) var(--space-2) 0;
  border-radius: 4px;
  display: flex;
  position: relative;

  &:hover:not(.focused) {
    outline: dashed 1px deepskyblue;
  }

  &:hover .operations {
    display: block;
  }

  .left {
    flex: 0 0 2em;
    line-height: 30px;
    border: dashed 1px transparent;
    font-size: 14px;
    text-align: right;
    color: var(--serial-number-color);
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
