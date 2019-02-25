import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { InputGroupQA } from "./InputGroupQA";
import { InputGroup, Intent, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

afterEach(cleanup);

test("InputGroup without modifiers", () => {
  const Wrapper = () => {
    const [value, setValue] = React.useState("a");
    return (
      <InputGroup
        value={value}
        onChange={(e: any) => setValue(e.currentTarget.value)}
      />
    );
  };

  const { container } = render(<Wrapper />);

  const component = mount(InputGroupQA, container);
  expect(component.intent).toBe(Intent.NONE);
  expect(component.leftIcon).toBeUndefined();
  expect(component.rightElement).toBeUndefined();
  expect(component.isSmall).toBe(false);
  expect(component.isDisabled).toBe(false);
  expect(component.isSmall).toBe(false);
  expect(component.isLarge).toBe(false);

  expect(component.value).toBe("a");
  component.value = "c";
  expect(component.value).toBe("c");
});

test("InputGroup with modifiers", () => {
  const Wrapper = () => {
    const [value, setValue] = React.useState("a");
    return (
      <InputGroup
        intent={Intent.DANGER}
        leftIcon={IconNames.AIRPLANE}
        rightElement={<Button minimal text="Fly" />}
        large
        small
        round
        disabled
        value={value}
        onChange={(e: any) => setValue(e.currentTarget.value)}
      />
    );
  };
  const { container } = render(<Wrapper />);

  const component = mount(InputGroupQA, container);
  expect(component.intent).toBe(Intent.DANGER);
  expect(component.leftIcon && component.leftIcon.iconName).toBe(
    IconNames.AIRPLANE
  );
  expect(component.rightElement).toBeTruthy();
  expect(component.isSmall).toBe(true);
  expect(component.isDisabled).toBe(true);
  expect(component.isSmall).toBe(true);
  expect(component.isLarge).toBe(true);
  expect(component.value).toBe("a");
  component.value = "c";
  expect(component.value).toBe("c");
});
