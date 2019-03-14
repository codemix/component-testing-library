import { Classes } from "@blueprintjs/core";
import { classNamesToSelector } from "component-testing-library";
import { OverflowListQA } from "../OverflowList";
import { PopoverQA } from "../Popover";
import { BreadcrumbQA } from "./BreadcrumbQA";

export class BreadcrumbsQA extends OverflowListQA {
  static componentName = "Breadcrumbs";

  static get selector() {
    return classNamesToSelector(Classes.BREADCRUMBS);
  }

  get visibleItems() {
    return this.queryAll(BreadcrumbQA);
  }

  get currentItem() {
    return this.visibleItems.find(item => item.isCurrent);
  }

  get popover() {
    const li = this.element.firstElementChild;
    if (li == null || li.firstElementChild == null) {
      return;
    }
    if (
      li.firstElementChild.matches(
        classNamesToSelector(Classes.POPOVER_WRAPPER)
      )
    ) {
      return this.instantiateComponent(
        PopoverQA,
        li.firstElementChild as HTMLElement
      );
    }
  }

  get isOverflowing() {
    const li = this.element.firstElementChild;
    if (li == null || li.firstElementChild == null) {
      return false;
    }
    return li.firstElementChild.matches(
      classNamesToSelector(Classes.POPOVER_WRAPPER)
    );
  }
}
