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
export { ElementProvider } from './src/element-provider';
