export function firstResultOrNull<T>(items: Array<T>): null | T {
  if (items.length === 0) {
    return null;
  }
  return items[0];
}
