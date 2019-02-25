import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { FormGroup, Intent } from "@blueprintjs/core";
import { FormGroupQA } from "./FormGroupQA";

afterEach(cleanup);

test("FormGroup", () => {
  const { container } = render(
    <FormGroup
      label="FormGroup Demo"
      labelInfo="Test"
      intent={Intent.WARNING}
      inline
      helperText="Yo"
    >
      Some content goes here.
    </FormGroup>
  );

  const component = mount(FormGroupQA, container);

  expect(component.intent).toBe(Intent.WARNING);
  expect(component.label.textContent).toBe("FormGroup Demo");
  expect(component.content.textContent).toBe("Some content goes here.");
  expect(component.helperText.textContent).toBe("Yo");
});
