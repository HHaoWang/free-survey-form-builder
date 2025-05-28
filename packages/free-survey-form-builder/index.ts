import FreeSurveyFormBuilder from './src/index.vue';
import type { App, Component, Plugin } from 'vue';

const components: { [key: string]: Component } = {
  FreeSurveyFormBuilder
};

const FreeSurveyFormBuilderPlugin: Plugin<[]> = {
  install(app: App) {
    Object.keys(components).forEach((item) => {
      app.component(item, components[item]);
    });
  }
};

export { FreeSurveyFormBuilder, FreeSurveyFormBuilderPlugin };
export { PageBlockPlugin } from './src/elements/page-block';
export { QuestionGroupPlugin } from './src/elements/question-group-block';
export { SingleTextQuestionPlugin } from './src/elements/single-text-question';
export { RadioGroupQuestionPlugin } from './src/elements/radio-group-question';
export { DropdownQuestionPlugin } from './src/elements/dropdown-question';
export { CheckBoxQuestionPlugin } from './src/elements/check-box-question';
export { FileQuestionPlugin } from './src/elements/file-question';
export { SplitterPlugin } from './src/elements/splitter';
export type {
  QuestionPlugin,
  AddableQuestion,
  AddableQuestionType,
  AddableQuestionTypeCategory,
  QuestionLevel
} from './src/types/question-type-group';
export type {
  SettingElementProps,
  SettingElementEmits,
  ElementProps,
  ElementEmits,
  DataObjectGenerator
} from './src/types/common';
export { ElementProvider } from './src/element-provider';
