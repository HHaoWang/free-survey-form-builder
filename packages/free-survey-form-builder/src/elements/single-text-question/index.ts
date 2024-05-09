import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { ComponentInputIcon } from 'tdesign-icons-vue-next';
import { SingleTextQuestion } from 'free-survey-core';
import type { DataObjectGenerator } from '../../types/common';
import { ElementProvider } from '../../element-provider';

import { default as SingleTextQuestionUIElement } from './single-text-input-block.vue';
import { default as SingleTextQuestionSetting } from './setting.vue';

const SingleTextQuestionType: AddableQuestion = {
  name: '问答',
  icon: ComponentInputIcon,
  type: 'singleText',
  classList: ['page-element', 'question'],
  add: true
};

const SingleTextQuestionDataObjectGenerator: DataObjectGenerator = () => {
  return new SingleTextQuestion();
};

export const SingleTextQuestionPlugin: QuestionPlugin = {
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '填空';
    ElementProvider.registerElement(
      categoryName,
      SingleTextQuestionType,
      SingleTextQuestionUIElement,
      SingleTextQuestionSetting,
      SingleTextQuestionDataObjectGenerator
    );
  }
};
