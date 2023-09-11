<template>
  <main-layout class="free-surveyjs-form-builder" id="free-survey-form-builder">
    <template #header>
      <span>{{ survey.title }}</span>
      <t-divider layout="vertical" />
    </template>

    <template #left-side>
      <question-bank @add-new-element="onAddNewElement"></question-bank>
    </template>

    <template #content>
      <component :is="'style'" id="free-survey-form-builder-style-sheet"></component>
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
        @change="onDragAdd"
        :key="refreshKey"
      >
        <template #item="{ index }">
          <page-block
            :page-number="index"
            v-model:page="survey.pages[index]"
            :id="'FREE-SURVEY-' + survey.pages[index].id"
          ></page-block>
        </template>
      </draggable>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import 'tdesign-vue-next/es/style/index.css';
import { Divider as TDivider } from 'tdesign-vue-next';
import { AbstractElement, Page, Survey } from 'free-survey-core';
import TitleBlock from './content-blocks/title-block.vue';
import MainLayout from './layout/main-layout.vue';
import PageBlock from './content-blocks/page-block.vue';
import QuestionBank from './question-bank.vue';
import draggable from 'vuedraggable';
import type { ChangeEvent } from 'vuedraggable';
import { EventBus } from './scripts/event-bus';
import { useRefresh } from './scripts/refresh';
import { useEditSurvey } from './edit-survey';

const survey = ref(new Survey());
survey.value.pages.push(new Page());

//region draggable
const group = {
  name: 'questions',
  pull: true,
  put: function (toList: HTMLElement, fromList: HTMLElement, sourceElement: Element) {
    return sourceElement.classList.contains('page');
  }
};
const onDragAdd = (evt: ChangeEvent) => {
  if (evt.added) {
    survey.value.pages.splice(evt.added.newIndex, 1, new Page());
  }
};

const { refresh, refreshKey } = useRefresh();
//endregion

//region focusManage
const focusedElement = ref<AbstractElement | null>(null);
let styleSheet: CSSStyleSheet | null = null;
onMounted(() => {
  styleSheet = (document.getElementById('free-survey-form-builder-style-sheet') as HTMLStyleElement)
    .sheet;
});
let addedStyleIndex: number | undefined = 0;
watch(
  () => focusedElement.value,
  (newVal, oldValue) => {
    if (oldValue !== null) {
      if (addedStyleIndex !== undefined) {
        styleSheet?.deleteRule(addedStyleIndex);
      }
    }
    if (newVal !== null) {
      addedStyleIndex = styleSheet?.insertRule(
        `#FREE-SURVEY-${newVal.id} {outline:solid 1px deepskyblue;}`,
        0
      );
    }
  }
);
EventBus.on('focusElement', (newFocusedElement: AbstractElement | null) => {
  focusedElement.value = newFocusedElement;
});
//endregion

const { onAddNewElement } = useEditSurvey(focusedElement, survey, refresh);
</script>

<style lang="less">
.free-surveyjs-form-builder {
  --background-color: #f7f8fa;
  --serial-number-color: #909090;
  --space: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --operations-bar-height: 24px;

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

  .focused {
    outline: solid 1px deepskyblue;
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
