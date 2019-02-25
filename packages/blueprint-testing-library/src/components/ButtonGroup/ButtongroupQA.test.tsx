import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Button, Intent, ButtonGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ButtonGroupQA } from "./ButtonGroupQA";

afterEach(cleanup);

test("ButtonGroup", () => {
  const { container } = render(
    <ButtonGroup minimal>
      <Button text="Add" intent={Intent.PRIMARY} icon={IconNames.ADD} />
      <Button text="Remove" intent={Intent.DANGER} icon={IconNames.REMOVE} />
    </ButtonGroup>
  );

  const component = mount(ButtonGroupQA, container);

  expect(component.buttons.length).toBe(2);
  expect(component.isMinimal).toBe(true);

  component.getButtonByText("Add");
  component.getButtonByIcon(IconNames.REMOVE);
});
