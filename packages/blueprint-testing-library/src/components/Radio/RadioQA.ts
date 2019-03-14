import {
  QA,
  classNamesToSelector,
  hasClassNames
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class RadioQA extends QA {
  static componentName = "Radio";

  static get selector() {
    return classNamesToSelector(Classes.RADIO);
  }

  get checkbox() {
    return this.get(RadioInput);
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

  get value() {
    return this.checkbox.value;
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

class RadioInput extends QA.ofType<HTMLInputElement>() {
  static componentName = "RadioInput";

  static get selector() {
    return 'input[type="radio"]';
  }

  get value() {
    return this.element.value;
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
