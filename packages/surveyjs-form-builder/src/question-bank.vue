<template>
  <div
    class="question-type-group"
    v-for="questionTypeGroup in questionTypeGroups"
    :key="questionTypeGroup.name"
  >
    <div class="title">{{ questionTypeGroup.name }}</div>
    <div class="options">
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
          <t-button variant="base" theme="default" class="option" :class="element.classList">
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
import {
  CatalogIcon,
  ComponentCheckboxIcon,
  ComponentDropdownIcon,
  ComponentInputIcon,
  ComponentRadioIcon,
  RootListIcon
} from 'tdesign-icons-vue-next';
import type { AddableQuestionTypeCategory } from './types/question-type-group';

const questionTypeGroups: Array<AddableQuestionTypeCategory> = [
  {
    name: '选择',
    types: [
      {
        name: '单选',
        icon: ComponentRadioIcon,
        type: 'radioGroup',
        classList: ['page-element'],
        add: true
      },
      {
        name: '多选',
        icon: ComponentCheckboxIcon,
        type: 'checkbox',
        classList: ['page-element'],
        add: true
      },
      {
        name: '下拉',
        icon: ComponentDropdownIcon,
        type: 'dropdown',
        classList: ['page-element'],
        add: true
      }
    ]
  },
  {
    name: '填空',
    types: [
      {
        name: '填空',
        icon: ComponentInputIcon,
        type: 'singleText',
        classList: ['page-element'],
        add: true
      }
    ]
  },
  {
    name: '布局',
    types: [
      { name: '页面', icon: CatalogIcon, type: 'page', classList: ['page'], add: true },
      {
        name: '题组',
        icon: RootListIcon,
        type: 'questionGroup',
        classList: ['page-element'],
        add: true
      }
    ]
  }
];
</script>

<style lang="less" scoped>
.question-type-group {
  margin-bottom: var(--space-3);

  .title {
    line-height: 2em;
    margin-bottom: var(--space);
  }
  .options {
    width: 208px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .option {
      --td-bg-color-component: var(--background-color);
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
