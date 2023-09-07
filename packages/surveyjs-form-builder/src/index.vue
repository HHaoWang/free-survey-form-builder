<template>
  <main-layout class="free-surveyjs-form-builder">
    <template #header>
      <span>{{ survey.title }}</span>
      <t-divider layout="vertical" />
    </template>

    <template #left-side>
      <question-bank></question-bank>
    </template>

    <template #content>
      <title-block
        v-model:title="survey.title"
        v-model:description="survey.description"
      ></title-block>
      <draggable
        :list="survey.pages"
        item-key="id"
        :group="group"
        ghostClass="dragging-ghost-element"
        drag-class="dragging-element"
        @change="onAdd"
      >
        <template #item="{ index }">
          <page-block
            :page-number="index"
            @add-new-page="onAddNewPage(index)"
            v-model:page="survey.pages[index]"
          ></page-block>
        </template>
      </draggable>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import 'tdesign-vue-next/es/style/index.css';
import { Divider as TDivider } from 'tdesign-vue-next';
import { Page, Survey } from 'free-survey-core';
import TitleBlock from './content-blocks/title-block.vue';
import MainLayout from './layout/main-layout.vue';
import PageBlock from './content-blocks/page-block.vue';
import QuestionBank from './question-bank.vue';
import draggable from 'vuedraggable';
import type { ChangeEvent } from 'vuedraggable';

const survey = ref(new Survey());
survey.value.pages.push(new Page());

const group = {
  name: 'questions',
  pull: true,
  put: function (toList: HTMLElement, fromList: HTMLElement, sourceElement: Element) {
    return sourceElement.classList.contains('page');
  }
};
const onAdd = (evt: ChangeEvent) => {
  if (evt.added) {
    survey.value.pages.splice(evt.added.newIndex, 1, new Page());
  }
};
const onAddNewPage = (afterIndex: number) => {
  survey.value.pages.splice(afterIndex + 1, 0, new Page());
};
</script>

<style lang="less">
.free-surveyjs-form-builder {
  --background-color: #f7f8fa;
  --space: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;

  font-family: Helvetica Neue, PingFang SC, Hiragino Sans GB, HeitiSC, Helvetica, Arial,
    Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  line-height: 1.5;
  color: #484848;
  letter-spacing: 0;

  .dragging-ghost-element {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: var(--background-color);
    }
  }

  .dragging-element {
    opacity: 1;
  }
}

::-webkit-scrollbar {
  width: 12px;
  background: var(--background-color);
}

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
  background-color: var(--td-scrollbar-color);

  &:hover {
    background-color: var(--td-scrollbar-hover-color);
  }
}
</style>
