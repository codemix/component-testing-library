import { QA } from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class H1QA extends QA.ofType<HTMLHeadingElement>() {
  static componentName = "H1";

  static get selector() {
    return `h1.${Classes.HEADING}`;
  }
}

export class H2QA extends QA.ofType<HTMLHeadingElement>() {
  static componentName = "H2";

  static get selector() {
    return `h2.${Classes.HEADING}`;
  }
}

export class H3QA extends QA.ofType<HTMLHeadingElement>() {
  static componentName = "H3";

  static get selector() {
    return `h3.${Classes.HEADING}`;
  }
}

export class H4QA extends QA.ofType<HTMLHeadingElement>() {
  static componentName = "H4";

  static get selector() {
    return `h4.${Classes.HEADING}`;
  }
}

export class H5QA extends QA.ofType<HTMLHeadingElement>() {
  static componentName = "H5";

  static get selector() {
    return `h5.${Classes.HEADING}`;
  }
}

export class BlockquoteQA extends QA.ofType<HTMLQuoteElement>() {
  static componentName = "Blockquote";

  static get selector() {
    return `blockquote.${Classes.BLOCKQUOTE}`;
  }
}

export class CodeQA extends QA {
  static componentName = "Code";

  static get selector() {
    return `code.${Classes.CODE}`;
  }
}

export class LabelQA extends QA.ofType<HTMLLabelElement>() {
  static componentName = "Label";

  static get selector() {
    return `label.${Classes.LABEL}`;
  }
}

export class PreQA extends QA.ofType<HTMLPreElement>() {
  static componentName = "Pre";

  static get selector() {
    return `pre.${Classes.CODE_BLOCK}`;
  }
}

export class OLQA extends QA.ofType<HTMLOListElement>() {
  static componentName = "OL";

  static get selector() {
    return `ol.${Classes.LIST}`;
  }
}

export class ULQA extends QA.ofType<HTMLUListElement>() {
  static componentName = "UL";

  static get selector() {
    return `ul.${Classes.LIST}`;
  }
}
