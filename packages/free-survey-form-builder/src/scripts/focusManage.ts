import { onMounted, ref, watch } from 'vue';
import { AbstractElement } from 'free-survey-core';
import { EventBus } from './event-bus';

export const useFocusManage = () => {
  const focusedElement = ref<AbstractElement | null>(null);
  let styleSheet: CSSStyleSheet | null = null;
  onMounted(() => {
    styleSheet = (
      document.getElementById('free-survey-form-builder-style-sheet') as HTMLStyleElement
    ).sheet;
  });
  let addedStyleIndex: number | undefined = 0;
  watch(
    () => focusedElement.value,
    (newVal, oldValue) => {
      if (oldValue !== null) {
        if (addedStyleIndex !== undefined) {
          styleSheet?.deleteRule(addedStyleIndex);
        }
      }
      if (newVal !== null) {
        addedStyleIndex = styleSheet?.insertRule(
          `#FREE-SURVEY-${newVal.id} {outline:solid 1px deepskyblue;}`,
          0
        );
      }
    }
  );
  EventBus.on('focusElement', (newFocusedElement: AbstractElement | null) => {
    focusedElement.value = newFocusedElement;
  });

  return { focusedElement };
};
