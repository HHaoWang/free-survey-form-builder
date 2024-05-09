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
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '布局';
    ElementProvider.registerElement(
      categoryName,
      PageBlockType,
      PageBlockUIElement,
      PageBlockSetting,
      PageBlockDataObjectGenerator
    );
  }
};
