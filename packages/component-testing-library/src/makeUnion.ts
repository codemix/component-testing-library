import { QA, QAStatics } from "./QA";
import { QAContext } from "./QAContext";

export function makeUnion<T extends QA>(
  ...items: Array<QAStatics<T>>
): QAStatics<T> {
  const componentName = items.map(item => item.componentName).join(" | ");
  class UnionQA extends QA {
    static componentName = componentName;

    static get selector() {
      return items.map(item => item.selector).join(",");
    }

    constructor(element: any, parent: void | QA<any>, context: QAContext) {
      for (const item of items) {
        if (((item as any) as typeof QA).matches(element)) {
          return new ((item as any) as typeof QA)(element, parent, context);
        }
      }
      super(element, parent, context);
    }
  }

  return (UnionQA as any) as QAStatics<T>;
}
