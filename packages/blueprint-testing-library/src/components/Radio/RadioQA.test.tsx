import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Radio } from "@blueprintjs/core";
import { RadioQA } from "./RadioQA";

afterEach(cleanup);

test("Radio", () => {
  const Wrapper = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <Radio
        label="Test"
        inline
        large
        checked={isChecked}
        onChange={e => setIsChecked(e.currentTarget.checked)}
      />
    );
  };

  const { container } = render(<Wrapper />);

  const component = mount(RadioQA, container);

  expect(component.textContent).toBe("Test");

  expect(component.checked).toBe(false);
  component.checked = true;

  expect(component.checked).toBe(true);
  expect(component.isInline).toBe(true);
  expect(component.isLarge).toBe(true);
  expect(component.isDisabled).toBe(false);
});
