/**
 * Given an array, check that there is at least one item, otherwise throw an error with the given message.
 *
 * @param items The array of items to check.
 * @param message The message to show in the error.
 */
export function atLeastOne<T>(
  items: Array<T>,
  message: string = "Expected at least one item"
): Array<T> {
  if (items.length === 0) {
    throw new Error(message);
  }
  return items;
}
