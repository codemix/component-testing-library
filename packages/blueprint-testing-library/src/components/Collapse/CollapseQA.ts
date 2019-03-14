import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class CollapseQA extends QA {
  static componentName = "Collapse";

  static get selector() {
    return classNamesToSelector(Classes.COLLAPSE);
  }

  get isOpen() {
    return this.element.style.overflowY === "visible";
  }
}
