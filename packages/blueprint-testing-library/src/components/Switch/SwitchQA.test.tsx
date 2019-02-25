import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount } from "component-testing-library";
import { Switch } from "@blueprintjs/core";
import { SwitchQA } from "./SwitchQA";

afterEach(cleanup);

test("Switch", () => {
  const Wrapper = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <Switch
        label="Test"
        innerLabel="Yeah"
        inline
        large
        checked={isChecked}
        onChange={e => setIsChecked(e.currentTarget.checked)}
      />
    );
  };

  const { container } = render(<Wrapper />);

  const component = mount(SwitchQA, container);

  expect(component.textContent).toBe("Test");

  expect(component.innerLabel && component.innerLabel.textContent).toBe("Yeah");

  expect(component.checked).toBe(false);
  component.checked = true;

  expect(component.checked).toBe(true);
  expect(component.isInline).toBe(true);
  expect(component.isLarge).toBe(true);
  expect(component.isDisabled).toBe(false);
});
