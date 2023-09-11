<template>
  <div
    class="element-with-operations-bar"
    @mouseenter="showOperationsBar = true"
    @mouseleave="showOperationsBar = false"
  >
    <div class="operations" v-show="showOperationsBar" :style="style">
      <DeleteIcon @click="onClickDelete" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { DeleteIcon } from 'tdesign-icons-vue-next';
import { EventBus } from '../scripts/event-bus';
import { computed, ref } from 'vue';
const props = defineProps<{
  elementId?: string;
  marginRight?: string;
  marginBottom?: string;
}>();
const onClickDelete = () => {
  EventBus.emit('deleteElement', props.elementId ?? null);
};
const showOperationsBar = ref(false);
const style = computed(() => {
  return {
    right: props.marginRight ?? 'var(--space-2)',
    bottom: props.marginBottom ?? 'var(--space-2)'
  };
});
</script>

<style lang="less" scoped>
.element-with-operations-bar {
  position: relative;

  .operations {
    position: absolute;
    height: var(--operations-bar-height);
    line-height: var(--operations-bar-height);

    * {
      cursor: pointer;
    }
  }
}
</style>
