<template>
  <div>
    <div v-if="!focused" @click="focused = true" class="text-area">{{ currentValue }}</div>
    <div v-else><t-input @blur="focused = false" ref="input" v-model="currentValue"></t-input></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { Input as TInput } from 'tdesign-vue-next';

const props = defineProps<{
  value: string;
}>();

const emits = defineEmits(['update:value']);

const currentValue = computed({
  get() {
    return props.value;
  },
  set(newVal) {
    emits('update:value', newVal);
  }
});

const focused = ref(false);
const input = ref<HTMLElement | null>(null);
watch(focused, (newVal) => {
  if (newVal) {
    nextTick(() => {
      input.value?.focus();
    });
  }
});
</script>

<style lang="less" scoped>
.text-area {
  border: dashed 1px transparent;
  line-height: 32px;
  cursor: text;

  &:hover {
    border: dashed 1px #d6d6d6;
  }
}
</style>
