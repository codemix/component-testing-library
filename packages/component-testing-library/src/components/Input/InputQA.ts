import { QA } from "../../QA";

/**
 * A QA for `<input />` elements.
 */
export class InputQA extends QA.ofType<HTMLInputElement>() {
  static componentName = "Input";

  static get selector() {
    return "input";
  }

  /**
   * Get the name of the element.
   */
  get name() {
    return this.element.name;
  }

  /**
   * Get the type of the input, e.g. "text" or "password".
   */
  get type() {
    return this.element.type;
  }

  /**
   * Get the value of the input.
   */
  get value() {
    return this.element.value;
  }

  /**
   * Set the value of the input using a change handler.
   */
  set value(value: string) {
    this.change({ target: { value } });
  }
}
