import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames, getIntent } from "../../utils";
import { IconQA } from "../Icon";

export class MenuItemQA extends QA {
  static componentName = "MenuItem";

  static get selector() {
    return classNamesToSelector(Classes.MENU_ITEM);
  }

  get icon() {
    return this.query(IconQA);
  }

  get text() {
    const el = this.querySelector(
      classNamesToSelector(Classes.TEXT_OVERFLOW_ELLIPSIS)
    );
    if (el == null) {
      return "";
    }
    return el.textContent || "";
  }

  get label() {
    const el = this.querySelector(
      classNamesToSelector(Classes.MENU_ITEM_LABEL)
    );
    if (el == null) {
      return "";
    }
    return el.textContent || "";
  }

  get intent() {
    return getIntent(this.element);
  }

  get isActive() {
    return hasClassNames(this.element, Classes.ACTIVE);
  }

  get isDisabled() {
    return hasClassNames(this.element, Classes.DISABLED);
  }
}
