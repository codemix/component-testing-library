import { Classes } from "@blueprintjs/core";
import { MenuQA } from "../Menu";

export class ContextMenuQA extends MenuQA {
  static componentName = "ContextMenu";

  static get selector() {
    return `.${Classes.CONTEXT_MENU} + .${Classes.PORTAL} .${Classes.MENU}`;
  }
}
