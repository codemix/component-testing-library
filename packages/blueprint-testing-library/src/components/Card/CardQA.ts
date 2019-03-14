import {
  QA,
  classNamesToSelector,
  hasClassNames
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { getElevation } from "../../utils";

export class CardQA extends QA {
  static componentName = "Card";

  static get selector() {
    return classNamesToSelector(Classes.CARD);
  }

  get elevation() {
    return getElevation(this.element);
  }

  get isInteractive() {
    return hasClassNames(this.element, Classes.INTERACTIVE);
  }
}
