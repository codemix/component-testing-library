import { Classes, Elevation } from "@blueprintjs/core";
import { classNamesToSelector } from "./classNamesToSelector";

export function getElevation(element: HTMLElement) {
  if (
    element.matches(classNamesToSelector(Classes.elevationClass(Elevation.ONE)))
  ) {
    return Elevation.ONE;
  }
  if (
    element.matches(classNamesToSelector(Classes.elevationClass(Elevation.TWO)))
  ) {
    return Elevation.TWO;
  }
  if (
    element.matches(
      classNamesToSelector(Classes.elevationClass(Elevation.THREE))
    )
  ) {
    return Elevation.THREE;
  }
  if (
    element.matches(
      classNamesToSelector(Classes.elevationClass(Elevation.FOUR))
    )
  ) {
    return Elevation.FOUR;
  }
  return Elevation.ZERO;
}
