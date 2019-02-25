import { EventRecorder } from "./EventRecorder";
import { ComponentCache, createComponentCache } from "./ComponentCache";

export interface QAContext {
  eventRecorder: EventRecorder;
  componentCache: ComponentCache<any>;
}

export function createQAContext(): QAContext {
  const eventRecorder = new EventRecorder();
  const componentCache = createComponentCache();
  return {
    eventRecorder,
    componentCache
  };
}
