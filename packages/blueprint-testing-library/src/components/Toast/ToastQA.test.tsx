import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Toast, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ToastQA } from "./ToastQA";

afterEach(cleanup);

test("Toast with text", () => {
  let dismissed = false;

  render(
    <Toast
      intent={Intent.WARNING}
      icon={IconNames.AIRPLANE}
      message="Hello World"
      onDismiss={() => {
        dismissed = true;
      }}
    />
  );
  const component = mount(ToastQA, document.body);

  expect(component.icon && component.icon.iconName).toBe(IconNames.AIRPLANE);
  expect(component.intent).toBe(Intent.WARNING);
  expect(component.message.textContent).toBe("Hello World");

  component.dismiss();

  expect(dismissed).toBe(true);
});
