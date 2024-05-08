import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { CatalogIcon } from 'tdesign-icons-vue-next';
import { Page } from 'free-survey-core';
import { ElementProvider } from '../../element-provider';

import { default as PageBlockUIElement } from './page-block.vue';
import { default as PageBlockSetting } from './setting.vue';

const PageBlockType: AddableQuestion = {
  name: '页面',
  icon: CatalogIcon,
  type: 'page',
  classList: ['page'],
  add: true
};

const PageBlockDataObjectGenerator = () => {
  return new Page();
};

export const PageBlockPlugin: QuestionPlugin = {
  install(): void {
    ElementProvider.registerElement(
      '布局',
      PageBlockType,
      PageBlockUIElement,
      PageBlockSetting,
      PageBlockDataObjectGenerator
    );
  }
};
