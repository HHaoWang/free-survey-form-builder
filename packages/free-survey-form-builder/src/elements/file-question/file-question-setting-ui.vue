<template>
  <div>
    <setting-item title="问题">
      <t-input v-model="currentQuestion.title" size="small" />
    </setting-item>

    <setting-item title="问题描述">
      <t-textarea v-model="currentQuestion.description" />
    </setting-item>

    <setting-item title="必填">
      <t-switch v-model="currentQuestion.isRequired" />
    </setting-item>

    <setting-item title="最多上传">
      <t-input-number v-model="currentQuestion.maxFileCount" theme="column" size="small" :min="1" />
    </setting-item>

    <setting-item title="文件大小">
      <t-input-adornment>
        <template #append>
          <t-select v-model="chosenSizeUnit" :options="sizeUnits" :auto-width="true" size="small" />
        </template>

        <t-input-number v-model="maxFileSize" theme="column" size="small" :min="0" />
      </t-input-adornment>
    </setting-item>

    <setting-item title="限制后缀">
      <t-select
        creatable
        filterable
        multiple
        clearable
        :options="options"
        @create="createOptions"
        size="small"
        placeholder="请选择或输入文件后缀"
        :min-collapsed-num="1"
        v-model="currentQuestion.acceptFileTypes"
      />
    </setting-item>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { type FileQuestion } from 'free-survey-core';
import {
  Input as TInput,
  Textarea as TTextarea,
  Switch as TSwitch,
  type SelectProps
} from 'tdesign-vue-next';
import type { SettingElementEmits, SettingElementProps } from '../../types/common';
import SettingItem from '../../components/setting-item.vue';
import {
  InputAdornment as TInputAdornment,
  InputNumber as TInputNumber,
  Select as TSelect
} from 'tdesign-vue-next';

const props = defineProps<SettingElementProps>();
const emits = defineEmits<SettingElementEmits>();
const currentQuestion = computed({
  get() {
    return props.settingElement as FileQuestion;
  },
  set(value) {
    emits('update:settingElement', value);
  }
});

const sizeUnits = [
  { label: 'KiB', value: 'KiB' },
  { label: 'MiB', value: 'MiB' },
  { label: 'GiB', value: 'GiB' }
];

const chosenSizeUnit = ref('MiB');

const maxFileSize = computed({
  get() {
    let size = currentQuestion.value.maxFileSize;
    switch (chosenSizeUnit.value) {
      case 'MiB':
        size /= 1024;
        break;
      case 'GiB':
        size /= 1024 * 1024;
        break;
      default:
        break;
    }
    return size;
  },
  set(value) {
    let size = value;
    switch (chosenSizeUnit.value) {
      case 'MiB':
        size *= 1024;
        break;
      case 'GiB':
        size *= 1024 * 1024;
        break;
      default:
        break;
    }
    currentQuestion.value.maxFileSize = size;
  }
});

interface CustomOptionInfo {
  group?: string | { label: string };
  label?: string;
  value?: string;
  children?: CustomOptionInfo[];
}
const options = ref<CustomOptionInfo[]>([
  {
    group: '图片',
    children: [
      {
        label: '.png',
        value: '.png'
      },
      {
        label: '.jpg',
        value: '.jpg'
      },
      {
        label: '.jpeg',
        value: '.jpeg'
      },
      {
        label: '.gif',
        value: '.gif'
      },
      {
        label: '.avif',
        value: '.avif'
      },
      {
        label: '.webp',
        value: '.webp'
      },
      {
        label: '.heic',
        value: '.heic'
      }
    ]
  },
  {
    group: '视频',
    children: [
      {
        label: '.mp4',
        value: '.mp4'
      },
      {
        label: '.avi',
        value: '.avi'
      },
      {
        label: '.mkv',
        value: '.mkv'
      }
    ]
  },
  {
    group: '音频',
    children: [
      {
        label: '.mp3',
        value: '.mp3'
      },
      {
        label: '.flac',
        value: '.flac'
      },
      {
        label: '.ape',
        value: '.ape'
      },
      {
        label: '.wav',
        value: '.wav'
      },
      {
        label: '.aac',
        value: '.aac'
      }
    ]
  },
  {
    group: '文档',
    children: [
      {
        label: '.docx',
        value: '.docx'
      },
      {
        label: '.doc',
        value: '.doc'
      },
      {
        label: '.pdf',
        value: '.pdf'
      },
      {
        label: '.pptx',
        value: '.pptx'
      },
      {
        label: '.ppt',
        value: '.ppt'
      },
      {
        label: '.xlsx',
        value: '.xlsx'
      },
      {
        label: '.xls',
        value: '.xls'
      },
      {
        label: '.txt',
        value: '.txt'
      }
    ]
  },
  {
    group: '其它',
    children: [
      {
        label: '.zip',
        value: '.zip'
      }
    ]
  }
]);

const createOptions: SelectProps['onCreate'] = (val) => {
  if (
    !val ||
    val
      .toString()
      .trim()
      .match(/^\.\w+$/) === null
  ) {
    return;
  }
  options.value?.push({
    label: val.toString().trim(),
    value: val.toString().trim()
  });
};
</script>

<style lang="less" scoped></style>
