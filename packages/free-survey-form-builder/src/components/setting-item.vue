<template>
  <div class="setting-item">
    <div class="setting-item-title">{{ props.title }}</div>
    <div class="setting-item-value">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();
</script>

<style lang="less" scoped>
.setting-item {
  display: flex;
  align-items: start;
  margin-bottom: var(--space);

  .setting-item-title {
    flex: 0 0 6em;
    line-height: 24px;
  }

  .setting-item-value {
    flex: 1;
    display: flex;
    line-height: 24px;
    align-items: center;

    input {
      width: 100%;
      font-size: var(--font-size-smaller);
    }

    textarea {
      width: 100%;
      font-size: var(--font-size-smaller);
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
