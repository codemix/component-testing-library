import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount } from "component-testing-library";
import { Intent, Spinner } from "@blueprintjs/core";
import { SpinnerQA } from "./SpinnerQA";

afterEach(cleanup);

test("Spinner", () => {
  const { container } = render(<Spinner intent={Intent.DANGER} />);

  const component = mount(SpinnerQA, container);

  expect(component.intent).toBe(Intent.DANGER);
});
