<template>
  <main-layout
    class="free-surveyjs-form-builder"
    id="free-survey-form-builder"
    :show-header="props.showHeader"
  >
    <template #header>
      <slot name="header-logo" />
      <span v-if="showSurveyTitle" class="header-title">{{ survey.title }}</span>
      <t-divider layout="vertical" v-if="showSurveyTitleRightDivider" />
      <slot name="header-left" />
      <div class="header-space" />
      <slot name="header-right" />
    </template>

    <template #left-side>
      <question-bank @add-new-element="onAddNewElement"></question-bank>
    </template>

    <template #content>
      <component :is="'style'" id="free-survey-form-builder-style-sheet"></component>
      <title-block
        v-model:title="currentSurvey.title"
        v-model:description="currentSurvey.description"
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
            v-model:page="currentSurvey.pages[index]"
            :id="'FREE-SURVEY-' + survey.pages[index].id"
          ></page-block>
        </template>
      </draggable>
    </template>

    <template #right-side>
      <settings-area v-model:element="focusedElement"></settings-area>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import 'tdesign-vue-next/es/style/index.css';
import { Divider as TDivider } from 'tdesign-vue-next';
import { Page, Survey } from 'free-survey-core';
import MainLayout from './layout/main-layout.vue';
import QuestionBank from './question-bank.vue';
import draggable from 'vuedraggable';
import type { ChangeEvent } from 'vuedraggable';
import { useRefresh } from './scripts/refresh';
import { useEditSurvey } from './edit-survey';
import SettingsArea from './settings-area.vue';
import PageBlock from './elements/page-block/page-block.vue';
import TitleBlock from './components/title-block.vue';
import { registerDefaultQuestion } from './scripts/registerDefaultQuestion';
import { useFocusManage } from './scripts/focusManage';
import { ElementProvider } from './element-provider';

const props = withDefaults(
  defineProps<{
    survey?: Survey;
    showHeader?: boolean;
    useDefaultQuestions?: boolean;
    showSurveyTitle?: boolean;
    showSurveyTitleRightDivider?: boolean;
  }>(),
  {
    survey: () => new Survey(),
    showHeader: true,
    useDefaultQuestions: true,
    showSurveyTitle: true,
    showSurveyTitleRightDivider: true
  }
);

const emits = defineEmits(['update:survey']);

const currentSurvey = computed({
  get() {
    return props.survey;
  },
  set(newVal) {
    emits('update:survey', newVal);
  }
});

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
    currentSurvey.value.pages.splice(evt.added.newIndex, 1, new Page());
  }
};

const { refresh, refreshKey } = useRefresh();
//endregion

const { focusedElement } = useFocusManage();

const { onAddNewElement } = useEditSurvey(focusedElement, currentSurvey, refresh);

if (props.useDefaultQuestions) {
  ElementProvider.clearElements();
  registerDefaultQuestion();
}
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
  --font-family: Helvetica Neue, PingFang SC, Hiragino Sans GB, HeitiSC, Helvetica, Microsoft YaHei,
    WenQuanYi Micro Hei, sans-serif;
  --font-size-small: 14px;
  --font-size-smaller: 12px;
  --font-color-secondnary: var(--td-text-color-secondary);
  --theme-primary-color: var(--td-brand-color);
  --header-height: 48px;
  --header-padding-top: 7px;
  --header-padding-bottom: 7px;

  font-family: var(--font-family);
  line-height: 1.5;
  color: #484848;
  letter-spacing: 0;

  .header {
    &-title {
      display: inline-block;
      color: var(--td-text-color-primary);
    }

    &-space {
      flex-grow: 1;
    }
  }

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
      z-index: 999;
    }
  }

  .dragging-element {
    opacity: 1;
    background-color: white;
  }

  .focused {
    outline: solid 1px deepskyblue;
  }
}

::-webkit-scrollbar {
  width: 12px;
  background: var(--td-scroll-track-color);
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
