import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { IconQA } from "./IconQA";

afterEach(cleanup);

test("Icon", () => {
  const { container } = render(<Icon icon={IconNames.AIRPLANE} />);

  const component = mount(IconQA, container);

  expect(component.icon).toBe(IconNames.AIRPLANE);
});
