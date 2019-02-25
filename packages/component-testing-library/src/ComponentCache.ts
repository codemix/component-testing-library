import { QA } from "./QA";

export type ComponentCache<T extends HTMLElement> = WeakMap<T, QA<T>>;

export function createComponentCache<T extends HTMLElement>(): ComponentCache<
  T
> {
  return new WeakMap<T, QA<T>>();
}
