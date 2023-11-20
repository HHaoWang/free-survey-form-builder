import type { App, Component, Plugin } from 'vue';

import { FreeSurveyFormBuilder } from './free-survey-form-builder';

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

export default FreeSurveyFormBuilderPlugin;

