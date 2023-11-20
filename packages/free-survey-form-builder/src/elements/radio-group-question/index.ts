import type { AddableQuestion } from '../../types/question-type-group';
import { ComponentRadioIcon } from 'tdesign-icons-vue-next';
import { RadioGroupQuestion } from 'free-survey-core';

export { default as RadioGroupQuestionUIElement } from './ui-element.vue';
export { default as RadioGroupQuestionSetting } from './setting.vue';

export const RadioGroupQuestionType: AddableQuestion = {
  add: true,
  classList: ['page-element', 'question'],
  icon: ComponentRadioIcon,
  name: '单选',
  type: 'radioGroup'
};

export const RadioGroupQuestionDataObjectGenerator = () => {
  return new RadioGroupQuestion({
    title: '单选题'
  });
};
