import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { ToastQA } from "./ToastQA";

export class ToasterQA extends QA {
  static componentName = "Toaster";

  static get selector() {
    return classNamesToSelector(Classes.PORTAL).concat(
      " ",
      classNamesToSelector(Classes.TOAST_CONTAINER)
    );
  }

  get toasts() {
    return this.queryAll(ToastQA);
  }
}
