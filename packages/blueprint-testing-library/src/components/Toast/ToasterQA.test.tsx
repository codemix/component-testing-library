import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Toast, Toaster, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ToasterQA } from "./ToasterQA";

afterEach(cleanup);

test("Toast with text", () => {
  render(
    <Toaster>
      <Toast
        intent={Intent.WARNING}
        icon={IconNames.AIRPLANE}
        message="Hello World"
      />
      <Toast
        intent={Intent.WARNING}
        icon={IconNames.AIRPLANE}
        message="FOO BAR"
      />
    </Toaster>
  );
  const component = mount(ToasterQA, document.body);

  expect(component.toasts).toHaveLength(2);
});
