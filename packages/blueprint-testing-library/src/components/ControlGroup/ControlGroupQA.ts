import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames } from "../../utils";

export class ControlGroupQA extends QA {
  static componentName = "ControlGroup";

  static get selector() {
    return classNamesToSelector(Classes.CONTROL_GROUP);
  }

  get isFill() {
    return hasClassNames(this.element, Classes.FILL);
  }

  get isVertical() {
    return hasClassNames(this.element, Classes.VERTICAL);
  }
}
