<template>
  <basic-question-ui-element :group-number="props.groupNumber" :element="currentQuestion">
    <editable-text v-model:value="currentQuestion.title" />
    <editable-text v-model:value="currentQuestion.description" />
    <div class="answer-input-area">
      <div class="choice" v-for="(choice, index) in currentQuestion.choices" v-bind:key="index">
        <icon-font name="close-circle" class="del-btn" @click="delChoice(index)" />
        <icon-font name="caret-right-small" style="color: var(--font-color-secondnary)" />
        <editable-text class="text" v-model:value="currentQuestion.choices[index].value" />
      </div>
      <div class="choice other-choice" v-if="currentQuestion.allowOther">
        <icon-font name="close-circle" class="del-btn" />
        <icon-font name="caret-right-small" style="color: var(--font-color-secondnary)" />
        <div class="text">
          <div>其它</div>
          <t-input class="answer-input" :disabled="true" placeholder="填写者回答区"></t-input>
        </div>
      </div>
      <t-link hover="color" @click="addNewChoice" class="add-choice choice">
        <icon-font name="close-circle" class="del-btn" />
        <icon-font name="add-circle" class="add-choice-icon" />
        <div class="text add-choice-text">添加选项</div>
      </t-link>
    </div></basic-question-ui-element
  >
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BasicQuestionUiElement from '../../components/basic-question-ui-element.vue';
import type { ElementEmits, ElementProps } from '../../types/common';
import type { DropdownQuestion } from 'free-survey-core';
import { IconFont } from 'tdesign-icons-vue-next';
import { Input as TInput, Link as TLink } from 'tdesign-vue-next';
import EditableText from '../../components/editable-text.vue';
const props = defineProps<ElementProps>();

const emits = defineEmits<ElementEmits>();

const currentQuestion = computed({
  get() {
    return props.element as DropdownQuestion;
  },
  set(newVal) {
    emits('update:element', newVal);
  }
});

const addNewChoice = () => {
  let index = currentQuestion.value.choices.length;
  currentQuestion.value.choices.push({ key: index.toString(), value: '选项' });
};
const delChoice = (index: number) => {
  currentQuestion.value.choices.splice(index, 1);
};
</script>

<style lang="less" scoped>
.answer-input-area {
  margin-top: var(--space-2);
  margin-left: var(--space);

  .choice {
    display: flex;
    margin-bottom: var(--space);
    align-items: center;

    .text {
      margin-left: var(--space);
      flex: auto;
    }

    .del-btn {
      color: red;
      margin-right: var(--space);
      cursor: pointer;
    }
  }

  .other-choice {
    .del-btn {
      visibility: hidden;
    }
    .text {
      font-size: 14px;
      padding-left: var(--space);
      display: flex;
      align-items: center;

      div {
        margin-right: var(--space);
      }
      .answer-input {
        width: 10em;
      }
    }
  }

  .add-choice {
    font-size: 16px;
    .del-btn {
      visibility: hidden;
    }
    .add-choice-icon {
      color: var(--font-color-secondnary);
    }
    .add-choice-text {
      padding-left: var(--space);
      font-size: 14px;
    }
    &:hover .add-choice-icon {
      color: unset;
    }
  }
}
</style>
