import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { HTMLTable } from "@blueprintjs/core";
import { HTMLTableQA } from "./HTMLTableQA";

afterEach(cleanup);

test("HTMLTable without modifiers", () => {
  const { container } = render(
    <HTMLTable>
      <thead>
        <tr>
          <th>Hello</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>World</td>
        </tr>
      </tbody>
    </HTMLTable>
  );

  const component = mount(HTMLTableQA, container);
  expect(component.isInteractive).toBe(false);
  expect(component.isStriped).toBe(false);
  expect(component.isCondensed).toBe(false);
});

test("HTMLTable with modifiers", () => {
  const { container } = render(
    <HTMLTable interactive striped condensed>
      <thead>
        <tr>
          <th>Hello</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>World</td>
        </tr>
      </tbody>
    </HTMLTable>
  );

  const component = mount(HTMLTableQA, container);
  expect(component.isInteractive).toBe(true);
  expect(component.isStriped).toBe(true);
  expect(component.isCondensed).toBe(true);
});
