import { QA } from "../../QA";

export class InputQA extends QA.ofType<HTMLInputElement>() {
  static componentName = "Input";

  static get selector() {
    return "input";
  }

  get type() {
    return this.element.type;
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.change({ target: { value } });
  }
}
