export function classNamesToSelector(...classNames: Array<string>) {
  const selector = [];
  for (const className of classNames) {
    selector.push(`.${className}`);
  }
  return selector.join("");
}
