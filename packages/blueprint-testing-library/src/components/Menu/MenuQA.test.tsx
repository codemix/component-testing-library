import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount } from "component-testing-library";
import { IconNames } from "@blueprintjs/icons";
import { Menu, MenuItem } from "@blueprintjs/core";
import { MenuQA } from "./MenuQA";

afterEach(cleanup);

test("Menu", () => {
  const clicks = { Add: 0, Remove: 0 };
  const { container } = render(
    <Menu>
      <MenuItem icon={IconNames.ADD} text="Add" onClick={() => clicks.Add++} />
      <MenuItem
        icon={IconNames.REMOVE}
        text="Remove"
        onClick={() => clicks.Remove++}
      />
    </Menu>
  );

  const component = mount(MenuQA, container);
  expect(component.items).toHaveLength(2);

  const add = component.getItemByText("Add");
  const remove = component.getItemByIcon(IconNames.REMOVE);

  add.click();
  remove.click();
  expect(clicks).toEqual({ Add: 1, Remove: 1 });
});
