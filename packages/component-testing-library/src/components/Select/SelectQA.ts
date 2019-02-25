import { QA } from "../../QA";

export class SelectQA extends QA.ofType<HTMLSelectElement>() {
  static componentName = "Select";

  static get selector() {
    return "select";
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.change({ target: { value } });
  }
}
