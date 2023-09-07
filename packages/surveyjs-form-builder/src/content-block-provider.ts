import { AbstractElement, Page, QuestionGroup, SingleTextQuestion } from 'free-survey-core';
import PageBlock from './content-blocks/page-block.vue';
import QuestionGroupBlock from './content-blocks/question-group-block.vue';
import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';
import type { AbstractQuestion } from 'free-survey-core';
import SingleTextInputBlock from './content-blocks/question-blocks/single-text-input-block.vue';
import type { AddableQuestionType } from './types/question-type-group';
export class ContentBlockProvider {
  private questionBlockMap: Map<QuestionType, Component> = new Map<QuestionType, Component>();

  constructor() {
    this.questionBlockMap.set('singleText', SingleTextInputBlock);
  }

  provideUIElement(element: AbstractElement) {
    if (element.type === 'page') {
      return PageBlock;
    }
    if (element.type === 'questionGroup') {
      return QuestionGroupBlock;
    }
    if (element.type === 'question') {
      const questionType = (element as AbstractQuestion).questionType;
      if (this.questionBlockMap.has(questionType)) {
        return this.questionBlockMap.get(questionType);
      }
      throw Error('找不到问题渲染实现！请检查是否注册此问题类型：' + questionType);
    }
    throw Error('找不到元素渲染实现！请检查是否注册此元素类型：' + element.type);
  }

  provideDataObject(type: AddableQuestionType) {
    switch (type) {
      case 'page':
        return new Page();
      case 'questionGroup':
        return new QuestionGroup();
      case 'singleText':
        return new SingleTextQuestion({});
    }
    throw Error('找不到页面元素添加方法！请检查是否注册此元素类型：' + type);
  }
}
