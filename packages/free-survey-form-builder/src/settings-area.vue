<template>
  <div class="setting-area">
    <div class="title">题目设置</div>
    <div v-if="currentElement === null" class="empty-status">
      <img src="./assets/empty.svg" alt="no focused element" />
      暂未选中任何组件
    </div>
    <div v-else class="settings">
      <div class="setting-item">
        <div class="setting-item-title">组件类型</div>
        <div class="setting-item-value">{{ elementTypeName }}</div>
      </div>
      <t-divider />
      <component
        :is="ElementProvider.provideElementSetting(currentElement)"
        v-model:settingElement="currentElement"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Divider as TDivider } from 'tdesign-vue-next';
import type { AbstractElement, AbstractQuestion } from 'free-survey-core';
import { ElementProvider } from './element-provider';

const props = defineProps<{
  element: (AbstractElement & { [key: string]: any }) | null;
}>();
const emits = defineEmits(['update:element']);

const currentElement = computed({
  get() {
    return props.element;
  },
  set(value) {
    emits('update:element', value);
  }
});

const elementTypeName = computed(() => {
  if (currentElement.value === null) {
    return '';
  }
  const type =
    currentElement.value?.type === 'question'
      ? (currentElement.value as AbstractQuestion).questionType
      : currentElement.value.type;
  return ElementProvider.provideElementName(type);
});
</script>

<style lang="less" scoped>
.setting-area {
  min-height: 100%;
  --td-brand-color: var(--theme-primary-color);
  user-select: none;

  .title {
    line-height: 2em;
    margin-bottom: var(--space);
  }

  .empty-status {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(45%);
    color: var(--font-color-secondnary);
    font-size: var(--font-size-small);

    img {
      width: 80%;
    }
  }

  .settings {
    margin-top: var(--space);
    font-size: var(--font-size-smaller);

    .subtitle {
      font-size: var(--font-size-small);
    }
  }
}
</style>
