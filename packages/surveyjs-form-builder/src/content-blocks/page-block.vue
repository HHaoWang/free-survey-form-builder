<template>
  <content-block-container>
    <div class="page-title">第{{ pageNumber + 1 }}页</div>

    <draggable
      :list="currentPage.elements"
      item-key="id"
      :group="group"
      ghostClass="dragging-ghost-element"
      drag-class="dragging-element"
      @change="onAdd"
      :key="refreshKey"
    >
      <template #item="{ element, index }">
        <component
          :is="blockProvider.provide(element)"
          v-model:element="currentPage.elements[index]"
          :groupNumber="index"
          class="page-element"
        ></component>
      </template>
    </draggable>
  </content-block-container>
</template>

<script lang="ts" setup>
import ContentBlockContainer from './content-block-container.vue';
import { ContentBlockProvider } from '../content-block-provider';
import { AbstractPage, QuestionGroup, SingleTextQuestion } from 'free-survey-core';
import type { ChangeEvent } from 'vuedraggable';
import draggable from 'vuedraggable';
import type { AddableQuestionType } from '../types/question-type-group';
import { computed, ref } from 'vue';

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
    console.log(1);
    emits('update:page', value);
  }
});

const group = {
  name: 'questions',
  pull: true,
  put: function (toList: HTMLElement, fromList: HTMLElement, sourceElement: Element) {
    return sourceElement.classList.contains('page-element');
  }
};

const refreshKey = ref(0);
const onAdd = (evt: ChangeEvent) => {
  if (evt.added && evt.added.element.add) {
    const addableElement = evt.added.element as AddableQuestionType;
    if (addableElement.type === 'questionGroup') {
      currentPage.value.elements.splice(evt.added.newIndex, 1, new QuestionGroup());
    }
    if (addableElement.type === 'singleText') {
      currentPage.value.elements.splice(evt.added.newIndex, 1, new SingleTextQuestion({}));
    }
    refreshKey.value++;
  }
};
</script>

<style lang="less" scoped>
.page-title {
  margin-bottom: var(--space-2);
}
.page-element {
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
