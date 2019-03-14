import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { TagInput } from "@blueprintjs/core";
import { TagInputQA } from "./TagInputQA";

afterEach(cleanup);

test("TagInput", () => {
  const Wrapper = () => {
    const [values, setValues] = React.useState<string[]>(["aaa", "bbb"]);

    return (
      <TagInput
        values={values}
        onChange={(values: Array<any>) => setValues(values)}
      />
    );
  };
  const { container } = render(<Wrapper />);

  const component = mount(TagInputQA, container);
  expect(component.values).toEqual(["aaa", "bbb"]);

  component.addValue("ccc");

  expect(component.values).toEqual(["aaa", "bbb", "ccc"]);

  component.removeValue("bbb");
  expect(component.values).toEqual(["aaa", "ccc"]);

  component.values = ["x", "y", "z"];
  expect(component.values).toEqual(["x", "y", "z"]);
});
