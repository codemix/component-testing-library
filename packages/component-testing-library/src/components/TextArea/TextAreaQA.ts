import { QA } from "../../QA";

export class TextAreaQA extends QA.ofType<HTMLTextAreaElement>() {
  static componentName = "TextArea";

  static get selector() {
    return "textarea";
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.change({ target: { value } });
  }
}
