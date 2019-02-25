import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Text } from "@blueprintjs/core";
import { TextQA } from "./TextQA";

afterEach(cleanup);

test("Text", () => {
  const { container } = render(<Text ellipsize>Demo</Text>);

  const component = mount(TextQA, container);

  expect(component.textContent).toBe("Demo");
});
