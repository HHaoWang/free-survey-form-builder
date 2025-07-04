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
      <div class="setting-item">
        <div class="setting-item-title">组件ID</div>
        <div class="setting-item-value">{{ currentElement.id }}</div>
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
  height: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
  color: var(--td-text-color-primary);

  .title {
    line-height: 2em;
    margin-bottom: var(--space);
  }

  .empty-status {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    user-select: text;
  }
}
}
</style>
