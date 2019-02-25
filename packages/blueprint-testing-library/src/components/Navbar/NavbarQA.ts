import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { classNamesToSelector, getAlignment, hasClassNames } from "../../utils";

export class NavbarQA extends QA {
  static componentName = "Navbar";

  static get selector() {
    return classNamesToSelector(Classes.NAVBAR);
  }

  get heading() {
    return this.get(NavbarHeadingQA);
  }

  get groups() {
    return this.getAll(NavbarGroupQA);
  }

  get isDark() {
    return hasClassNames(this.element, Classes.DARK);
  }

  get isFixedToTop() {
    return hasClassNames(this.element, Classes.FIXED_TOP);
  }
}

export class NavbarHeadingQA extends QA {
  static componentName = "NavbarHeading";

  static get selector() {
    return classNamesToSelector(Classes.NAVBAR_HEADING);
  }
}
export class NavbarGroupQA extends QA {
  static componentName = "NavbarGroup";

  static get selector() {
    return classNamesToSelector(Classes.NAVBAR_GROUP);
  }

  get align() {
    return getAlignment(this.element);
  }
}
