import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Alert, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AlertQA } from "./AlertQA";

afterEach(cleanup);

test("Alert with text", () => {
  let confirmed = false;
  let cancelled = false;

  render(
    <Alert
      intent={Intent.WARNING}
      icon={IconNames.AIRPLANE}
      isOpen={true}
      onConfirm={() => {
        confirmed = true;
      }}
      cancelButtonText="Cancel"
      onCancel={() => {
        cancelled = true;
      }}
    >
      Hello World
    </Alert>
  );
  const component = mount(AlertQA, document.body);

  expect(component.icon && component.icon.iconName).toBe(IconNames.AIRPLANE);
  expect(component.intent).toBe(Intent.WARNING);
  expect(component.contents.textContent).toBe("Hello World");

  component.confirm();
  expect(confirmed).toBe(true);

  component.cancel();
  expect(cancelled).toBe(true);
});
