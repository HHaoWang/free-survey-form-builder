import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { ComponentRadioIcon } from 'tdesign-icons-vue-next';
import { RadioGroupQuestion } from 'free-survey-core';

import { default as RadioGroupQuestionUIElement } from './ui-element.vue';
import { default as RadioGroupQuestionSetting } from './setting.vue';
import { ElementProvider } from '../../element-provider';

const RadioGroupQuestionType: AddableQuestion = {
  add: true,
  classList: ['page-element', 'question'],
  icon: ComponentRadioIcon,
  name: '单选',
  type: 'radioGroup'
};

const RadioGroupQuestionDataObjectGenerator = () => {
  return new RadioGroupQuestion(null, {
    title: '单选题'
  });
};

export const RadioGroupQuestionPlugin: QuestionPlugin = {
  install(): void {
    ElementProvider.registerElement(
      '选择',
      RadioGroupQuestionType,
      RadioGroupQuestionUIElement,
      RadioGroupQuestionSetting,
      RadioGroupQuestionDataObjectGenerator
    );
  }
};
