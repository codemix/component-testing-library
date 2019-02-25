import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Card, Elevation } from "@blueprintjs/core";
import { CardQA } from "./CardQA";

afterEach(cleanup);

test("Card", () => {
  const { container } = render(
    <Card elevation={Elevation.THREE} interactive>
      Some content goes here.
    </Card>
  );

  const component = mount(CardQA, container);

  expect(component.elevation).toBe(Elevation.THREE);
  expect(component.isInteractive).toBe(true);
});
