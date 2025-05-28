import type { AddableQuestion, QuestionPlugin } from '../../types/question-type-group';
import { UploadIcon } from 'tdesign-icons-vue-next';
import { FileQuestion } from 'free-survey-core';
import type { DataObjectGenerator } from '../../types/common';
import { ElementProvider } from '../../element-provider';

import { default as FileQuestionUIElement } from './file-question-ui.vue';
import { default as FileQuestionSetting } from './file-question-setting-ui.vue';

const FileQuestionType: AddableQuestion = {
  name: '文件',
  icon: UploadIcon,
  type: 'file',
  classList: ['page-element', 'question'],
  add: true
};

const FileQuestionDataObjectGenerator: DataObjectGenerator = () => {
  return new FileQuestion(null,{
    maxFileCount: 1,
    maxFileSize: 10 * 1024 * 1024, // 默认最大文件大小为10MB
  });
};

export const FileQuestionPlugin: QuestionPlugin = {
  install(categoryName: string | undefined = undefined): void {
    categoryName ??= '其它';
    ElementProvider.registerElement(
      categoryName,
      FileQuestionType,
      FileQuestionUIElement,
      FileQuestionSetting,
      FileQuestionDataObjectGenerator
    );
  }
};
