export function atLeastOne<T>(
  items: Array<T>,
  message: string = "Expected at least one item"
): Array<T> {
  if (items.length === 0) {
    throw new Error(message);
  }
  return items;
}
