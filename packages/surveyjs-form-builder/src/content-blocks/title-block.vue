<template>
  <content-block-container>
    <editable-text v-model:value='_title'></editable-text>
    <br />
    <editable-text v-model:value='_description'></editable-text>
  </content-block-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Input as TInput } from 'tdesign-vue-next';
import ContentBlockContainer from './content-block-container.vue';
import EditableText from '../components/editable-text.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['update:title', 'update:description']);

const _title = computed({
  get() {
    return props.title;
  },
  set(value) {
    emits('update:title', value);
  }
});

const _description = computed({
  get() {
    return props.description;
  },
  set(value) {
    emits('update:description', value);
  }
});
</script>

<style lang="less" scoped></style>
