import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "../../QA";
import { SelectQA } from "./SelectQA";

afterEach(cleanup);

test("Select", () => {
  const Wrapper = () => {
    const [value, setValue] = React.useState("a");
    return (
      <select value={value} onChange={e => setValue(e.currentTarget.value)}>
        <option value="">Empty</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </select>
    );
  };

  const { container } = render(<Wrapper />);

  const component = mount(SelectQA, container);
  expect(component.value).toBe("a");
  component.value = "c";
  expect(component.value).toBe("c");
});
