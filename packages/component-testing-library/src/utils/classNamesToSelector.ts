/**
 * Turn one or more class names into a selector.
 * @param classNames The class names to combine into a selector.
 */
export function classNamesToSelector(...classNames: Array<string>) {
  return classNames.map(className => `.${className}`).join("");
}
