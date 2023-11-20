<template>
  <div>
    <div class="setting-item">
      <div class="setting-item-title">题组名称</div>
      <div class="setting-item-value">
        <t-input v-model="currentQuestionGroup.title" size="small"></t-input>
      </div>
    </div>
    <div class="setting-item">
      <div class="setting-item-title">题组描述</div>
      <div class="setting-item-value">
        <t-textarea v-model="currentQuestionGroup.description"></t-textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Input as TInput, Textarea as TTextarea } from 'tdesign-vue-next';
import type { AbstractElement, AbstractQuestionGroup } from 'free-survey-core';

const props = defineProps<{
  settingElement: AbstractElement;
}>();
const emits = defineEmits(['update:settingElement']);
const currentQuestionGroup = computed({
  get() {
    return props.settingElement as AbstractQuestionGroup;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});
</script>

<style lang="less" scoped></style>
