import { Classes } from "@blueprintjs/core";

const match = `${Classes.ICON}-`;

export function getIconName(element: HTMLElement) {
  const { classList } = element;
  for (let i = 0; i < classList.length; i++) {
    const className = classList[i];
    if (className.indexOf(match) === 0) {
      return className.slice(match.length);
    }
  }
}
