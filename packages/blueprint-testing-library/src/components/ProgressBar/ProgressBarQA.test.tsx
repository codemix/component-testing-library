import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount } from "component-testing-library";
import { Intent, ProgressBar } from "@blueprintjs/core";
import { ProgressBarQA } from "./ProgressBarQA";

afterEach(cleanup);

test("ProgressBar no modifiers", () => {
  const { container } = render(<ProgressBar value={0.35} />);

  const component = mount(ProgressBarQA, container);

  expect(component.value).toBe(0.35);
  expect(component.intent).toBe(Intent.NONE);
  expect(component.hasAnimation).toBe(true);
  expect(component.hasStripes).toBe(true);
});

test("ProgressBar with modifiers", () => {
  const { container } = render(
    <ProgressBar
      value={0.35}
      intent={Intent.DANGER}
      stripes={false}
      animate={false}
    />
  );

  const component = mount(ProgressBarQA, container);

  expect(component.value).toBe(0.35);
  expect(component.intent).toBe(Intent.DANGER);
  expect(component.hasAnimation).toBe(false);
  expect(component.hasStripes).toBe(false);
});
