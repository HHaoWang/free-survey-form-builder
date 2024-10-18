<template>
  <div class="main-layout">
    <div class="builder-header" v-if="props.showHeader">
      <slot name="header"></slot>
    </div>
    <div class="builder-body">
      <div class="left-side">
        <slot name="left-side"></slot>
      </div>
      <div class="content" @click="EventBus.emit('focusElement', null)">
        <slot name="content"></slot>
      </div>
      <div class="right-side">
        <slot name="right-side"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EventBus } from '../scripts/event-bus';

const props = defineProps<{
  showHeader?: boolean;
}>();
</script>

<style lang="less" scoped>
.main-layout {
  height: 100%;
  width: 100%;
  max-height: 100vh;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  .builder-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--header-height);
    padding: var(--header-padding-top) var(--space-3) var(--header-padding-bottom);
    background-color: white;
    border-bottom: 1px solid #eff1f4;
    border-top: 1px solid #eff1f4;
  }

  .builder-body {
    flex-grow: 1;
    display: flex;
    width: 100%;
    min-height: fit-content;
    overflow-x: auto;
    align-items: stretch;

    .left-side {
      width: 250px;
      flex-shrink: 0;
      background-color: white;
      padding: var(--space-3);
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
    }

    .content {
      flex-grow: 1;
      padding: var(--space-4) var(--space-4) var(--space-2);
      overflow-y: scroll;
      box-sizing: border-box;
      min-width: 640px;
    }

    .right-side {
      width: 280px;
      flex-shrink: 0;
      background-color: white;
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
      padding: var(--space-3);
    }
  }
}
</style>
