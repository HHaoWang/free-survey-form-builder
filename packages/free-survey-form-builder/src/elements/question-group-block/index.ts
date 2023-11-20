import type { AddableQuestion } from '../../types/question-type-group';
import { RootListIcon } from 'tdesign-icons-vue-next';
import { QuestionGroup } from 'free-survey-core';

export { default as QuestionGroupBlockUIElement } from './question-group-block.vue';
export { default as QuestionGroupBlockSetting } from './question-group-setting.vue';

export const QuestionGroupBlockType: AddableQuestion = {
  name: '题组',
  icon: RootListIcon,
  type: 'questionGroup',
  classList: ['page-element'],
  add: true
};

export const QuestionBlockDataObjectGenerator = () => {
  return new QuestionGroup();
};
