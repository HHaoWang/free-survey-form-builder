import type { AddableQuestion } from '../../types/question-type-group';
import { ComponentDropdownIcon } from 'tdesign-icons-vue-next';
import type { DataObjectGenerator } from '../../types/common';
import { DropdownQuestion } from 'free-survey-core';
import { ElementProvider } from '../../element-provider';
import DropdownQuestionUI from './dropdown-question-ui.vue';
import DropdownQuestionSettingUI from './dropdown-question-setting-ui.vue';

const DropdownQuestionType: AddableQuestion = {
  add: true,
  classList: ['page-element', 'question'],
  icon: ComponentDropdownIcon,
  name: '下拉',
  type: 'dropdown'
};

const DropdownQuestionDataObjectGenerator: DataObjectGenerator = () => {
  return new DropdownQuestion(null, {
    title: '下拉题'
  });
};

export const DropdownQuestionPlugin = {
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '选择';
    ElementProvider.registerElement(
      categoryName,
      DropdownQuestionType,
      DropdownQuestionUI,
      DropdownQuestionSettingUI,
      DropdownQuestionDataObjectGenerator
    );
  }
};
