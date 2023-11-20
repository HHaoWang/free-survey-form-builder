<template>
  <element-with-operations-bar
    :element-id="currentQuestion.id"
    @click.stop="EventBus.emit('focusElement', currentQuestion)"
    class="radio-group-question question"
  >
    <div class="left">{{ groupNumber + 1 }}.</div>
    <div class="right">
      <editable-text v-model:value="currentQuestion.title"></editable-text>
      <div class="answer-input-area">
        <div class="choice" v-for="(choice, index) in currentQuestion.choices" v-bind:key="index">
          <icon-font name="close-circle" class="del-btn" @click="delChoice(index)" />
          <icon-font name="circle" style="color: var(--font-color-secondnary)" />
          <editable-text class="text" v-model:value="currentQuestion.choices[index].value" />
        </div>
        <div class="choice other-choice" v-if="currentQuestion.allowOther">
          <icon-font name="close-circle" class="del-btn" />
          <icon-font name="circle" style="color: var(--font-color-secondnary)" />
          <div class="text">
            <div>其它</div>
            <t-input class="answer-input" disabled placeholder="填写者回答区"></t-input>
          </div>
        </div>
        <t-link hover="color" @click="addNewChoice" class="add-choice choice">
          <icon-font name="close-circle" class="del-btn" />
          <icon-font name="add-circle" class="add-choice-icon" />
          <div class="text add-choice-text">添加选项</div>
        </t-link>
      </div>
    </div>
  </element-with-operations-bar>
</template>

<script lang="ts" setup>
import { EventBus } from '../../scripts/event-bus';
import ElementWithOperationsBar from '../../components/element-with-operations-bar.vue';
import EditableText from '../../components/editable-text.vue';
import { Input as TInput, Link as TLink } from 'tdesign-vue-next';
import { IconFont } from 'tdesign-icons-vue-next';
import { computed } from 'vue';
import type { ElementEmits, ElementProps } from '../../types/common';
import type { RadioGroupQuestion } from 'free-survey-core';

const props = defineProps<ElementProps>();

const emits = defineEmits<ElementEmits>();

const currentQuestion = computed({
  get() {
    return props.element as RadioGroupQuestion;
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
.radio-group-question {
  padding: var(--space-2) var(--space-2) var(--space-2) 0;
  border-radius: 4px;
  display: flex;
  position: relative;

  .left {
    flex: 0 0 2em;
    line-height: 30px;
    border: dashed 1px transparent;
    font-size: 14px;
    text-align: right;
    color: var(--serial-number-color);
  }

  .right {
    flex: 1;
  }
}

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

.answer-input-area {
  margin-top: var(--space-2);
  margin-left: var(--space);
}

:deep(.answer-input) {
  width: 45%;
  cursor: default;

  & input {
    cursor: default !important;
  }
}
</style>
