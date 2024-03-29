import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { OverlayQA } from "../Overlay";

export class PortalQA extends QA {
  static componentName = "Portal";

  static get selector() {
    return classNamesToSelector(Classes.PORTAL);
  }

  get overlay() {
    return this.query(OverlayQA);
  }
}
