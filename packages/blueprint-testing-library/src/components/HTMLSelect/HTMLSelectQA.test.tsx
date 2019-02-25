import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { HTMLSelect } from "@blueprintjs/core";
import { HTMLSelectQA } from "./HTMLSelectQA";

afterEach(cleanup);

test("HTMLSelect without modifiers", () => {
  const Selectable = () => {
    const [value, setValue] = React.useState("a");
    return (
      <HTMLSelect value={value} onChange={e => setValue(e.currentTarget.value)}>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </HTMLSelect>
    );
  };

  const { container } = render(<Selectable />);

  const component = mount(HTMLSelectQA, container);
  expect(component.isFill).toBe(false);
  expect(component.isMinimal).toBe(false);
  expect(component.isLarge).toBe(false);

  expect(component.value).toBe("a");
  component.value = "c";
  expect(component.value).toBe("c");
});

test("HTMLSelect with modifiers", () => {
  const Selectable = () => {
    const [value, setValue] = React.useState("a");
    return (
      <HTMLSelect
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        fill
        minimal
        large
      >
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </HTMLSelect>
    );
  };
  const { container } = render(<Selectable />);

  const component = mount(HTMLSelectQA, container);
  expect(component.isFill).toBe(true);
  expect(component.isMinimal).toBe(true);
  expect(component.isLarge).toBe(true);
});
