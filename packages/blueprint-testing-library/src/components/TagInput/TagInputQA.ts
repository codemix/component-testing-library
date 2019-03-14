import { QA, InputQA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { TagQA } from "../Tag/TagQA";

export class TagInputQA extends QA {
  static componentName = "TagInput";

  static get selector() {
    return classNamesToSelector(Classes.TAG_INPUT);
  }

  get tags() {
    return this.inputValues.tags;
  }

  get inputValues() {
    return this.get(TagInputValuesQA);
  }

  get ghostInput() {
    return this.get(InputQA, classNamesToSelector(Classes.INPUT_GHOST));
  }

  get values() {
    return this.inputValues.tags.map(tag => tag.text);
  }

  set values(values: Array<string>) {
    const { tags } = this;
    for (let i = tags.length - 1; i >= 0; i--) {
      const tag = tags[i];
      tag.remove();
    }
    this.addValues(...values);
  }

  addValue(value: string) {
    this.addValues(value);
  }

  addValues(...values: string[]) {
    const { ghostInput } = this;

    const clipboardData =
      typeof DataTransfer === "undefined"
        ? new MockDataTransfer()
        : new DataTransfer();
    clipboardData.setData("text", `${values.join("\n")}\n`);

    const event = new Event("paste", {
      cancelable: true,
      bubbles: true
    });

    Object.defineProperty(event, "clipboardData", { value: clipboardData });

    ghostInput.element.dispatchEvent(event);
  }

  hasValue(value: string) {
    return this.values.includes(value);
  }

  removeValue(value: string) {
    const tag = this.inputValues.tags.find(tag => tag.text === value);
    if (tag != null) {
      tag.remove();
    }
  }
}

class TagInputValuesQA extends QA {
  static componentName = "TagInputValues";

  static get selector() {
    return classNamesToSelector(Classes.TAG_INPUT_VALUES);
  }

  get tags() {
    return this.queryAll(TagQA);
  }
}

class MockDataTransfer {
  private data: Map<string, string> = new Map();
  setData(type: string, data: string) {
    this.data.set(type, data);
  }
  getData(type: string) {
    return this.data.get(type);
  }
}
