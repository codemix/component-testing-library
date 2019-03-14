import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { CheckboxQA } from "../Checkbox";

export class SwitchQA extends CheckboxQA {
  static componentName = "Switch";

  static get selector() {
    return classNamesToSelector(Classes.SWITCH);
  }

  get controlIndicator() {
    return this.get(SwitchControlIndicatorQA);
  }

  get innerLabel() {
    return this.controlIndicator.innerLabel;
  }

  get textContent() {
    const { controlIndicator } = this;
    let next = controlIndicator.element.nextSibling;
    const content = [];
    while (next != null) {
      content.push(next.textContent);
      next = next.nextSibling;
    }
    return content.join("").trim();
  }
}

class SwitchControlIndicatorQA extends QA {
  static componentName = "SwitchControlIndicator";

  static get selector() {
    return classNamesToSelector(Classes.CONTROL_INDICATOR);
  }

  get innerLabel() {
    return this.query(SwitchInnerTextQA);
  }
}

class SwitchInnerTextQA extends QA {
  static componentName = "SwitchInnerText";

  static get selector() {
    return classNamesToSelector(Classes.SWITCH_INNER_TEXT);
  }
}
