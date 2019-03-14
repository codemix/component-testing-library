import {
  QA,
  classNamesToSelector,
  hasClassNames
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class HTMLSelectQA extends QA {
  static componentName = "HTMLSelect";

  static get selector() {
    return classNamesToSelector(Classes.HTML_SELECT);
  }

  get value() {
    return this.getEventTarget().value;
  }

  set value(value: string) {
    this.change({
      target: { value }
    });
  }

  get isDisabled() {
    return hasClassNames(this.element, Classes.DISABLED);
  }

  get isFill() {
    return hasClassNames(this.element, Classes.FILL);
  }

  get isLarge() {
    return hasClassNames(this.element, Classes.LARGE);
  }

  get isMinimal() {
    return hasClassNames(this.element, Classes.MINIMAL);
  }

  getEventTarget() {
    const { firstElementChild } = this.element;
    if (
      firstElementChild == null ||
      !(firstElementChild instanceof HTMLSelectElement)
    ) {
      throw new Error("Must have a select element as first child.");
    }
    return firstElementChild;
  }
}
