<template>
  <div
    class="question-type-group"
    v-for="questionTypeGroup in questionTypeGroups"
    :key="questionTypeGroup.name"
  >
    <div class="title">{{ questionTypeGroup.name }}</div>
    <div class="options">
      <div v-if="questionTypeGroup.types.length <= 0" class="no-element-type-tip">暂无题型可用</div>
      <draggable
        :list="questionTypeGroup.types"
        item-key="name"
        :sort="false"
        :group="{
          name: 'questions',
          pull: 'clone',
          put: false
        }"
        drag-class="dragging-element"
      >
        <template #item="{ element }">
          <t-button
            variant="base"
            theme="default"
            class="option addable-survey-element"
            :class="element.classList"
            :data-type="element.type"
            @click="emits('addNewElement', element)"
          >
            <template #icon><component :is="element.icon"></component></template>
            {{ element.name }}
          </t-button>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

import { Button as TButton } from 'tdesign-vue-next';
import type { AddableQuestionTypeCategory } from './types/question-type-group';
import { ElementProvider } from './element-provider';

const emits = defineEmits(['addNewElement']);

const questionTypeGroups: Array<AddableQuestionTypeCategory> =
  ElementProvider.getElementBankCategory();
</script>

<style lang="less" scoped>
.question-type-group {
  margin-bottom: var(--space-3);

  .title {
    line-height: 2em;
    margin-bottom: var(--space);
    color: var(--td-text-color-primary);
  }
  .options {
    width: 208px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .no-element-type-tip {
      font-size: var(--font-size-small);
      color: var(--font-color-secondnary);
    }

    .option {
      width: 100px;
      margin-right: var(--space);
      margin-bottom: var(--space);

      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
</style>
