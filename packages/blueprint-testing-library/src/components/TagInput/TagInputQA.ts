import { QA, InputQA } from "component-testing-library";
import { Classes, Keys } from "@blueprintjs/core";
import { classNamesToSelector } from "../../utils";
import { TagQA } from "../Tag/TagQA";
import { fireEvent } from "react-testing-library";

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

  addValue(value: string) {
    const { ghostInput } = this;

    const clipboardData =
      typeof DataTransfer === "undefined"
        ? new MockDataTransfer()
        : new DataTransfer();
    clipboardData.setData("text", `${value}\n`);

    const event = new Event("paste", {
      cancelable: true,
      bubbles: true
    });

    Object.defineProperty(event, "clipboardData", { value: clipboardData });

    ghostInput.element.dispatchEvent(event);
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
