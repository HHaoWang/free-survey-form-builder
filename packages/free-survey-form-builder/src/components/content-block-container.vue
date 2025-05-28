<template>
  <div class="content-block-container"><slot></slot></div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.content-block-container {
  background-color: var(--td-bg-color-container);
  border-radius: 4px;
  padding: var(--space-4);
  box-shadow: 0 0 10px 0 rgba(78, 89, 105, 0.1);
  margin-bottom: var(--space-2);
  color: var(--td-text-color-primary);
}
</style>
