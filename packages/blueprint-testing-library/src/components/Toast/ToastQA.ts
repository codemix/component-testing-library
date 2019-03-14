import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { getIntent } from "../../utils";
import { IconQA } from "../Icon";
import { ButtonGroupQA } from "../ButtonGroup";
import { IconNames } from "@blueprintjs/icons";

export class ToastQA extends QA {
  static componentName = "Toast";

  static get selector() {
    return classNamesToSelector(Classes.TOAST);
  }

  get intent() {
    return getIntent(this.element);
  }

  get icon() {
    return this.query(IconQA);
  }

  get message() {
    return this.get(ToastMessageQA);
  }

  get buttonGroup() {
    return this.get(
      ButtonGroupQA,
      classNamesToSelector(Classes.BUTTON_GROUP, Classes.MINIMAL).concat(
        ":last-child"
      )
    );
  }

  dismiss() {
    this.buttonGroup.getButtonByIcon(IconNames.CROSS).click();
  }
}

export class ToastMessageQA extends QA {
  static componentName = "ToastMessage";

  static get selector() {
    return classNamesToSelector(Classes.TOAST_MESSAGE);
  }
}
