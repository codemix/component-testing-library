import {
  QA,
  classNamesToSelector,
  getElementText
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { IconQA } from "../Icon";
import { getIntent } from "../../utils";

export class CalloutQA extends QA {
  static componentName = "Callout";

  static get selector() {
    return classNamesToSelector(Classes.CALLOUT);
  }

  get intent() {
    return getIntent(this.element);
  }

  get title() {
    return getElementText(this.element, classNamesToSelector(Classes.HEADING));
  }

  get icon() {
    return this.query(IconQA);
  }
}
