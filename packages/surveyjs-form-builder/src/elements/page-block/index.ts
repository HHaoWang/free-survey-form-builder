import type { AddableQuestion } from '../../types/question-type-group';
import { CatalogIcon } from 'tdesign-icons-vue-next';
import { Page } from 'free-survey-core';

export { default as PageBlockUIElement } from './page-block.vue';
export { default as PageBlockSetting } from './setting.vue';

export const PageBlockType: AddableQuestion = {
  name: '页面',
  icon: CatalogIcon,
  type: 'page',
  classList: ['page'],
  add: true
};

export const PageBlockDataObjectGenerator = () => {
  return new Page();
};
