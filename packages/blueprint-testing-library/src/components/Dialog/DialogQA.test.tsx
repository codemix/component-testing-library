import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Dialog, Classes, Button } from "@blueprintjs/core";
import { DialogQA } from "./DialogQA";
import { IconNames } from "@blueprintjs/icons";
import { ButtonQA } from "../Button";

afterEach(cleanup);

test("Dialog", () => {
  let closeClicked = false;
  render(
    <Dialog
      isOpen
      title="Demo Dialog"
      icon={IconNames.AIRPLANE}
      onClose={() => {
        closeClicked = true;
      }}
    >
      <div className={Classes.DIALOG_BODY}>Hello World</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button text="Yeah" />
        </div>
      </div>
    </Dialog>
  );

  const component = mount(DialogQA, document.body);

  expect(component.icon && component.icon.iconName).toBe(IconNames.AIRPLANE);
  expect(component.title).toBe("Demo Dialog");
  expect(component.body.textContent).toBe("Hello World");
  expect(component.footer.actions.get(ButtonQA).text).toBe("Yeah");

  expect(closeClicked).toBe(false);
  component.close();
  expect(closeClicked).toBe(true);
});
