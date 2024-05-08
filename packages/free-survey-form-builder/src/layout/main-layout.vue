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

  .builder-header {
    height: 27px;
    padding: 7px var(--space-3);
    background-color: white;
    border-bottom: 1px solid #eff1f4;
    border-top: 1px solid #eff1f4;
  }

  .builder-body {
    display: flex;
    width: 100%;
    max-height: calc(100vh - 43px);

    .left-side {
      width: 250px;
      background-color: white;
      padding: var(--space-3);
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
    }

    .content {
      flex: 1;
      padding: var(--space-4) var(--space-4) var(--space-2);
      overflow-y: scroll;
      box-sizing: border-box;
    }

    .right-side {
      width: 280px;
      background-color: white;
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
      padding: var(--space-3);
    }
  }
}
</style>
