import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, getIntent } from "../../utils";

export class SpinnerQA extends QA {
  static componentName = "Spinner";

  static get selector() {
    return classNamesToSelector(Classes.SPINNER);
  }

  get intent() {
    return getIntent(this.element);
  }
}
