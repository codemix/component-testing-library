import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "../../QA";
import { TextAreaQA } from "./TextAreaQA";

afterEach(cleanup);

test("TextArea", () => {
  const Wrapper = () => {
    const [value, setValue] = React.useState("a");
    return (
      <textarea value={value} onChange={e => setValue(e.currentTarget.value)} />
    );
  };

  const { container } = render(<Wrapper />);

  const component = mount(TextAreaQA, container);
  expect(component.value).toBe("a");
  component.value = "c";
  expect(component.value).toBe("c");
});
