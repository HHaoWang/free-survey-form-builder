<template>
  <div class="question-group">
    题组{{ groupNumber + 1 }}
    <component
      v-for="(question, index) in currentElement.questions"
      :key="question.id"
      :is="blockProvider.provide(question)"
      v-model:element="currentElement.questions[index]"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import { QuestionGroup } from 'free-survey-core';
import { ContentBlockProvider } from '../content-block-provider';
import { computed } from 'vue';
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

const blockProvider = new ContentBlockProvider();
</script>

<style lang="less" scoped>
.question-group {
  border: dashed 1px #d6d6d6;
}
</style>
