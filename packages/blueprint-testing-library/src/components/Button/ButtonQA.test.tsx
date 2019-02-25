import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Button, Intent, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ButtonQA } from "./ButtonQA";

afterEach(cleanup);

test("Button with text", () => {
  const { container } = render(
    <Button text="Hello World" intent={Intent.PRIMARY} />
  );

  const component = mount(ButtonQA, container);

  expect(component.text).toBe("Hello World");
  expect(component.intent).toBe(Intent.PRIMARY);
  expect(component.alignText).toBe(Alignment.CENTER);
});

test("Button with text and left icon", () => {
  const { container } = render(
    <Button
      text="Hello World"
      icon={IconNames.AIRPLANE}
      alignText={Alignment.LEFT}
    />
  );

  const component = mount(ButtonQA, container);

  const { icon } = component;

  expect(icon && icon.iconName).toBe(IconNames.AIRPLANE);
  expect(component.alignText).toBe(Alignment.LEFT);
});

test("Button with text and left and right icons", () => {
  const { container } = render(
    <Button
      text="Hello World"
      icon={IconNames.AIRPLANE}
      rightIcon={IconNames.CARET_DOWN}
      alignText={Alignment.LEFT}
    />
  );

  const component = mount(ButtonQA, container);

  const { icon, rightIcon } = component;

  expect(icon && icon.iconName).toBe(IconNames.AIRPLANE);
  expect(rightIcon && rightIcon.iconName).toBe(IconNames.CARET_DOWN);
  expect(component.alignText).toBe(Alignment.LEFT);
});

test("Button with right icon", () => {
  const { container } = render(
    <Button text="Hello World" rightIcon={IconNames.CARET_DOWN} />
  );

  const component = mount(ButtonQA, container);

  const { icon, rightIcon } = component;

  expect(icon).toBe(undefined);
  expect(rightIcon && rightIcon.iconName).toBe(IconNames.CARET_DOWN);
});

test("Button with click handler", () => {
  let clicks = 0;
  const onClick = () => {
    clicks++;
  };
  const { container } = render(<Button text="Hello World" onClick={onClick} />);

  const component = mount(ButtonQA, container);
  expect(clicks).toBe(0);
  component.click();
  expect(clicks).toBe(1);
});
