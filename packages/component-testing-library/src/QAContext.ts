import { EventRecorder } from "./EventRecorder";
import { ComponentCache, createComponentCache } from "./ComponentCache";
import { QAStatics, QA } from "./QA";

export interface QAContext {
  eventRecorder: EventRecorder;
  componentCache: ComponentCache<any>;
  instantiateComponent<T extends QA, El extends HTMLElement>(
    QAClass: QAStatics<T, El>,
    element: El,
    parent: void | QA
  ): T;
}

export function createQAContext(): QAContext {
  const eventRecorder = new EventRecorder();
  const componentCache = createComponentCache();
  return {
    eventRecorder,
    componentCache,
    instantiateComponent<T extends QA, El extends HTMLElement>(
      QAClass: QAStatics<T, El>,
      element: El,
      parent: void | QA
    ) {
      const cached = componentCache.get(element);
      if (cached !== undefined && cached instanceof QAClass) {
        return cached;
      }
      const component = new QAClass(element, parent, this);
      componentCache.set(element, component);
      return component;
    }
  };
}
