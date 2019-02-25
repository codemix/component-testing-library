import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Collapse } from "@blueprintjs/core";
import { CollapseQA } from "./CollapseQA";

afterEach(cleanup);

test("Collapse: open", () => {
  const { container } = render(
    <Collapse isOpen>Some content goes here.</Collapse>
  );

  const component = mount(CollapseQA, container);

  expect(component.isOpen).toBe(true);
});

test("Collapse: closed", () => {
  const { container } = render(
    <Collapse isOpen={false}>Some content goes here.</Collapse>
  );

  const component = mount(CollapseQA, container);

  expect(component.isOpen).toBe(false);
});
