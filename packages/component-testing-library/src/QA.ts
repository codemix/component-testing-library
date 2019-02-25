import {
  fireEvent,
  queryAllByAltText,
  queryAllByDisplayValue,
  queryAllByLabelText,
  queryAllByPlaceholderText,
  queryAllByRole,
  queryAllBySelectText,
  queryAllByTestId,
  queryAllByText,
  queryAllByTitle,
  queryAllByValue,
  Matcher
} from "dom-testing-library";
import { QAContext, createQAContext } from "./QAContext";

export interface QAConfig<T, El extends HTMLElement = HTMLElement> {
  new (element: El, parent: void | QA, context: QAContext): T;
  componentName: string;
  selector: string;
}

type FireEventName =
  | "copy"
  | "cut"
  | "paste"
  | "compositionEnd"
  | "compositionStart"
  | "compositionUpdate"
  | "keyDown"
  | "keyPress"
  | "keyUp"
  | "focus"
  | "blur"
  | "focusIn"
  | "focusOut"
  | "change"
  | "input"
  | "invalid"
  | "submit"
  | "click"
  | "contextMenu"
  | "dblClick"
  | "dblClick"
  | "drag"
  | "dragEnd"
  | "dragEnter"
  | "dragExit"
  | "dragLeave"
  | "dragOver"
  | "dragStart"
  | "drop"
  | "mouseDown"
  | "mouseEnter"
  | "mouseLeave"
  | "mouseMove"
  | "mouseOut"
  | "mouseOver"
  | "mouseUp"
  | "select"
  | "touchCancel"
  | "touchEnd"
  | "touchMove"
  | "touchStart"
  | "scroll"
  | "wheel"
  | "abort"
  | "canPlay"
  | "canPlayThrough"
  | "durationChange"
  | "emptied"
  | "encrypted"
  | "ended"
  | "loadedData"
  | "loadedMetadata"
  | "loadStart"
  | "pause"
  | "play"
  | "playing"
  | "progress"
  | "rateChange"
  | "seeked"
  | "seeking"
  | "stalled"
  | "suspend"
  | "timeUpdate"
  | "volumeChange"
  | "waiting"
  | "load"
  | "error"
  | "animationStart"
  | "animationEnd"
  | "animationIteration"
  | "transitionEnd";

export class QA<El extends HTMLElement = HTMLElement> {
  readonly element: El;

  readonly parent: void | QA;

  readonly context: QAContext;

  get textContent(): string {
    const { textContent } = this.element;
    return textContent === null ? "" : textContent.trim();
  }

  static componentName: string;

  static get selector(): string {
    return `[data-testid="${this.componentName}"]`;
  }

  static ofType<T extends HTMLElement>() {
    return this as new (
      element: HTMLElement,
      parent: void | QA,
      context: QAContext
    ) => QA<T>;
  }

  static matches(element: HTMLElement, selector: string = this.selector) {
    return element.matches(selector);
  }

  constructor(element: El, parent: void | QA, context: QAContext) {
    this.element = element;
    this.parent = parent;
    this.context = context;
    const existing = context.componentCache.get(element);
    if (existing != null) {
      return existing;
    }
    context.componentCache.set(element, this);
  }

  instantiateComponent<T extends QA>(
    QAClass: QAConfig<T>,
    element: HTMLElement
  ): T {
    return new QAClass(element, this, this.context);
  }

  instantiateComponents<T extends QA>(
    QAClass: QAConfig<T>,
    elements: Array<Element>,
    selector: string = QAClass.selector
  ): Array<T> {
    return (elements as Array<HTMLElement>)
      .filter(
        item =>
          item instanceof HTMLElement &&
          (QAClass as any).matches(item, selector)
      )
      .map((item: HTMLElement) => this.instantiateComponent(QAClass, item));
  }

  querySelector(selector: string) {
    return this.element.querySelector(selector);
  }

  querySelectorAll(selector: string) {
    return Array.from(this.element.querySelectorAll(selector));
  }

  queryAll<T extends QA>(
    QAClass: QAConfig<T>,
    selector: string = QAClass.selector
  ): Array<T> {
    const elements = this.querySelectorAll(selector);
    return this.instantiateComponents(QAClass, elements, selector);
  }

  query<T extends QA>(
    QAClass: QAConfig<T>,
    selector: string = QAClass.selector
  ): void | T {
    return firstOrUndefined(this.queryAll(QAClass, selector));
  }

  getAll<T extends QA>(
    QAClass: QAConfig<T>,
    selector: string = QAClass.selector
  ): Array<T> {
    return atLeastOne(
      this.queryAll(QAClass, selector),
      `Cannot find an element matching selector: ${selector}`
    );
  }

  get<T extends QA>(
    QAClass: QAConfig<T>,
    selector: string = QAClass.selector
  ): T {
    return this.getAll(QAClass, selector)[0];
  }

  queryAllByAltText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByAltText(this.element, input)
    );
  }

  queryByAltText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return firstOrUndefined(this.queryAllByAltText(QAClass, input));
  }

  getAllByAltText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return atLeastOne(
      this.queryAllByAltText(QAClass, input),
      `Cannot find an element with alt text: ${String(input)}`
    );
  }

  getByAltText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return this.getAllByAltText(QAClass, input)[0];
  }

  queryAllByDisplayValue<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByDisplayValue(this.element, input)
    );
  }

  queryByDisplayValue<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): void | T {
    return firstOrUndefined(this.queryAllByDisplayValue(QAClass, input));
  }

  getAllByDisplayValue<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return atLeastOne(
      this.queryAllByDisplayValue(QAClass, input),
      `Cannot find an element with display value: ${String(input)}`
    );
  }

  getByDisplayValue<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByDisplayValue(QAClass, input)[0];
  }

  queryAllByLabelText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByLabelText(this.element, input)
    );
  }

  queryByLabelText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): void | T {
    return firstOrUndefined(this.queryAllByLabelText(QAClass, input));
  }

  getAllByLabelText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return atLeastOne(
      this.queryAllByLabelText(QAClass, input),
      `Cannot find an element with label text: ${String(input)}`
    );
  }

  getByLabelText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByLabelText(QAClass, input)[0];
  }

  queryAllByPlaceholderText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByPlaceholderText(this.element, input)
    );
  }

  queryByPlaceholderText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): void | T {
    return firstOrUndefined(this.queryAllByPlaceholderText(QAClass, input));
  }

  getAllByPlaceholderText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return atLeastOne(
      this.queryAllByPlaceholderText(QAClass, input),
      `Cannot find an element with placeholder: ${String(input)}`
    );
  }

  getByPlaceholderText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByPlaceholderText(QAClass, input)[0];
  }

  queryAllByRole<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByRole(this.element, input)
    );
  }

  queryByRole<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return firstOrUndefined(this.queryAllByRole(QAClass, input));
  }

  getAllByRole<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return atLeastOne(
      this.queryAllByRole(QAClass, input),
      `Cannot find an element with role: ${String(input)}`
    );
  }

  getByRole<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByRole(QAClass, input)[0];
  }

  queryAllBySelectText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllBySelectText(this.element, input)
    );
  }

  queryBySelectText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): void | T {
    return firstOrUndefined(this.queryAllBySelectText(QAClass, input));
  }

  getAllBySelectText<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return atLeastOne(
      this.queryAllBySelectText(QAClass, input),
      `Cannot find an element with select text: ${String(input)}`
    );
  }

  getBySelectText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllBySelectText(QAClass, input)[0];
  }

  queryAllByTestId<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByTestId(this.element, input)
    );
  }

  queryByTestId<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return firstOrUndefined(this.queryAllByTestId(QAClass, input));
  }

  getAllByTestId<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return atLeastOne(
      this.queryAllByTestId(QAClass, input),
      `Cannot find an element with test id: ${String(input)}`
    );
  }

  getByTestId<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByTestId(QAClass, input)[0];
  }

  queryAllByText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByText(this.element, input)
    );
  }

  queryByText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return firstOrUndefined(this.queryAllByText(QAClass, input));
  }

  getAllByText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return atLeastOne(
      this.queryAllByText(QAClass, input),
      `Cannot find an element with text: ${String(input)}`
    );
  }

  getByText<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByText(QAClass, input)[0];
  }

  queryAllByTitle<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByTitle(this.element, input)
    );
  }

  queryByTitle<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return firstOrUndefined(this.queryAllByTitle(QAClass, input));
  }

  getAllByTitle<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return atLeastOne(
      this.queryAllByTitle(QAClass, input),
      `Cannot find an element with title: ${String(input)}`
    );
  }

  getByTitle<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByTitle(QAClass, input)[0];
  }

  queryAllByValue<T extends QA>(
    QAClass: QAConfig<T>,
    input: Matcher
  ): Array<T> {
    return this.instantiateComponents(
      QAClass,
      queryAllByValue(this.element, input)
    );
  }

  queryByValue<T extends QA>(QAClass: QAConfig<T>, input: Matcher): void | T {
    return firstOrUndefined(this.queryAllByValue(QAClass, input));
  }

  getAllByValue<T extends QA>(QAClass: QAConfig<T>, input: Matcher): Array<T> {
    return atLeastOne(
      this.queryAllByValue(QAClass, input),
      `Cannot find an element with value: ${String(input)}`
    );
  }

  getByValue<T extends QA>(QAClass: QAConfig<T>, input: Matcher): T {
    return this.getAllByValue(QAClass, input)[0];
  }

  interaction<R>(name: string, body: (component: QA<El>) => R): R {
    const { eventRecorder } = this.context;
    return eventRecorder.recordInteraction(name, this, body);
  }

  getEventTarget(_eventName: string) {
    return this.element;
  }

  fireEvent(event: string | any, payload?: any) {
    if (typeof event === "string") {
      const options = payload || {};
      const eventTarget = this.getEventTarget(event);
      this.context.eventRecorder.recordEvent(this, event, options);
      if (typeof fireEvent[event as FireEventName] === "function") {
        return fireEvent[event as FireEventName](eventTarget, options);
      }
      return fireEvent(eventTarget, { type: event, ...options });
    }
    this.context.eventRecorder.recordEvent(this, event.type, event);
    return fireEvent(this.getEventTarget(event.type), event);
  }

  copy(options: {} = {}) {
    return this.fireEvent("copy", options);
  }

  cut(options: {} = {}) {
    return this.fireEvent("cut", options);
  }

  paste(options: {} = {}) {
    return this.fireEvent("paste", options);
  }

  compositionEnd(options: {} = {}) {
    return this.fireEvent("compositionEnd", options);
  }

  compositionStart(options: {} = {}) {
    return this.fireEvent("compositionStart", options);
  }

  compositionUpdate(options: {} = {}) {
    return this.fireEvent("compositionUpdate", options);
  }

  keyDown(options: {} = {}) {
    return this.fireEvent("keyDown", options);
  }

  keyPress(options: {} = {}) {
    return this.fireEvent("keyPress", options);
  }

  keyUp(options: {} = {}) {
    return this.fireEvent("keyUp", options);
  }

  focus(options: {} = {}) {
    return this.fireEvent("focus", options);
  }

  blur(options: {} = {}) {
    return this.fireEvent("blur", options);
  }

  focusIn(options: {} = {}) {
    return this.fireEvent("focusIn", options);
  }

  focusOut(options: {} = {}) {
    return this.fireEvent("focusOut", options);
  }

  change(options: {} = {}) {
    return this.fireEvent("change", options);
  }

  input(options: {} = {}) {
    return this.fireEvent("input", options);
  }

  invalid(options: {} = {}) {
    return this.fireEvent("invalid", options);
  }

  submit(options: {} = {}) {
    return this.fireEvent("submit", options);
  }

  click(options: {} = {}) {
    return this.fireEvent("click", options);
  }

  contextMenu(options: {} = {}) {
    return this.fireEvent("contextMenu", options);
  }

  dblClick(options: {} = {}) {
    return this.fireEvent("dblClick", options);
  }

  doubleClick(options: {} = {}) {
    return this.fireEvent("dblClick", options);
  }

  drag(options: {} = {}) {
    return this.fireEvent("drag", options);
  }

  dragEnd(options: {} = {}) {
    return this.fireEvent("dragEnd", options);
  }

  dragEnter(options: {} = {}) {
    return this.fireEvent("dragEnter", options);
  }

  dragExit(options: {} = {}) {
    return this.fireEvent("dragExit", options);
  }

  dragLeave(options: {} = {}) {
    return this.fireEvent("dragLeave", options);
  }

  dragOver(options: {} = {}) {
    return this.fireEvent("dragOver", options);
  }

  dragStart(options: {} = {}) {
    return this.fireEvent("dragStart", options);
  }

  drop(options: {} = {}) {
    return this.fireEvent("drop", options);
  }

  mouseDown(options: {} = {}) {
    return this.fireEvent("mouseDown", options);
  }

  mouseEnter(options: {} = {}) {
    return this.fireEvent("mouseEnter", options);
  }

  mouseLeave(options: {} = {}) {
    return this.fireEvent("mouseLeave", options);
  }

  mouseMove(options: {} = {}) {
    return this.fireEvent("mouseMove", options);
  }

  mouseOut(options: {} = {}) {
    return this.fireEvent("mouseOut", options);
  }

  mouseOver(options: {} = {}) {
    return this.fireEvent("mouseOver", options);
  }

  mouseUp(options: {} = {}) {
    return this.fireEvent("mouseUp", options);
  }

  select(options: {} = {}) {
    return this.fireEvent("select", options);
  }

  touchCancel(options: {} = {}) {
    return this.fireEvent("touchCancel", options);
  }

  touchEnd(options: {} = {}) {
    return this.fireEvent("touchEnd", options);
  }

  touchMove(options: {} = {}) {
    return this.fireEvent("touchMove", options);
  }

  touchStart(options: {} = {}) {
    return this.fireEvent("touchStart", options);
  }

  scroll(options: {} = {}) {
    return this.fireEvent("scroll", options);
  }

  wheel(options: {} = {}) {
    return this.fireEvent("wheel", options);
  }

  abort(options: {} = {}) {
    return this.fireEvent("abort", options);
  }

  canPlay(options: {} = {}) {
    return this.fireEvent("canPlay", options);
  }

  canPlayThrough(options: {} = {}) {
    return this.fireEvent("canPlayThrough", options);
  }

  durationChange(options: {} = {}) {
    return this.fireEvent("durationChange", options);
  }

  emptied(options: {} = {}) {
    return this.fireEvent("emptied", options);
  }

  encrypted(options: {} = {}) {
    return this.fireEvent("encrypted", options);
  }

  ended(options: {} = {}) {
    return this.fireEvent("ended", options);
  }

  loadedData(options: {} = {}) {
    return this.fireEvent("loadedData", options);
  }

  loadedMetadata(options: {} = {}) {
    return this.fireEvent("loadedMetadata", options);
  }

  loadStart(options: {} = {}) {
    return this.fireEvent("loadStart", options);
  }

  pause(options: {} = {}) {
    return this.fireEvent("pause", options);
  }

  play(options: {} = {}) {
    return this.fireEvent("play", options);
  }

  playing(options: {} = {}) {
    return this.fireEvent("playing", options);
  }

  progress(options: {} = {}) {
    return this.fireEvent("progress", options);
  }

  rateChange(options: {} = {}) {
    return this.fireEvent("rateChange", options);
  }

  seeked(options: {} = {}) {
    return this.fireEvent("seeked", options);
  }

  seeking(options: {} = {}) {
    return this.fireEvent("seeking", options);
  }

  stalled(options: {} = {}) {
    return this.fireEvent("stalled", options);
  }

  suspend(options: {} = {}) {
    return this.fireEvent("suspend", options);
  }

  timeUpdate(options: {} = {}) {
    return this.fireEvent("timeUpdate", options);
  }

  volumeChange(options: {} = {}) {
    return this.fireEvent("volumeChange", options);
  }

  waiting(options: {} = {}) {
    return this.fireEvent("waiting", options);
  }

  load(options: {} = {}) {
    return this.fireEvent("load", options);
  }

  error(options: {} = {}) {
    return this.fireEvent("error", options);
  }

  animationStart(options: {} = {}) {
    return this.fireEvent("animationStart", options);
  }

  animationEnd(options: {} = {}) {
    return this.fireEvent("animationEnd", options);
  }

  animationIteration(options: {} = {}) {
    return this.fireEvent("animationIteration", options);
  }

  transitionEnd(options: {} = {}) {
    return this.fireEvent("transitionEnd", options);
  }

  toString() {
    return (this.constructor as typeof QA).componentName;
  }
}

export function mount<T extends QA>(
  QAClass: QAConfig<T>,
  container: HTMLElement,
  selector: string = QAClass.selector,
  context: QAContext = createQAContext()
) {
  if ((QAClass as any).matches(container, selector)) {
    return new QAClass(container, undefined, context);
  }
  const elements = container.querySelectorAll(selector);
  for (let i = 0; i < elements.length; i++) {
    const element = (elements[i] as unknown) as HTMLElement;
    if ((QAClass as any).matches(element, selector)) {
      return new QAClass(element, undefined, context);
    }
  }

  throw new Error(
    `Cannot find matching element for ${
      QAClass.componentName
    } with selector: ${selector}`
  );
}

function firstOrUndefined<T extends QA>(items: Array<T>): void | T {
  if (items.length === 0) {
    return;
  }
  return items[0];
}

function atLeastOne<T extends QA>(items: Array<T>, message: string): Array<T> {
  if (items.length === 0) {
    throw new Error(message);
  }
  return items;
}
