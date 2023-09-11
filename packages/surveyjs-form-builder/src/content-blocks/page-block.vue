<template>
  <element-with-operations-bar :element-id="currentPage.id" margin-right="var(--space-4)">
    <content-block-container class="page" @click.stop="EventBus.emit('focusElement', currentPage)">
      <div class="page-title">第{{ pageNumber + 1 }}页</div>

      <draggable
        :list="currentPage.elements"
        item-key="id"
        :group="group"
        ghostClass="dragging-ghost-element"
        drag-class="dragging-element"
        @change="onDragAdd"
        :key="refreshKey"
      >
        <template #item="{ element, index }">
          <component
            :is="blockProvider.provideUIElement(element)"
            v-model:element="currentPage.elements[index]"
            :groupNumber="index"
            class="page-element"
            :id="'FREE-SURVEY-' + element.id"
          ></component>
        </template>
      </draggable> </content-block-container
  ></element-with-operations-bar>
</template>

<script lang="ts" setup>
import ContentBlockContainer from './content-block-container.vue';
import { ContentBlockProvider } from '../content-block-provider';
import { AbstractPage, QuestionGroup, SingleTextQuestion } from 'free-survey-core';
import type { ChangeEvent } from 'vuedraggable';
import draggable from 'vuedraggable';
import type { AddableQuestion } from '../types/question-type-group';
import { computed } from 'vue';
import { useRefresh } from '../scripts/refresh';
import { EventBus } from '../scripts/event-bus';
import ElementWithOperationsBar from '../components/element-with-operations-bar.vue';

const props = defineProps<{
  page: AbstractPage;
  pageNumber: number;
}>();
const emits = defineEmits(['update:page']);
const blockProvider = new ContentBlockProvider();

const currentPage = computed({
  get() {
    return props.page;
  },
  set(value) {
    emits('update:page', value);
  }
});

//region draggable
const group = {
  name: 'questions',
  pull: true,
  put: function (toList: HTMLElement, fromList: HTMLElement, sourceElement: Element) {
    return sourceElement.classList.contains('page-element');
  }
};

const { refresh, refreshKey } = useRefresh();
const onDragAdd = (evt: ChangeEvent) => {
  if (evt.added && evt.added.element.add) {
    const addableElement = evt.added.element as AddableQuestion;
    if (addableElement.type === 'questionGroup') {
      currentPage.value.elements.splice(evt.added.newIndex, 1, new QuestionGroup());
    }
    if (addableElement.type === 'singleText') {
      currentPage.value.elements.splice(evt.added.newIndex, 1, new SingleTextQuestion({}));
    }
    refresh();
  }
};
//endregion
</script>

<style lang="less" scoped>
.page {
  padding-bottom: calc(var(--operations-bar-height) + var(--space-4));

  &:focus {
    outline: solid 1px deepskyblue;
  }
}
.page-title {
  margin-bottom: var(--space-2);
  margin-left: var(--space);
}
:deep(.page-element) {
  margin-top: var(--space-2);
}
</style>
