import { QA } from "component-testing-library";
import { LabelQA } from "../HTMLElements";
import { RadioQA } from "./RadioQA";

export class RadioGroupQA extends QA {
  static componentName = "RadioGroup";

  static get selector(): string {
    throw new Error("Cannot select RadioGroup directly");
  }

  get label() {
    return this.query(LabelQA);
  }

  get radios() {
    return this.getAll(RadioQA);
  }

  get selectedValue(): string {
    for (const radio of this.radios) {
      if (radio.checked) {
        return radio.value;
      }
    }
    return "";
  }

  set selectedValue(value: string) {
    for (const radio of this.radios) {
      if (radio.value === value) {
        radio.checked = true;
        return;
      }
    }
  }

  get isDisabled() {
    for (const radio of this.radios) {
      if (!radio.isDisabled) {
        return false;
      }
    }
    return true;
  }
}
