import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { NonIdealState, Alignment } from "@blueprintjs/core";
import { NonIdealStateQA } from "./NonIdealStateQA";
import { IconNames } from "@blueprintjs/icons";

afterEach(cleanup);

test("NonIdealState", () => {
  const { container } = render(
    <NonIdealState
      icon={IconNames.WARNING_SIGN}
      title="Bad Thing"
      description="A description."
    />
  );

  const component = mount(NonIdealStateQA, container);

  expect(component.icon.iconName).toBe(IconNames.WARNING_SIGN);
  expect(component.title).toBe("Bad Thing");
  expect(component.description).toBe("A description.");
});
