import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { IconQA } from "../Icon";
import { ButtonQA } from "../Button";

export class DrawerQA extends QA {
  static componentName = "Drawer";

  static get selector() {
    return classNamesToSelector(Classes.DRAWER);
  }

  get header() {
    return this.get(DrawerHeaderQA);
  }

  get icon() {
    return this.query(IconQA);
  }

  get body() {
    return this.get(DrawerBodyQA);
  }

  get footer() {
    return this.get(DrawerFooterQA);
  }

  get closeButton() {
    return this.get(
      ButtonQA,
      classNamesToSelector(Classes.DIALOG_CLOSE_BUTTON)
    );
  }

  close() {
    this.closeButton.click();
  }
}

export class DrawerHeaderQA extends QA {
  static componentName = "DrawerHeader";

  static get selector() {
    return classNamesToSelector(Classes.DRAWER_HEADER);
  }
}

export class DrawerBodyQA extends QA {
  static componentName = "DrawerBody";

  static get selector() {
    return classNamesToSelector(Classes.DRAWER_BODY);
  }
}

export class DrawerFooterQA extends QA {
  static componentName = "DrawerFooter";

  static get selector() {
    return classNamesToSelector(Classes.DRAWER_FOOTER);
  }
}
