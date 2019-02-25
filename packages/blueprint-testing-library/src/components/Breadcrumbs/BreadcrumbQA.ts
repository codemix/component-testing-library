import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames } from "../../utils";
import { QA } from "component-testing-library";

export class BreadcrumbQA extends QA {
  static componentName = "Breadcrumb";

  static get selector() {
    return classNamesToSelector(Classes.BREADCRUMB);
  }

  get isCurrent() {
    return hasClassNames(this.element, Classes.BREADCRUMB_CURRENT);
  }
}
