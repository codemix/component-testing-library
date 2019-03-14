import {
  QA,
  classNamesToSelector,
  hasClassNames,
  matchText,
  atLeastOne,
  firstOrUndefined
} from "component-testing-library";
import { Matcher } from "react-testing-library";
import { Classes } from "@blueprintjs/core";
import { getAlignment } from "../../utils";
import { ButtonQA } from "../Button";

export class ButtonGroupQA extends QA {
  static componentName = "ButtonGroup";

  static get selector() {
    return classNamesToSelector(Classes.BUTTON_GROUP);
  }

  get buttons() {
    return this.getAll(ButtonQA);
  }

  get alignText() {
    return getAlignment(this.element);
  }

  get isMinimal() {
    return hasClassNames(this.element, Classes.MINIMAL);
  }

  get isVertical() {
    return hasClassNames(this.element, Classes.VERTICAL);
  }

  get isLarge() {
    return hasClassNames(this.element, Classes.LARGE);
  }

  get isFill() {
    return hasClassNames(this.element, Classes.FILL);
  }

  queryButtonsByText(matcher: Matcher) {
    return this.buttons.filter(button =>
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

  queryButtonsByIcon(matcher: Matcher) {
    return this.buttons.filter(button => {
      const { icon } = button;
      if (icon == null) {
        return false;
      }
      return matchText(icon.iconName, button.element, matcher);
    });
  }

  queryButtonByIcon(matcher: Matcher) {
    return firstOrUndefined(this.queryButtonsByIcon(matcher));
  }

  getButtonsByIcon(matcher: Matcher) {
    return atLeastOne(
      this.queryButtonsByIcon(matcher),
      `Could not find any buttons with icon: ${String(matcher)}`
    );
  }

  getButtonByIcon(matcher: Matcher) {
    return this.getButtonsByIcon(matcher)[0];
  }
}
