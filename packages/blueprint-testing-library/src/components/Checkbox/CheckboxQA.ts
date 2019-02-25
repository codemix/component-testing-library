import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames, getAlignment } from "../../utils";

export class CheckboxQA extends QA {
  static componentName = "Checkbox";

  static get selector() {
    return classNamesToSelector(Classes.CHECKBOX);
  }

  get checkbox() {
    return this.get(CheckboxInput);
  }

  get checked() {
    return this.checkbox.checked;
  }

  set checked(isChecked: boolean) {
    const { checkbox } = this;
    if (checkbox.checked !== isChecked) {
      this.checkbox.click();
    }
  }

  get alignIndicator() {
    return getAlignment(this.element);
  }

  get isDisabled() {
    return hasClassNames(this.element, Classes.DISABLED);
  }

  get isLarge() {
    return hasClassNames(this.element, Classes.LARGE);
  }

  get isInline() {
    return hasClassNames(this.element, Classes.INLINE);
  }
}

class CheckboxInput extends QA.ofType<HTMLInputElement>() {
  static componentName = "CheckboxInput";

  static get selector() {
    return 'input[type="checkbox"]';
  }

  get checked() {
    return this.element.checked;
  }

  set checked(isChecked: boolean) {
    if (this.checked !== isChecked) {
      this.click();
    }
  }
}
