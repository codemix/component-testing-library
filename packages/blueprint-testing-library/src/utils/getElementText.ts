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
