import { PageBlockPlugin } from '../elements/page-block';
import { QuestionGroupPlugin } from '../elements/question-group-block';
import { SingleTextQuestionPlugin } from '../elements/single-text-question';
import { RadioGroupQuestionPlugin } from '../elements/radio-group-question';

export function registerDefaultQuestion() {
  SingleTextQuestionPlugin.install();
  RadioGroupQuestionPlugin.install();
  PageBlockPlugin.install();
  QuestionGroupPlugin.install();
}
