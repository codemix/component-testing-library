import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Callout, Intent } from "@blueprintjs/core";
import { CalloutQA } from "./CalloutQA";
import { IconNames } from "@blueprintjs/icons";

afterEach(cleanup);

test("Callout", () => {
  const { container } = render(
    <Callout
      title="Callout Demo"
      intent={Intent.WARNING}
      icon={IconNames.AIRPLANE}
    >
      Some content goes here.
    </Callout>
  );

  const component = mount(CalloutQA, container);

  expect(component.title).toBe("Callout Demo");
  expect(component.intent).toBe(Intent.WARNING);
  expect(component.icon && component.icon.iconName).toBe(IconNames.AIRPLANE);
});
