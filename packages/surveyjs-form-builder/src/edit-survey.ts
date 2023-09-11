import { ContentBlockProvider } from './content-block-provider';
import type { AddableQuestion } from './types/question-type-group';
import {
  AbstractElement,
  AbstractPage,
  AbstractPageElement,
  AbstractQuestion,
  AbstractQuestionGroup,
  Page,
  QuestionGroup,
  Survey
} from 'free-survey-core';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { EventBus } from './scripts/event-bus';
import type { Ref } from 'vue';

export function useEditSurvey(
  focusedElement: Ref<AbstractElement | null>,
  survey: Ref<Survey>,
  refresh: () => void
) {
  const blockProvider = new ContentBlockProvider();
  const onAddNewElement = (addedElement: AddableQuestion) => {
    if (focusedElement.value === null) {
      if (addedElement.type === 'page') {
        survey.value.pages.push(new Page());
        return;
      }
      MessagePlugin.warning({ content: '请先选择要放置该组件的地方！' }).then();
      return;
    }

    if (focusedElement.value.type === 'page') {
      if (addedElement.type === 'page') {
        survey.value.pages.splice(
          survey.value.pages.findIndex((page) => page.id === focusedElement.value!.id) + 1,
          0,
          new Page()
        );
        return;
      }
      (focusedElement.value as AbstractPage).elements.push(
        blockProvider.provideDataObject(addedElement.type) as AbstractPageElement
      );
      return;
    }

    if (focusedElement.value.type === 'questionGroup') {
      if (addedElement.type === 'page') {
        MessagePlugin.warning({ content: '无法在此处插入此组件！' }).then();
        return;
      }
      if (addedElement.type === 'questionGroup') {
        const info = survey.value.getElementWithExtraInfos(focusedElement.value.id);
        const focusedQuestionGroupPage = info?.parent as AbstractPage;
        focusedQuestionGroupPage.elements.splice(
          focusedQuestionGroupPage.elements.findIndex(
            (element) => element.id === focusedElement.value!.id
          ) + 1,
          0,
          new QuestionGroup()
        );
        refresh();
        return;
      }
      (focusedElement.value as AbstractQuestionGroup).questions.push(
        blockProvider.provideDataObject(addedElement.type) as AbstractQuestion
      );
      return;
    }

    if (focusedElement.value.type === 'question') {
      if (addedElement.type === 'page') {
        MessagePlugin.warning({ content: '无法在此处插入此组件！' }).then();
        return;
      }
      if (addedElement.type === 'questionGroup') {
        const info = survey.value.getElementWithExtraInfos(focusedElement.value.id);
        if (info === null) {
          MessagePlugin.warning({ content: '插入失败！' }).then();
          return;
        }
        if (info.parent?.type === 'questionGroup') {
          MessagePlugin.warning({ content: '无法在此处插入此组件！' }).then();
          return;
        }
        if (info.parent?.type === 'page') {
          (info.parent as AbstractPage).elements.splice(
            (info.parent as AbstractPage).elements.findIndex(
              (element) => element.id === focusedElement.value!.id
            ) + 1,
            0,
            blockProvider.provideDataObject(addedElement.type) as AbstractPageElement
          );
          refresh();
          return;
        }
      }
      // addedElement is question
      const info = survey.value.getElementWithExtraInfos(focusedElement.value.id);
      if (info === null) {
        MessagePlugin.warning({ content: '插入失败！' }).then();
        return;
      }
      let list: Array<AbstractPageElement> = [];
      if (info.parent?.type === 'questionGroup') {
        list = (info.parent as AbstractQuestionGroup).questions;
      }
      if (info.parent?.type === 'page') {
        list = (info.parent as AbstractPage).elements;
      }
      list.splice(
        list.findIndex((element) => element.id === focusedElement.value!.id) + 1,
        0,
        blockProvider.provideDataObject(addedElement.type) as AbstractPageElement
      );
      refresh();
      return;
    }
  };

  EventBus.on('deleteElement', (id: string | null) => {
    if (id === null) return;
    const confirmBtn = DialogPlugin.confirm({
      header: '确认删除吗？',
      confirmBtn: '删除',
      cancelBtn: '取消',
      onConfirm: () => {
        survey.value.deleteElement(id);
        refresh();
        confirmBtn.destroy();
      }
    });
  });

  return { onAddNewElement };
}
