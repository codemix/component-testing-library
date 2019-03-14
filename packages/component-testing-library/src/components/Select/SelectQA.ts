import { QA } from "../../QA";

/**
 * A QA for a `<select />` element.
 */
export class SelectQA extends QA.ofType<HTMLSelectElement>() {
  static componentName = "Select";

  static get selector() {
    return "select";
  }

  /**
   * Get the name of the element.
   */
  get name() {
    return this.element.name;
  }

  /**
   * Get the value of the element.
   */
  get value() {
    return this.element.value;
  }

  /**
   * Set the value of the element using a change handler.
   */
  set value(value: string) {
    this.change({ target: { value } });
  }
}
