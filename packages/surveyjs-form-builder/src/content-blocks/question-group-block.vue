<template>
  <element-with-operations-bar
    :element-id="currentElement.id"
    class="question-group"
    @click.stop="EventBus.emit('focusElement', currentElement)"
  >
    <div class="title">
      <div class="left">{{ groupNumber + 1 }}.</div>
      <div class="right">题组</div>
    </div>

    <draggable
      :list="currentElement.questions"
      item-key="id"
      :group="group"
      ghostClass="dragging-ghost-element"
      drag-class="dragging-element"
      @change="onDragAdd"
      :key="refreshKey"
      class="draggable-list"
    >
      <template #item="{ element, index }">
        <component
          :is="blockProvider.provideUIElement(element)"
          :id="'FREE-SURVEY-' + element.id"
          v-model:element="currentElement.questions[index]"
          :groupNumber="index"
          class="page-element"
        ></component>
      </template>
    </draggable>
  </element-with-operations-bar>
</template>

<script lang="ts" setup>
import { QuestionGroup, SingleTextQuestion } from 'free-survey-core';
import { ContentBlockProvider } from '../content-block-provider';
import { computed } from 'vue';
import type { ChangeEvent } from 'vuedraggable';
import draggable from 'vuedraggable';
import type { AddableQuestion } from '../types/question-type-group';
import { useRefresh } from '../scripts/refresh';
import { EventBus } from '../scripts/event-bus';
import ElementWithOperationsBar from '../components/element-with-operations-bar.vue';

const props = defineProps<{
  element: QuestionGroup;
  groupNumber: number;
}>();
const emits = defineEmits(['update:element']);

const currentElement = computed({
  get() {
    return props.element;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});

//region draggable
const group = {
  name: 'questions',
  pull: true,
  put: function (toList: HTMLElement, fromList: HTMLElement, sourceElement: Element) {
    return sourceElement.classList.contains('question');
  }
};
const { refresh, refreshKey } = useRefresh();
const onDragAdd = (evt: ChangeEvent) => {
  if (evt.added && evt.added.element.add) {
    const addableElement = evt.added.element as AddableQuestion;
    if (addableElement.type === 'singleText') {
      currentElement.value.questions.splice(evt.added.newIndex, 1, new SingleTextQuestion({}));
    }
    refresh();
  }
};
//endregion

const blockProvider = new ContentBlockProvider();
</script>

<style lang="less" scoped>
.question-group {
  outline: dashed 1px #d6d6d6;
  min-height: 80px;
  padding: var(--space-2) 0 calc(var(--space-4) + 21px);
  border-radius: 4px;
  position: relative;

  .title {
    font-size: 14px;
    display: flex;

    .left {
      flex: 0 0 2em;
      text-align: right;
      color: var(--serial-number-color);
    }

    .right {
      flex: 1;
      margin-left: var(--space);
    }
  }
  &:focus {
    border: solid 1px deepskyblue;
  }
}

.draggable-list {
  min-height: 50px;
  margin: 0 var(--space-2);
}
</style>
