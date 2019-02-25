import { Matcher } from "react-testing-library";

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
