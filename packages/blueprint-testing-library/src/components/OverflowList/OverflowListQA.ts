import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class OverflowListQA extends QA {
  static componentName = "OverflowList";

  static get selector() {
    return classNamesToSelector(Classes.OVERFLOW_LIST);
  }
}
