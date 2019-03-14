import { Matcher } from "react-testing-library";
import {
  QA,
  classNamesToSelector,
  matchText,
  firstOrUndefined,
  atLeastOne,
  hasClassNames
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { MenuItemQA } from "./MenuItemQA";

export class MenuQA extends QA {
  static componentName = "Menu";

  static get selector() {
    return classNamesToSelector(Classes.MENU);
  }

  get isLarge() {
    return hasClassNames(this.element, Classes.LARGE);
  }

  get items() {
    return this.getAll(MenuItemQA);
  }

  get activeItem() {
    return this.items.find(item => item.isActive);
  }

  get activeItems() {
    return this.items.filter(item => item.isActive);
  }

  queryItemsByText(matcher: Matcher) {
    return this.items.filter(item =>
      matchText(item.text, item.element, matcher)
    );
  }

  queryItemByText(matcher: Matcher) {
    return firstOrUndefined(this.queryItemsByText(matcher));
  }

  getItemsByText(matcher: Matcher) {
    return atLeastOne(
      this.queryItemsByText(matcher),
      `Could not find any items matching text: ${String(matcher)}`
    );
  }

  getItemByText(matcher: Matcher) {
    return this.getItemsByText(matcher)[0];
  }

  queryItemsByIcon(matcher: Matcher) {
    return this.items.filter(item => {
      const { icon } = item;
      if (icon == null) {
        return false;
      }
      return matchText(icon.iconName, item.element, matcher);
    });
  }

  queryItemByIcon(matcher: Matcher) {
    return firstOrUndefined(this.queryItemsByIcon(matcher));
  }

  getItemsByIcon(matcher: Matcher) {
    return atLeastOne(
      this.queryItemsByIcon(matcher),
      `Could not find any items with icon: ${String(matcher)}`
    );
  }

  getItemByIcon(matcher: Matcher) {
    return this.getItemsByIcon(matcher)[0];
  }
}
