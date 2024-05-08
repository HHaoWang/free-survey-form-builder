<template>
  <element-with-operations-bar
    :element-id="currentQuestion.id"
    @click.stop="EventBus.emit('focusElement', currentQuestion)"
    class="basic-question-element question"
  >
    <div class="left">
      <span class="is-required" v-if="currentQuestion.isRequired">*</span>{{ groupNumber + 1 }}.
    </div>
    <div class="right">
      <slot />
    </div>
  </element-with-operations-bar>
</template>

<script lang="ts" setup>
import { type Ref, toRef } from 'vue';
import { EventBus } from '../scripts/event-bus';
import ElementWithOperationsBar from './element-with-operations-bar.vue';
import type { ElementEmits, ElementProps } from '../types/common';
import type { AbstractQuestion } from 'free-survey-core';

const props = defineProps<ElementProps>();
const currentQuestion = toRef(props, 'element') as Ref<AbstractQuestion>;
</script>

<style lang="less" scoped>
.basic-question-element {
  padding: var(--space-2) var(--space-2) var(--space-2) 0;
  border-radius: 4px;
  display: flex;
  position: relative;

  .left {
    flex: 0 0 2em;
    line-height: 30px;
    border: dashed 1px transparent;
    font-size: 14px;
    text-align: right;
    color: var(--serial-number-color);

    .is-required {
      color: red;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
