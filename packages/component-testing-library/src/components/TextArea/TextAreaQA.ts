import { QA } from "../../QA";

/**
 * A QA for `<textarea />` elements.
 */
export class TextAreaQA extends QA.ofType<HTMLTextAreaElement>() {
  static componentName = "TextArea";

  static get selector() {
    return "textarea";
  }

  /**
   * Get the name of the element.
   */
  get name() {
    return this.element.name;
  }

  /**
   * Get the value of the textarea.
   */
  get value() {
    return this.element.value;
  }

  /**
   * Set the value of the textarea using a change handler.
   */
  set value(value: string) {
    this.change({ target: { value } });
  }
}
