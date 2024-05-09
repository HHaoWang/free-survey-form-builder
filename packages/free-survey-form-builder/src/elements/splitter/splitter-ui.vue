<template>
  <element-with-operations-bar
    class="divider question"
    @click.stop="EventBus.emit('focusElement', currentQuestion)"
    margin-bottom="var(--space)"
    :element-id="currentQuestion.id"
  >
    <t-divider />
  </element-with-operations-bar>
</template>

<script lang="ts" setup>
import { type Ref, toRef } from 'vue';
import { Divider as TDivider } from 'tdesign-vue-next';
import ElementWithOperationsBar from '../../components/element-with-operations-bar.vue';
import { EventBus } from '../../scripts/event-bus';
import type { ElementProps } from '../../types/common';
import type { AbstractQuestion } from 'free-survey-core';
const props = defineProps<ElementProps>();
const currentQuestion = toRef(props, 'element') as Ref<AbstractQuestion>;
</script>

<style lang="less" scoped>
.divider {
  padding: var(--space) var(--space) var(--space-4);

  .t-divider {
    margin: 0;
  }
}
</style>
