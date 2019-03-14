import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { getIconName, getIntent } from "../../utils";

export class IconQA extends QA {
  static componentName = "Icon";

  static get selector() {
    return classNamesToSelector(Classes.ICON);
  }

  get icon() {
    return getIconName(this.element) || "";
  }

  get iconName() {
    return this.icon;
  }

  get intent() {
    return getIntent(this.element);
  }
}
