import type { App, Plugin } from 'vue';

import { SurveyjsFormBuilder } from './surveyjs-form-builder';

const SurveyjsFormBuilderPlugin: Plugin = {
  install(app: App) {
    app.component('free-survey-form-builder', SurveyjsFormBuilder);
  }
};

export default SurveyjsFormBuilderPlugin;

export * from './surveyjs-form-builder';
