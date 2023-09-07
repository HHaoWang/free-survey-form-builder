<template>
  <content-block-container tabindex="0" class="page" @blur="onBlur">
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
          :is="blockProvider.provideUIElement(element)"
          v-model:element="currentPage.elements[index]"
          :groupNumber="index"
          class="page-element"
          @addNewPageElement="
            (type:AddableQuestionType) => {
              onAddNewPageElement(index, type);
            }
          "
        ></component>
      </template>
    </draggable>
  </content-block-container>
</template>

<script lang="ts" setup>
import ContentBlockContainer from './content-block-container.vue';
import { ContentBlockProvider } from '../content-block-provider';
import {
  AbstractPage,
  AbstractPageElement,
  QuestionGroup,
  SingleTextQuestion
} from 'free-survey-core';
import type { ChangeEvent } from 'vuedraggable';
import draggable from 'vuedraggable';
import type { AddableQuestion, AddableQuestionType } from '../types/question-type-group';
import { computed, ref } from 'vue';

const props = defineProps<{
  page: AbstractPage;
  pageNumber: number;
}>();
const emits = defineEmits(['update:page', 'addNewPage']);
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
    const addableElement = evt.added.element as AddableQuestion;
    if (addableElement.type === 'questionGroup') {
      currentPage.value.elements.splice(evt.added.newIndex, 1, new QuestionGroup());
    }
    if (addableElement.type === 'singleText') {
      currentPage.value.elements.splice(evt.added.newIndex, 1, new SingleTextQuestion({}));
    }
    refreshKey.value++;
  }
};

const onBlur = (event: FocusEvent) => {
  if (!event.relatedTarget) return;
  if (!(event.relatedTarget as HTMLElement).classList.contains('addable-survey-element')) {
    return;
  }
  const needAddedElementType: AddableQuestionType | undefined = (event.relatedTarget as HTMLElement)
    .dataset.type as AddableQuestionType | undefined;
  if (!needAddedElementType) return;
  if (needAddedElementType === 'page') {
    emits('addNewPage');
    return;
  }
  const needAddedElement = blockProvider.provideDataObject(
    needAddedElementType
  ) as AbstractPageElement;
  currentPage.value.elements.push(needAddedElement);
};

const onAddNewPageElement = (afterIndex: number, type: AddableQuestionType) => {
  currentPage.value.elements.splice(
    afterIndex + 1,
    0,
    blockProvider.provideDataObject(type) as AbstractPageElement
  );
};
</script>

<style lang="less" scoped>
.page {
  &:focus {
    outline: solid 1px deepskyblue;
  }
}
.page-title {
  margin-bottom: var(--space-2);
  margin-left: var(--space);
}
:deep(.page-element) {
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
