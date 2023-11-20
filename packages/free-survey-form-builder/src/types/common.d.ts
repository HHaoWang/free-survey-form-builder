import { AbstractElement } from 'free-survey-core';

export type ElementProps = {
  element: AbstractElement;
  groupNumber: number;
};

export type ElementEmits = {
  (e: 'update:element', element: AbstractElement);
};

export type SettingElementProps = {
  settingElement: AbstractElement;
};

export type SettingElementEmits = {
  (e: 'update:settingElement', element: AbstractElement);
};

export type DataObjectGenerator = () => AbstractElement;
