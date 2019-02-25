import { QA } from "component-testing-library";
import { Classes, Alignment } from "@blueprintjs/core";
import { IconQA } from "../Icon";
import {
  classNamesToSelector,
  getAlignment,
  getIntent,
  hasClassNames
} from "../../utils";

export class ButtonQA extends QA {
  static componentName = "Button";

  static get selector() {
    return classNamesToSelector(Classes.BUTTON);
  }

  get alignText() {
    return getAlignment(this.element) || Alignment.CENTER;
  }

  get intent() {
    return getIntent(this.element);
  }

  get text(): string {
    const el = this.querySelector(classNamesToSelector(Classes.BUTTON_TEXT));
    return el != null && el.textContent != null ? el.textContent : "";
  }

  get icon() {
    return this.query(IconQA, `${IconQA.selector}:first-child`);
  }

  get rightIcon() {
    return this.query(IconQA, `.${Classes.BUTTON_TEXT} + ${IconQA.selector}`);
  }

  get isDisabled() {
    return hasClassNames(this.element, Classes.DISABLED);
  }

  get isActive() {
    return hasClassNames(this.element, Classes.ACTIVE);
  }

  get isMinimal() {
    return hasClassNames(this.element, Classes.MINIMAL);
  }

  get isSmall() {
    return hasClassNames(this.element, Classes.SMALL);
  }

  get isLarge() {
    return hasClassNames(this.element, Classes.LARGE);
  }

  get isFill() {
    return hasClassNames(this.element, Classes.FILL);
  }
}
