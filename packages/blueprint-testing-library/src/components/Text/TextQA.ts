import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class TextQA extends QA {
  static componentName = "Text";

  static get selector() {
    return classNamesToSelector(Classes.TEXT_OVERFLOW_ELLIPSIS);
  }
}
