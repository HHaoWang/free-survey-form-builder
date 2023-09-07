import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';

export interface AddableQuestionTypeCategory {
  name: string;
  types: Array<AddableQuestion>;
}

export type AddableQuestionType = QuestionType | ('page' | 'questionGroup');

export interface AddableQuestion {
  name: string;
  icon: Component;
  classList?: Array<string>;
  add?: boolean;
  type: AddableQuestionType;
}
