import { AbstractElement } from 'free-survey-core';
import type { Component } from 'vue';
import type { QuestionType } from 'free-survey-core';
import type { AbstractQuestion } from 'free-survey-core';
import type { AddableQuestion, AddableQuestionType } from './types/question-type-group';
import type { AddableQuestionTypeCategory } from './types/question-type-group';
import {
  RadioGroupQuestionType,
  RadioGroupQuestionUIElement,
  RadioGroupQuestionSetting,
  RadioGroupQuestionDataObjectGenerator
} from './elements/radio-group-question';
import {
  SingleTextQuestionUIElement,
  SingleTextQuestionType,
  SingleTextQuestionDataObjectGenerator,
  SingleTextQuestionSetting
} from './elements/single-text-question';
import {
  QuestionBlockDataObjectGenerator,
  QuestionGroupBlockUIElement,
  QuestionGroupBlockType,
  QuestionGroupBlockSetting
} from './elements/question-group-block';
import {
  PageBlockDataObjectGenerator,
  PageBlockType,
  PageBlockUIElement,
  PageBlockSetting
} from './elements/page-block';

export class ElementProvider {
  private static elementBlockMap: Map<AddableQuestionType, Component> = new Map<
    QuestionType,
    Component
  >();
  private static elementBankCategories: Array<AddableQuestionTypeCategory> = [];
  private static elementTypesMap: Map<AddableQuestionType, string> = new Map<
    AddableQuestionType,
    string
  >();
  private static elementSettingMap: Map<AddableQuestionType, Component> = new Map<
    QuestionType,
    Component
  >();
  private static elementDataObject: Map<AddableQuestionType, () => AbstractElement> = new Map<
    AddableQuestionType,
    () => AbstractElement
  >();
  private static instance: ElementProvider | null = null;

  constructor() {
    if (ElementProvider.instance === null) {
      ElementProvider.initiate();
      ElementProvider.instance = this;
    }
    return ElementProvider.instance!;
  }

  static {
    if (ElementProvider.instance === null) {
      ElementProvider.initiate();
      ElementProvider.instance = this;
    }
  }

  private static initiate() {
    this.registerElement(
      '选择',
      RadioGroupQuestionType,
      RadioGroupQuestionUIElement,
      RadioGroupQuestionSetting,
      RadioGroupQuestionDataObjectGenerator
    );
    this.registerElement(
      '填空',
      SingleTextQuestionType,
      SingleTextQuestionUIElement,
      SingleTextQuestionSetting,
      SingleTextQuestionDataObjectGenerator
    );
    this.registerElement(
      '布局',
      PageBlockType,
      PageBlockUIElement,
      PageBlockSetting,
      PageBlockDataObjectGenerator
    );
    this.registerElement(
      '布局',
      QuestionGroupBlockType,
      QuestionGroupBlockUIElement,
      QuestionGroupBlockSetting,
      QuestionBlockDataObjectGenerator
    );
  }

  /**
   * 获取组件分类
   */
  public static getElementBankCategory() {
    return this.elementBankCategories;
  }

  /**
   * 注册组件分类
   * @param categoryName 组件分类名
   * @return number 要注册的分类的序号,当分类已存在时返回已存在的分类序号
   */
  public static registerElementBankCategory(categoryName: string) {
    const index = this.elementBankCategories.findIndex((c) => c.name === categoryName);
    if (index < 0) {
      return this.elementBankCategories.push({ name: categoryName, types: [] }) - 1;
    }
    return index;
  }

  /**
   * 注册组件题目类型
   * @param categoryName 组件分类名
   * @param elementType 组件题目信息
   */
  public static registerElementBankType(categoryName: string, elementType: AddableQuestion) {
    const index = this.registerElementBankCategory(categoryName);
    this.elementBankCategories[index].types.push(elementType);
    this.elementTypesMap.set(elementType.type, elementType.name);
  }

  /**
   * 注册组件名称
   * @param elementType 组件类型
   * @param name 组件名称
   */
  public static registerElementName(elementType: AddableQuestionType, name: string) {
    ElementProvider.elementTypesMap.set(elementType, name);
  }

  /**
   * 获取元素类型对应名称
   * @param elementType
   */
  public static provideElementName(elementType: AddableQuestionType) {
    return this.elementTypesMap.get(elementType);
  }

  /**
   * 注册组件呈现组件
   * @param questionType 组件类型
   * @param component 组件呈现
   */
  public static registerUIElement(questionType: AddableQuestionType, component: Component) {
    ElementProvider.elementBlockMap.set(questionType, component);
  }

  public static provideUIElement(element: AbstractElement) {
    if (Object.keys(element).findIndex((key) => key === 'add') >= 0) {
      return;
    }
    const questionType =
      element.type === 'question' ? (element as AbstractQuestion).questionType : element.type;
    if (ElementProvider.elementBlockMap.has(questionType)) {
      return ElementProvider.elementBlockMap.get(questionType);
    }
    throw Error('找不到组件渲染实现！请检查是否注册此组件类型：' + questionType);
  }

  public static registerDataObject(
    type: AddableQuestionType,
    objectGenerator: () => AbstractElement
  ) {
    this.elementDataObject.set(type, objectGenerator);
  }

  public static provideDataObject(type: AddableQuestionType) {
    if (!ElementProvider.elementDataObject.has(type)) {
      throw Error('找不到页面元素添加方法！请检查是否注册此元素类型：' + type);
    }
    const generator = ElementProvider.elementDataObject.get(type);
    if (!generator) {
      throw Error('页面元素添加方法无效！请检查此类型注册情况：' + type);
    }
    return generator();
  }

  /**
   * 注册问题的设置面板
   * @param questionType 问题类型
   * @param component 设置面板组件
   */
  public static registerElementSetting(questionType: AddableQuestionType, component: Component) {
    ElementProvider.elementSettingMap.set(questionType, component);
  }

  public static provideElementSetting(element: AbstractElement) {
    const type =
      element.type === 'question' ? (element as AbstractQuestion).questionType : element.type;
    if (!ElementProvider.elementSettingMap.has(type)) {
      throw Error('找不到该元素的设置面板！请确认是否正确注册：' + type);
    }
    return ElementProvider.elementSettingMap.get(type)!;
  }

  /**
   * 注册问题
   * @param categoryName 问题分类名称
   * @param element 问题分类信息
   * @param UIComponent 问题在问卷编辑区中的呈现组件
   * @param settingComponent 问题在问题设置区中的呈现组件
   * @param dataObjectGenerator 问题实际数据对象生成器
   */
  public static registerElement(
    categoryName: string,
    element: AddableQuestion,
    UIComponent: Component,
    settingComponent: Component,
    dataObjectGenerator: () => AbstractElement
  ) {
    ElementProvider.registerElementBankType(categoryName, element);
    ElementProvider.registerUIElement(element.type, UIComponent);
    ElementProvider.registerElementSetting(element.type, settingComponent);
    ElementProvider.registerElementName(element.type, element.name);
    ElementProvider.registerDataObject(element.type, dataObjectGenerator);
  }
}
