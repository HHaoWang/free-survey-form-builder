<template>
  <div>
    <div v-show="!focused" @click="focused = true" class="text-area" :style="style">
      {{ currentValue }}
    </div>
    <div v-show="focused">
      <t-input
        @blur="focused = false"
        @click.stop=""
        ref="input"
        v-model="currentValue"
        :style="style"
      ></t-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { Input as TInput } from 'tdesign-vue-next';

const props = defineProps<{
  value: string;
  fontSize?: string;
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

const style = computed(() => {
  if (!props.fontSize?.includes('!important')) {
    return {
      fontSize: props.fontSize + ' !important'
    };
  }
  return {
    fontSize: props.fontSize
  };
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
  line-height: 30px;
  cursor: text;
  font-size: 14px;
  padding-left: var(--space);

  &:hover {
    border: dashed 1px #d6d6d6;
  }
}
</style>
