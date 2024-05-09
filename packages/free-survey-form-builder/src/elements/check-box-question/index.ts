import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { ComponentCheckboxIcon } from 'tdesign-icons-vue-next';
import { CheckBoxQuestion } from 'free-survey-core';
import { ElementProvider } from '../../element-provider';
import CheckBoxQuestionUI from './check-box-question-ui.vue';
import CheckBoxQuestionSettingUI from './check-box-question-setting-ui.vue';
const CheckBoxQuestionType: AddableQuestion = {
  add: true,
  classList: ['page-element', 'question'],
  icon: ComponentCheckboxIcon,
  name: '多选',
  type: 'checkbox'
};

const CheckBoxQuestionDataObjectGenerator = () => {
  return new CheckBoxQuestion(null, {
    title: '多选题'
  });
};

export const CheckBoxQuestionPlugin: QuestionPlugin = {
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '选择';
    ElementProvider.registerElement(
      categoryName,
      CheckBoxQuestionType,
      CheckBoxQuestionUI,
      CheckBoxQuestionSettingUI,
      CheckBoxQuestionDataObjectGenerator
    );
  }
};
