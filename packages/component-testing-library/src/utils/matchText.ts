import { Matcher } from "dom-testing-library";

/**
 * Match the given text / element using a string, regexp or function.
 * @param text The text to match against.
 * @param element The element containing the text.
 * @param matcher The string, RegExp or function to match the text against.
 */
export function matchText(
  text: string,
  element: HTMLElement,
  matcher: Matcher
) {
  if (typeof matcher === "string") {
    return text.trim() === matcher;
  }
  if (typeof matcher === "function") {
    return matcher(text, element);
  }
  return matcher.test(text);
}
