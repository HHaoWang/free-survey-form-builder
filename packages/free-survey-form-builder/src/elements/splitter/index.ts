import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { ComponentDividerVerticalIcon } from 'tdesign-icons-vue-next';
import type { DataObjectGenerator } from '../../types/common';
import { Splitter } from 'free-survey-core';
import { ElementProvider } from '../../element-provider';
import SplitterUI from './splitter-ui.vue';
import SplitterSettingsUI from './splitter-settings-ui.vue';

const splitterType: AddableQuestion = {
  add: true,
  classList: ['page-element', 'question'],
  icon: ComponentDividerVerticalIcon,
  name: '分割线',
  type: 'splitter'
};

const splitterDataObjectGenerator: DataObjectGenerator = () => {
  return new Splitter();
};

export const SplitterPlugin: QuestionPlugin = {
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '布局';
    ElementProvider.registerElement(
      categoryName,
      splitterType,
      SplitterUI,
      SplitterSettingsUI,
      splitterDataObjectGenerator
    );
  }
};
