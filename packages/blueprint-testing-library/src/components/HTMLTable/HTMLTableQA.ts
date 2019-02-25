import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames } from "../../utils";

export class HTMLTableQA extends QA.ofType<HTMLTableElement>() {
  static componentName = "HTMLTable";

  static get selector() {
    return classNamesToSelector(Classes.HTML_TABLE);
  }

  get isInteractive() {
    return hasClassNames(this.element, Classes.INTERACTIVE);
  }

  get isBordered() {
    return hasClassNames(this.element, Classes.HTML_TABLE_BORDERED);
  }

  get isCondensed() {
    return hasClassNames(this.element, Classes.HTML_TABLE_CONDENSED);
  }

  get isStriped() {
    return hasClassNames(this.element, Classes.HTML_TABLE_STRIPED);
  }
}
