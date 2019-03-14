import { Classes, Intent } from "@blueprintjs/core";
import { classNamesToSelector } from "component-testing-library";

export function getIntent(element: HTMLElement) {
  if (
    element.matches(classNamesToSelector(Classes.intentClass(Intent.PRIMARY)))
  ) {
    return Intent.PRIMARY;
  }
  if (
    element.matches(classNamesToSelector(Classes.intentClass(Intent.SUCCESS)))
  ) {
    return Intent.SUCCESS;
  }
  if (
    element.matches(classNamesToSelector(Classes.intentClass(Intent.WARNING)))
  ) {
    return Intent.WARNING;
  }
  if (
    element.matches(classNamesToSelector(Classes.intentClass(Intent.DANGER)))
  ) {
    return Intent.DANGER;
  }
  return Intent.NONE;
}
