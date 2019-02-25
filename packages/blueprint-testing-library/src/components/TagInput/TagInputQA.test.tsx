import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount } from "component-testing-library";
import { TagInput } from "@blueprintjs/core";
import { TagInputQA } from "./TagInputQA";

afterEach(cleanup);

test("TagInput", async () => {
  const Wrapper = () => {
    const [values, setValues] = React.useState<string[]>(["aaa", "bbb"]);

    return (
      <TagInput
        values={values}
        onChange={(values: Array<any>) =>
          (console.log("yooyoyo", values) as any) || setValues(values)
        }
      />
    );
  };
  const { container } = render(<Wrapper />);

  const component = mount(TagInputQA, container);

  // console.log(prettyDOM(component.element));
  expect(component.values).toEqual(["aaa", "bbb"]);

  component.addValue("ccc");

  await new Promise(resolve => setTimeout(resolve, 100));
  console.log(prettyDOM(component.element));
  console.log(component.values);
  expect(component.values).toEqual(["aaa", "bbb", "ccc"]);
});
