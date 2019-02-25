import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { getIntent, classNamesToSelector, hasClassNames } from "../../utils";
import { LabelQA } from "../HTMLElements";

export class FormGroupQA extends QA {
  static componentName = "FormGroup";

  static get selector() {
    return classNamesToSelector(Classes.FORM_GROUP);
  }

  get intent() {
    return getIntent(this.element);
  }

  get label() {
    return this.get(FormGroupLabelQA);
  }

  get content() {
    return this.get(FormContentQA);
  }

  get helperText() {
    return this.get(FormHelperTextQA);
  }

  get isDisabled() {
    return hasClassNames(this.element, Classes.DISABLED);
  }

  get isInline() {
    return hasClassNames(this.element, Classes.INLINE);
  }
}

export class FormGroupLabelQA extends LabelQA {
  static componentName = "FormGroupLabel";

  static get selector() {
    return classNamesToSelector(Classes.LABEL);
  }

  get textContent() {
    const { childNodes } = this.element;
    const content = [];
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      if (
        !(node instanceof Element) ||
        !node.classList.contains(Classes.TEXT_MUTED)
      ) {
        content.push(node.textContent);
      }
    }
    return content.join("").trim();
  }
}

export class FormContentQA extends QA {
  static componentName = "FormContent";

  static get selector() {
    return classNamesToSelector(Classes.FORM_CONTENT);
  }

  get textContent() {
    const { childNodes } = this.element;
    const content = [];
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      if (
        !(node instanceof Element) ||
        !node.classList.contains(Classes.FORM_HELPER_TEXT)
      ) {
        content.push(node.textContent);
      }
    }
    return content.join("").trim();
  }
}

export class FormHelperTextQA extends QA {
  static componentName = "FormHelperText";

  static get selector() {
    return classNamesToSelector(Classes.FORM_HELPER_TEXT);
  }
}
