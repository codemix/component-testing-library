/**
 * Given an `Element`, and optionally, a selector, return the text content for the element, or an empty string if there is none.
 * @param container The element, or if a selector is provided, the container element.
 * @param selector An optional selector.
 */
export function getElementText(
  container: void | null | Element,
  selector?: string
) {
  if (container == null) {
    return "";
  }
  const el = selector == null ? container : container.querySelector(selector);
  if (el == null || el.textContent == null) {
    return "";
  }
  return el.textContent;
}
