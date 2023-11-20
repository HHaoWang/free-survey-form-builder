import type { AddableQuestion } from '../../types/question-type-group';
import { ComponentInputIcon } from 'tdesign-icons-vue-next';
import { SingleTextQuestion } from 'free-survey-core';
import type { DataObjectGenerator } from '../../types/common';

export { default as SingleTextQuestionUIElement } from './single-text-input-block.vue';
export { default as SingleTextQuestionSetting } from './setting.vue';

export const SingleTextQuestionType: AddableQuestion = {
  name: '问答',
  icon: ComponentInputIcon,
  type: 'singleText',
  classList: ['page-element', 'question'],
  add: true
};

export const SingleTextQuestionDataObjectGenerator: DataObjectGenerator = () => {
  return new SingleTextQuestion();
};
