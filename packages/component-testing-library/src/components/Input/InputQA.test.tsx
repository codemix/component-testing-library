import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "../../QA";
import { InputQA } from "./InputQA";

afterEach(cleanup);

test("Input", () => {
  const Wrapper = () => {
    const [value, setValue] = React.useState("a");
    return (
      <input
        value={value}
        type="password"
        onChange={e => setValue(e.currentTarget.value)}
      />
    );
  };

  const { container } = render(<Wrapper />);

  const component = mount(InputQA, container);
  expect(component.type).toBe("password");
  expect(component.value).toBe("a");
  component.value = "c";
  expect(component.value).toBe("c");
});
