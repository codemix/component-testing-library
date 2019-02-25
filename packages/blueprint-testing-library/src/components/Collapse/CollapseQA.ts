import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector } from "../../utils";

export class CollapseQA extends QA {
  static componentName = "Collapse";

  static get selector() {
    return classNamesToSelector(Classes.COLLAPSE);
  }

  get isOpen() {
    return this.element.style.overflowY === "visible";
  }
}
