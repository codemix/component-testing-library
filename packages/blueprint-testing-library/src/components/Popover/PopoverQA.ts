import { QA } from "component-testing-library";
import { Classes, Keys } from "@blueprintjs/core";
import { classNamesToSelector, hasClassNames } from "../../utils";
import { PortalQA } from "../Portal";
import { OverlayQA } from "../Overlay";

export class PopoverQA extends QA {
  static componentName = "Popover";

  static get selector() {
    return classNamesToSelector(Classes.POPOVER_WRAPPER);
  }

  get target() {
    return this.get(PopoverTargetQA);
  }

  get portal() {
    const bodyElement = (this.element.getRootNode() as any).body;
    return this.instantiateComponent(PortalQA, bodyElement);
  }

  get overlay() {
    return this.query(OverlayQA) || this.portal.overlay;
  }

  get content() {
    const { portal } = this;
    return portal.get(PopoverContentQA);
  }

  get isOpen() {
    return hasClassNames(this.target.element, Classes.POPOVER_OPEN);
  }

  open() {
    if (!this.isOpen) {
      this.target.click();
    }
  }

  close() {
    if (this.isOpen) {
      this.target.click();
    }
  }

  toggle() {
    this.target.click();
  }
}

class PopoverTargetQA extends QA {
  static componentName = "PopoverTarget";
  static get selector() {
    return classNamesToSelector(Classes.POPOVER_TARGET);
  }
}

class PopoverContentQA extends QA {
  static componentName = "PopoverContent";
  static get selector() {
    return classNamesToSelector(Classes.POPOVER_CONTENT);
  }
}
