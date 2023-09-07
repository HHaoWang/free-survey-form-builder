<template>
  <div class="question-group" tabindex="0" @blur="onBlur">
    <div class="title">{{ groupNumber + 1 }}&nbsp;&nbsp; 题组</div>

    <draggable
      :list="currentElement.questions"
      item-key="id"
      :group="group"
      ghostClass="dragging-ghost-element"
      drag-class="dragging-element"
      @change="onAdd"
      :key="refreshKey"
      class="draggable-list"
    >
      <template #item="{ element, index }">
        <component
          :is="blockProvider.provideUIElement(element)"
          v-model:element="currentElement.questions[index]"
          :groupNumber="index"
          class="page-element"
          @addNewPageElement="
            (type:AddableQuestionType) => {
              onAddNewQuestion(index, type);
            }
          "
        ></component>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { AbstractQuestion, QuestionGroup, SingleTextQuestion } from 'free-survey-core';
import { ContentBlockProvider } from '../content-block-provider';
import { computed } from 'vue';
import type { ChangeEvent } from 'vuedraggable';
import draggable from 'vuedraggable';
import { ref } from 'vue';
import type { AddableQuestion } from '../types/question-type-group';
import type { AddableQuestionType } from '../types/question-type-group';

const props = defineProps<{
  element: QuestionGroup;
  groupNumber: number;
}>();
const emits = defineEmits(['update:element', 'addNewPageElement']);

const currentElement = computed({
  get() {
    return props.element;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});

const group = {
  name: 'questions',
  pull: true,
  put: function (toList: HTMLElement, fromList: HTMLElement, sourceElement: Element) {
    return sourceElement.classList.contains('question');
  }
};
const refreshKey = ref(0);
const onAdd = (evt: ChangeEvent) => {
  if (evt.added && evt.added.element.add) {
    const addableElement = evt.added.element as AddableQuestion;
    if (addableElement.type === 'singleText') {
      currentElement.value.questions.splice(evt.added.newIndex, 1, new SingleTextQuestion({}));
    }
    refreshKey.value++;
  }
};

const blockProvider = new ContentBlockProvider();

const onBlur = (event: FocusEvent) => {
  if (!event.relatedTarget) return;
  if (!(event.relatedTarget as HTMLElement).classList.contains('addable-survey-element')) {
    return;
  }
  const needAddedElementType: AddableQuestionType | undefined = (event.relatedTarget as HTMLElement)
    .dataset.type as AddableQuestionType | undefined;
  if (!needAddedElementType || needAddedElementType === 'page') return;
  if (needAddedElementType === 'questionGroup') {
    const type: AddableQuestionType = 'questionGroup';
    emits('addNewPageElement', type);
    return;
  }
  const needAddedElement = blockProvider.provideDataObject(
    needAddedElementType
  ) as AbstractQuestion;
  currentElement.value.questions.push(needAddedElement);
};

const onAddNewQuestion = (afterIndex: number, type: AddableQuestionType) => {
  if (type === 'questionGroup' || type === 'page') return;
  currentElement.value.questions.splice(
    afterIndex + 1,
    0,
    blockProvider.provideDataObject(type) as AbstractQuestion
  );
};
</script>

<style lang="less" scoped>
.question-group {
  border: dashed 1px #d6d6d6;
  min-height: 80px;
  padding: var(--space-2);
  border-radius: 4px;

  .title {
    font-size: 14px;
  }
  &:focus {
    border: solid 1px deepskyblue;
  }
}

.draggable-list {
  min-height: 50px;
}
</style>
