import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames } from "../../utils";

export class OverlayQA extends QA {
  static componentName = "Overlay";

  static get selector() {
    return classNamesToSelector(Classes.OVERLAY);
  }

  get isOpen() {
    return hasClassNames(this.element, Classes.OVERLAY_OPEN);
  }
}
