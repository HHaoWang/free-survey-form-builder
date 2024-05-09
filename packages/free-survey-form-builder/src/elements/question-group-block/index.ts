import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { RootListIcon } from 'tdesign-icons-vue-next';
import { QuestionGroup } from 'free-survey-core';

import { default as QuestionGroupBlockUIElement } from './question-group-block.vue';
import { default as QuestionGroupBlockSetting } from './question-group-setting.vue';
import { ElementProvider } from '../../element-provider';

const QuestionGroupBlockType: AddableQuestion = {
  name: '题组',
  icon: RootListIcon,
  type: 'questionGroup',
  classList: ['page-element'],
  add: true
};

const QuestionBlockDataObjectGenerator = () => {
  return new QuestionGroup();
};

export const QuestionGroupPlugin: QuestionPlugin = {
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '布局';
    ElementProvider.registerElement(
      categoryName,
      QuestionGroupBlockType,
      QuestionGroupBlockUIElement,
      QuestionGroupBlockSetting,
      QuestionBlockDataObjectGenerator
    );
  }
};
