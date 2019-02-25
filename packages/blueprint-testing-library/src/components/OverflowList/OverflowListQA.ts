import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames } from "../../utils";

export class OverflowListQA extends QA {
  static componentName = "OverflowList";

  static get selector() {
    return classNamesToSelector(Classes.OVERFLOW_LIST);
  }
}
