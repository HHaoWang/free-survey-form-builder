<template>
  <div
    class="element-with-operations-bar"
    @mouseenter="showOperationsBar = true"
    @mouseleave="showOperationsBar = false"
  >
    <div class="operations" v-show="showOperationsBar" :style="style">
      <Move1Icon class="move-icon" />
      <DeleteIcon @click="onClickDelete" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { DeleteIcon, Move1Icon } from 'tdesign-icons-vue-next';
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

  &:hover:not(.focused) {
    outline: dashed 1px deepskyblue;
  }

  &:hover .operations {
    display: block;
  }

  .operations {
    position: absolute;
    height: var(--operations-bar-height);
    line-height: var(--operations-bar-height);
    z-index: 999;

    * {
      cursor: pointer;
    }
    * + * {
      margin-left: var(--space);
    }
  }
}
</style>
