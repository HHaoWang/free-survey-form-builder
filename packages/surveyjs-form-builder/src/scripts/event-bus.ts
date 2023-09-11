import mitt from 'mitt';
import type { AbstractElement } from 'free-survey-core';
export type Event = {
  deleteElement: string | null;
  focusElement: AbstractElement | null;
};
export const EventBus = mitt<Event>();
