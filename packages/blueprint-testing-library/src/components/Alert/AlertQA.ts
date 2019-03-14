import {
  QA,
  classNamesToSelector,
  matchText,
  firstOrUndefined,
  atLeastOne
} from "component-testing-library";
import { Matcher } from "react-testing-library";
import { Classes } from "@blueprintjs/core";
import { IconQA } from "../Icon";
import { ButtonQA } from "../Button";

export class AlertQA extends QA {
  static componentName = "Alert";

  static get selector() {
    return classNamesToSelector(Classes.DIALOG, Classes.ALERT);
  }

  get body() {
    return this.get(AlertBodyQA);
  }

  get icon() {
    return this.body.query(IconQA);
  }

  get contents() {
    return this.body.get(AlertContentsQA);
  }

  get footer() {
    return this.get(AlertFooterQA);
  }

  get buttons() {
    return this.footer.buttons;
  }

  get intent() {
    return this.footer.buttons[0].intent;
  }

  queryButtonsByText(matcher: Matcher) {
    return this.footer.buttons.filter(button =>
      matchText(button.text, button.element, matcher)
    );
  }

  queryButtonByText(matcher: Matcher) {
    return firstOrUndefined(this.queryButtonsByText(matcher));
  }

  getButtonsByText(matcher: Matcher) {
    return atLeastOne(
      this.queryButtonsByText(matcher),
      `Could not find any buttons matching text: ${String(matcher)}`
    );
  }

  getButtonByText(matcher: Matcher) {
    return this.getButtonsByText(matcher)[0];
  }

  confirm() {
    this.buttons[0].click();
  }

  cancel() {
    this.buttons[1].click();
  }
}

export class AlertBodyQA extends QA {
  static componentName = "AlertBody";

  static get selector() {
    return classNamesToSelector(Classes.ALERT_BODY);
  }
}

export class AlertContentsQA extends QA {
  static componentName = "AlertContents";

  static get selector() {
    return classNamesToSelector(Classes.ALERT_CONTENTS);
  }
}

export class AlertFooterQA extends QA {
  static componentName = "AlertFooter";

  static get selector() {
    return classNamesToSelector(Classes.ALERT_FOOTER);
  }

  get buttons() {
    return this.getAll(ButtonQA);
  }
}
