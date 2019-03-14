import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Drawer, Intent, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { DrawerQA } from "./DrawerQA";

afterEach(cleanup);

test("Drawer with text", () => {
  let isClosed = false;

  render(
    <Drawer
      icon={IconNames.AIRPLANE}
      title="Demo Drawer"
      isOpen={true}
      onClose={() => {
        isClosed = true;
      }}
    >
      <div className={Classes.DRAWER_BODY}>Hello World</div>
      <div className={Classes.DRAWER_FOOTER}>foo bar</div>
    </Drawer>
  );
  const component = mount(DrawerQA, document.body);

  expect(component.icon && component.icon.iconName).toBe(IconNames.AIRPLANE);
  expect(component.body.textContent).toBe("Hello World");
  expect(component.footer.textContent).toBe("foo bar");

  component.close();

  expect(isClosed).toBe(true);
});
