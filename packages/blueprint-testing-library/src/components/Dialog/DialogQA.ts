import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { IconQA } from "../Icon";
import { H4QA } from "../HTMLElements";
import { ButtonQA } from "../Button";

export class DialogQA extends QA {
  static componentName = "Dialog";

  static get selector() {
    return classNamesToSelector(Classes.DIALOG);
  }

  get header() {
    return this.get(DialogHeaderQA);
  }

  get body() {
    return this.get(DialogBodyQA);
  }

  get footer() {
    return this.get(DialogFooterQA);
  }

  get icon() {
    return this.header.icon;
  }

  get title() {
    return this.header.heading.textContent;
  }

  close() {
    this.header.closeButton.click();
  }
}

export class DialogHeaderQA extends QA {
  static componentName = "DialogHeader";

  static get selector() {
    return classNamesToSelector(Classes.DIALOG_HEADER);
  }

  get icon() {
    return this.query(IconQA);
  }

  get heading() {
    return this.get(H4QA);
  }

  get closeButton() {
    return this.get(
      ButtonQA,
      classNamesToSelector(Classes.DIALOG_CLOSE_BUTTON)
    );
  }
}

export class DialogBodyQA extends QA {
  static componentName = "DialogBody";

  static get selector() {
    return classNamesToSelector(Classes.DIALOG_BODY);
  }
}

export class DialogFooterQA extends QA {
  static componentName = "DialogFooter";

  static get selector() {
    return classNamesToSelector(Classes.DIALOG_FOOTER);
  }

  get actions() {
    return this.get(DialogFooterActionsQA);
  }
}

export class DialogFooterActionsQA extends QA {
  static componentName = "DialogFooterActions";

  static get selector() {
    return classNamesToSelector(Classes.DIALOG_FOOTER_ACTIONS);
  }
}
