/**
 * Return the first item in an array of items if it exists, otherwise undefined.
 * @param items The array of items.
 */
export function firstOrUndefined<T>(items: Array<T>): void | T {
  if (items.length === 0) {
    return;
  }
  return items[0];
}
