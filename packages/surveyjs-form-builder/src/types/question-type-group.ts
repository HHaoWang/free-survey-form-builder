import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';

export interface AddableQuestionTypeCategory {
  name: string;
  types: Array<AddableQuestionType>;
}

export interface AddableQuestionType {
  name: string;
  icon: Component;
  classList?: Array<string>;
  add?: boolean;
  type: QuestionType | ('page' | 'questionGroup');
}
