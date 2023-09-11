<template>
  <div class="main-layout">
    <div class="builder-header">
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
</script>

<style lang="less" scoped>
.main-layout {
  height: 100%;
  width: 100%;
  background-color: var(--background-color);

  .builder-header {
    height: 27px;
    padding: 7px var(--space-3);
    background-color: white;
    border-bottom: 1px solid #eff1f4;
    border-top: 1px solid #eff1f4;
  }

  .builder-body {
    height: calc(100% - 41px - 2px);
    position: relative;
    display: inline-block;
    width: 100%;

    .left-side {
      width: calc(258px - var(--space-3) * 2);
      height: calc(100% - var(--space-3) * 2);
      background-color: white;
      position: absolute;
      left: 0;
      top: 0;
      padding: var(--space-3);
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
    }

    .content {
      width: calc(100% - 260px - 260px);
      padding: 0 var(--space-4);
      margin: var(--space-4) auto 0;
      height: calc(100% - 43px);
      overflow-y: scroll;
      box-sizing: border-box;
    }

    .right-side {
      width: 258px;
      height: 100%;
      background-color: white;
      position: absolute;
      right: 0;
      top: 0;
      border-left: 1px solid #eff1f4;
      border-right: 1px solid #eff1f4;
    }
  }
}
</style>
