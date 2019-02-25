import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import {
  Navbar,
  NavbarHeading,
  NavbarGroup,
  Alignment
} from "@blueprintjs/core";
import { NavbarQA } from "./NavbarQA";

afterEach(cleanup);

test("Navbar", () => {
  const { container } = render(
    <Navbar fixedToTop>
      <NavbarGroup>
        <NavbarHeading>Brand Here</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>Hello World</NavbarGroup>
    </Navbar>
  );

  const component = mount(NavbarQA, container);

  expect(component.heading.textContent).toBe("Brand Here");
  expect(component.groups).toHaveLength(2);
  expect(component.groups[1].align).toBe(Alignment.RIGHT);
  expect(component.isFixedToTop).toBe(true);
});
