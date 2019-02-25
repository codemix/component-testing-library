import { Classes, Alignment } from "@blueprintjs/core";
import { classNamesToSelector } from "./classNamesToSelector";

export function getAlignment(element: HTMLElement) {
  if (
    element.matches(
      classNamesToSelector(Classes.alignmentClass(Alignment.LEFT))
    )
  ) {
    return Alignment.LEFT;
  }
  if (
    element.matches(
      classNamesToSelector(Classes.alignmentClass(Alignment.CENTER))
    )
  ) {
    return Alignment.CENTER;
  }
  if (
    element.matches(
      classNamesToSelector(Classes.alignmentClass(Alignment.RIGHT))
    )
  ) {
    return Alignment.RIGHT;
  }
}
