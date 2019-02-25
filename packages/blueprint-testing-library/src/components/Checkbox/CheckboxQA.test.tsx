import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Checkbox, Alignment } from "@blueprintjs/core";
import { CheckboxQA } from "./CheckboxQA";

afterEach(cleanup);

test("Checkbox", () => {
  const Checkable = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <Checkbox
        alignIndicator={Alignment.RIGHT}
        label="Test"
        indeterminate
        inline
        large
        checked={isChecked}
        onChange={e => setIsChecked(e.currentTarget.checked)}
      />
    );
  };

  const { container } = render(<Checkable />);

  const component = mount(CheckboxQA, container);

  expect(component.textContent).toBe("Test");

  expect(component.checked).toBe(false);
  component.checked = true;

  expect(component.alignIndicator).toBe(Alignment.RIGHT);
  expect(component.checked).toBe(true);
  expect(component.isInline).toBe(true);
  expect(component.isLarge).toBe(true);
});
