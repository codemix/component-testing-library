import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames, getIntent } from "../../utils";
import { IconQA } from "../Icon";
import { ButtonQA } from "../Button";

export class TagQA extends QA {
  static componentName = "Tag";

  static get selector() {
    return classNamesToSelector(Classes.TAG);
  }

  get intent() {
    return getIntent(this.element);
  }

  get text(): string {
    const el = this.querySelector(
      classNamesToSelector(Classes.TEXT_OVERFLOW_ELLIPSIS)
    );
    return el != null && el.textContent != null ? el.textContent : "";
  }

  get icon() {
    return this.query(IconQA, `${IconQA.selector}:first-child`);
  }

  get rightIcon() {
    return this.query(
      IconQA,
      `.${Classes.TEXT_OVERFLOW_ELLIPSIS} + ${IconQA.selector}`
    );
  }

  get removeButton() {
    return this.query(ButtonQA, classNamesToSelector(Classes.TAG_REMOVE));
  }

  get isActive() {
    return hasClassNames(this.element, Classes.ACTIVE);
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

  get isInteractive() {
    return hasClassNames(this.element, Classes.INTERACTIVE);
  }

  get isRound() {
    return hasClassNames(this.element, Classes.ROUND);
  }

  get isRemovable() {
    return this.removeButton != null;
  }

  remove() {
    const { removeButton } = this;
    if (removeButton != null) {
      removeButton.click();
    }
  }
}
