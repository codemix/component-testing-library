import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Slider } from "@blueprintjs/core";
import { SliderQA } from "./SliderQA";

afterEach(cleanup);

test("Slider", () => {
  const Wrapper = () => {
    const [value, setValue] = React.useState(3);
    return (
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={10}
        labelStepSize={5}
      />
    );
  };

  const { container } = render(<Wrapper />);

  mount(SliderQA, container);

  // @todo it is currently hard / impossible to read or set the value for a slider purely from HTML.
  // we should find an accessible way to add this to blueprint itself.
});
