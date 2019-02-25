import { InputQA, QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames, getIntent } from "../../utils";
import { IconQA } from "../Icon";

export class InputGroupQA extends QA {
  static componentName = "InputGroup";

  static get selector() {
    return classNamesToSelector(Classes.INPUT_GROUP);
  }

  get inputRef() {
    return this.get(InputQA);
  }

  get value() {
    return this.inputRef.value;
  }

  set value(value: string) {
    this.inputRef.value = value;
  }

  get leftIcon() {
    const { firstElementChild } = this.element;
    if (
      firstElementChild != null &&
      firstElementChild.matches(IconQA.selector)
    ) {
      return this.get(IconQA);
    }
  }

  get rightElement() {
    return this.query(InputActionQA);
  }

  get intent() {
    return getIntent(this.element);
  }

  get isDisabled() {
    return hasClassNames(this.element, Classes.DISABLED);
  }

  get isRound() {
    return hasClassNames(this.element, Classes.ROUND);
  }

  get isSmall() {
    return hasClassNames(this.element, Classes.SMALL);
  }

  get isLarge() {
    return hasClassNames(this.element, Classes.LARGE);
  }

  getEventTarget() {
    return this.inputRef.element;
  }
}

class InputActionQA extends QA {
  static componentName = "InputAction";

  static get selector() {
    return classNamesToSelector(Classes.INPUT_ACTION);
  }
}
