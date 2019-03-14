import {
  QA,
  classNamesToSelector,
  getElementText
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { IconQA } from "../Icon";

export class NonIdealStateQA extends QA {
  static componentName = "NonIdealState";

  static get selector() {
    return classNamesToSelector(Classes.NON_IDEAL_STATE);
  }

  get icon() {
    return this.get(IconQA);
  }

  get title() {
    return getElementText(this.element, `h4.${Classes.HEADING}`);
  }

  get description() {
    const title = this.querySelector(`h4.${Classes.HEADING}`);
    if (title == null) {
      return "";
    }
    return getElementText(title.nextElementSibling);
  }
}
