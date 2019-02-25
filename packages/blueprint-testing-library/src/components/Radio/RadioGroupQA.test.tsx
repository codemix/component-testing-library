import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { RadioGroup, Radio } from "@blueprintjs/core";
import { RadioGroupQA } from "./RadioGroupQA";

afterEach(cleanup);

test("RadioGroup", () => {
  const Checkable = () => {
    const [value, setValue] = React.useState("a");
    return (
      <RadioGroup
        className="RadioGroup"
        label="Test"
        selectedValue={value}
        onChange={e => setValue(e.currentTarget.value)}
      >
        <Radio label="A" value="a" />
        <Radio label="B" value="b" />
        <Radio label="C" value="c" />
      </RadioGroup>
    );
  };

  const { container } = render(<Checkable />);

  const component = mount(RadioGroupQA, container, ".RadioGroup");

  expect(component.label && component.label.textContent).toBe("Test");

  expect(component.radios).toHaveLength(3);

  expect(component.selectedValue).toBe("a");

  component.selectedValue = "c";

  expect(component.selectedValue).toBe("c");
});
