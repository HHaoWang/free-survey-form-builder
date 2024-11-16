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
  overflow-y: hidden;

  .builder-header {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    height: var(--header-height);
    box-sizing: border-box;
    padding: var(--header-padding-top) var(--space-3) var(--header-padding-bottom);
    background-color: white;
    border-bottom: 1px solid #eff1f4;
    border-top: 1px solid #eff1f4;
  }

  .builder-body {
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 0;
    overflow-y: auto;
    flex-direction: row;

    .left-side {
      width: 250px;
      flex-shrink: 0;
      background-color: white;
      padding: var(--space-3);
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
      overflow-y: auto;
    }

    .content {
      flex-grow: 1;
      padding: var(--space-4) var(--space-4) var(--space-2);
      overflow-y: scroll;
      min-width: 640px;
    }

    .right-side {
      width: 280px;
      flex-shrink: 0;
      background-color: white;
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
      padding: var(--space-3);
      overflow-y: auto;
    }
  }
}
</style>
