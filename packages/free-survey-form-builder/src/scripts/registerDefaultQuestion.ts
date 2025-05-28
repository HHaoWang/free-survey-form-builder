import { PageBlockPlugin } from '../elements/page-block';
import { QuestionGroupPlugin } from '../elements/question-group-block';
import { SingleTextQuestionPlugin } from '../elements/single-text-question';
import { RadioGroupQuestionPlugin } from '../elements/radio-group-question';
import { CheckBoxQuestionPlugin } from '../elements/check-box-question';
import { DropdownQuestionPlugin } from '../elements/dropdown-question';
import { SplitterPlugin } from '../elements/splitter';
import { FileQuestionPlugin } from '../elements/file-question';

export function registerDefaultQuestion() {
  SingleTextQuestionPlugin.install();
  RadioGroupQuestionPlugin.install();
  PageBlockPlugin.install();
  QuestionGroupPlugin.install();
  CheckBoxQuestionPlugin.install();
  DropdownQuestionPlugin.install();
  SplitterPlugin.install();
  FileQuestionPlugin.install();
}
