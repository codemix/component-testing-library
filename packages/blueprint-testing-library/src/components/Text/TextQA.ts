import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector } from "../../utils";

export class TextQA extends QA {
  static componentName = "Text";

  static get selector() {
    return classNamesToSelector(Classes.TEXT_OVERFLOW_ELLIPSIS);
  }
}
