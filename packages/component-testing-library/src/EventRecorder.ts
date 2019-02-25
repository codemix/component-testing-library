import { QA } from "./QA";

export type QAComponentPath = Array<string>;

export interface RecordedEvent {
  type: "event";
  path: QAComponentPath;
  name: string;
  payload: object;
}

export interface Interaction {
  type: "interaction";
  path: QAComponentPath;
  name: string;
  children: EventLog;
}

export type EventLog = Array<RecordedEvent | Interaction>;

export function getQAComponentPath(component: QA) {
  let current: void | QA = component;
  const parts = [];
  while (current != null) {
    parts.unshift(current.toString());
    current = current.parent;
  }
  return parts;
}

export class EventRecorder {
  private log: EventLog = [];
  private currentInteraction: void | Interaction = undefined;

  recordEvent(component: QA, name: string, payload: object = {}) {
    const path = getQAComponentPath(component);
    const entry: RecordedEvent = {
      type: "event",
      path,
      name,
      payload
    };
    this.push(entry);
  }

  recordInteraction<T, El extends HTMLElement>(
    name: string,
    component: QA<El>,
    body: (component: QA<El>) => T
  ): T {
    const { currentInteraction } = this;
    const interaction: Interaction = {
      type: "interaction",
      path: getQAComponentPath(component),
      name,
      children: []
    };
    this.push(interaction);
    this.currentInteraction = interaction;
    try {
      const result = body(component);
      if (
        result != null &&
        typeof ((result as unknown) as Promise<T>).then === "function"
      ) {
        return ((result as unknown) as Promise<T>).finally(() => {
          this.currentInteraction = currentInteraction;
        }) as any;
      }
      this.currentInteraction = currentInteraction;
      return result;
    } catch (e) {
      this.currentInteraction = currentInteraction;
      throw e;
    }
  }

  push(...entries: EventLog) {
    const { currentInteraction, log } = this;
    if (currentInteraction !== undefined) {
      return currentInteraction.children.push(...entries);
    } else {
      return log.push(...entries);
    }
  }

  reset() {
    this.log = [];
    this.currentInteraction = undefined;
  }

  toJSON() {
    return this.log;
  }

  toString() {
    return eventLogToString(this.log);
  }
}

function createIndenter(level: number) {
  const prefix = Array.from({ length: level * 2 + 1 });
  return (line: string) => {
    if (level === 0) {
      return line;
    }
    return prefix.join(" ").concat(line);
  };
}

function eventLogToString(log: EventLog, level: number = 0): string {
  const lines = [];
  for (const entry of log) {
    if (entry.type === "event") {
      lines.push(" ► ".concat(entry.path.join(" "), " ", entry.name));
    } else {
      lines.push(entry.path.join(" "));
      lines.push(" | ");
      lines.push(" |- ".concat(entry.name));
      lines.push(eventLogToString(entry.children, level + 2));
    }
  }
  return lines.map(createIndenter(level)).join("\n");
}
