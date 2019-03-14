import * as React from "react";
import { render, cleanup, prettyDOM } from "react-testing-library";
import { mount, QA } from "component-testing-library";
import { IconNames } from "@blueprintjs/icons";
import { Menu, MenuItem, ContextMenu } from "@blueprintjs/core";
import { ContextMenuQA } from "./ContextMenuQA";

afterEach(cleanup);
const clicks = { Add: 0, Remove: 0 };

class RightClickMe extends React.Component {
  handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menu = (
      <Menu>
        <MenuItem
          icon={IconNames.ADD}
          text="Add"
          onClick={() => clicks.Add++}
        />
        <MenuItem
          icon={IconNames.REMOVE}
          text="Remove"
          onClick={() => clicks.Remove++}
        />
      </Menu>
    );

    ContextMenu.show(menu, { left: e.clientX, top: e.clientY });
  };

  render() {
    return (
      <div data-testid="RightClickMe" onContextMenu={this.handleContextMenu}>
        Right Click Me
      </div>
    );
  }
}

class RightClickMeQA extends QA {
  static componentName = "RightClickMe";
}

test("Menu", () => {
  const { container } = render(<RightClickMe />);

  const target = mount(RightClickMeQA, container);

  target.contextMenu();

  const component = mount(ContextMenuQA, document.body);
  expect(component.items).toHaveLength(2);

  const add = component.getItemByText("Add");
  const remove = component.getItemByIcon(IconNames.REMOVE);

  add.click();
  remove.click();
  expect(clicks).toEqual({ Add: 1, Remove: 1 });
});
