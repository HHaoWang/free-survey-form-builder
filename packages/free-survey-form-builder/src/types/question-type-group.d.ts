import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';

export interface AddableQuestionTypeCategory {
  name: string;
  types: Array<AddableQuestion>;
}

export type QuestionLevel = 'page' | 'page-element' | 'question';
export type AddableQuestionType = QuestionType | ('page' | 'questionGroup') | string;

export interface AddableQuestion {
  name: string;
  icon: Component;
  classList: [QuestionLevel, ...QuestionLevel[]];
  add?: boolean;
  type: AddableQuestionType;
}

export interface QuestionPlugin {
  install(): void;
}
