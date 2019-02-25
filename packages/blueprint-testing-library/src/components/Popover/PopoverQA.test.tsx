import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount } from "component-testing-library";
import { Button, Intent, Popover } from "@blueprintjs/core";
import { PopoverQA } from "./PopoverQA";

afterEach(cleanup);

test("Popover", () => {
  const { container } = render(
    <Popover>
      <Button text="Open" intent={Intent.PRIMARY} />
      <div>Hello World</div>
    </Popover>
  );

  const component = mount(PopoverQA, container);
  expect(component.isOpen).toBe(false);
  component.open();
  expect(component.isOpen).toBe(true);
  component.close();
  expect(component.isOpen).toBe(false);
});
