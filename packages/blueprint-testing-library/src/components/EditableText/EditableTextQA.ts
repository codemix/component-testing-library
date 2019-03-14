import {
  QA,
  classNamesToSelector,
  hasClassNames
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class EditableTextQA extends QA {
  static componentName = "EditableText";

  static get selector() {
    return classNamesToSelector(Classes.EDITABLE_TEXT);
  }

  get value() {
    const input = this.query(EditableTextInputQA);
    if (input != null) {
      return input.value;
    }
    const span = this.get(EditableTextContentQA);
    if (this.element.classList.contains(Classes.EDITABLE_TEXT_PLACEHOLDER)) {
      return "";
    }
    return span.textContent;
  }

  set value(value: string) {
    this.focus();
    this.change({ target: { value } });
    this.blur();
  }

  get isEditing() {
    return hasClassNames(this.element, Classes.EDITABLE_TEXT_EDITING);
  }

  get body() {
    return this.query(EditableTextInputQA) || this.get(EditableTextContentQA);
  }

  getEventTarget(eventName: string) {
    return this.body.getEventTarget(eventName);
  }
}

class EditableTextContentQA extends QA {
  static componentName = "EditableTextContent";

  static get selector() {
    return classNamesToSelector(Classes.EDITABLE_TEXT_CONTENT);
  }
}

class EditableTextInputQA extends QA.ofType<HTMLInputElement>() {
  static componentName = "EditableTextInput";

  static get selector() {
    return classNamesToSelector(Classes.EDITABLE_TEXT_INPUT);
  }

  get value() {
    return this.element.value;
  }
}
