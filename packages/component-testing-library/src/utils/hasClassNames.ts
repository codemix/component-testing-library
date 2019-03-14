import { classNamesToSelector } from "./classNamesToSelector";

/**
 * Determines whether an element has one or more class names.
 * @param element The element to check.
 * @param classNames The class names to check for.
 */
export function hasClassNames(element: HTMLElement, ...classNames: string[]) {
  const selector = classNamesToSelector(...classNames);
  return element.matches(selector);
}
