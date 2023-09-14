import { AbstractElement } from 'free-survey-core';

export type ElementProps = {
  element: AbstractElement;
  groupNumber: number;
};

export type ElementEmits = {
  (e: 'update:element', element: AbstractElement);
};
