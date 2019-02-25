import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { ControlGroup, InputGroup } from "@blueprintjs/core";
import { ControlGroupQA } from "./ControlGroupQA";

afterEach(cleanup);

test("ControlGroup", () => {
  const { container } = render(
    <ControlGroup vertical fill>
      <InputGroup name="a" />
      <InputGroup name="b" />
    </ControlGroup>
  );

  const component = mount(ControlGroupQA, container);

  expect(component.isFill).toBe(true);
  expect(component.isVertical).toBe(true);
});
