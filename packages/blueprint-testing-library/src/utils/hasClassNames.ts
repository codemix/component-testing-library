import { classNamesToSelector } from "./classNamesToSelector";

export function hasClassNames(element: HTMLElement, ...classNames: string[]) {
  const selector = classNamesToSelector(...classNames);
  return element.matches(selector);
}
