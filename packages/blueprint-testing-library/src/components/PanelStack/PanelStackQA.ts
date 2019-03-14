import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { ButtonQA } from "../Button";

export class PanelStackQA extends QA {
  static componentName = "PanelStack";

  static get selector() {
    return classNamesToSelector(Classes.PANEL_STACK);
  }

  get header() {
    return this.get(PanelStackHeaderQA);
  }

  get currentPanel() {
    const { header } = this;
    const { nextElementSibling } = header.element;
    if (nextElementSibling == null) {
      throw new Error("Cannot find current panel for PanelStack");
    }
    return nextElementSibling as HTMLElement;
  }

  get canGoBack() {
    return this.header.backButton != null;
  }

  goBack() {
    const { backButton } = this.header;
    if (backButton != null) {
      backButton.click();
    }
  }
}

export class PanelStackHeaderQA extends QA {
  static componentName = "PanelStackHeader";

  static get selector() {
    return `.${Classes.PANEL_STACK_VIEW} > .${Classes.PANEL_STACK_HEADER}`;
  }

  get title() {
    const el = this.querySelector(classNamesToSelector(Classes.HEADING));
    return el != null && el.textContent != null ? el.textContent : "";
  }

  get backButton() {
    return this.query(
      ButtonQA,
      classNamesToSelector(Classes.PANEL_STACK_HEADER_BACK)
    );
  }
}
