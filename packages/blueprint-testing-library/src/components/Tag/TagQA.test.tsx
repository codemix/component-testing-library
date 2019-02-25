import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Tag, Intent } from "@blueprintjs/core";
import { TagQA } from "./TagQA";
import { IconNames } from "@blueprintjs/icons";

afterEach(cleanup);

test("Tag, no modifiers", () => {
  const { container } = render(<Tag>Demo</Tag>);

  const component = mount(TagQA, container);

  expect(component.text).toBe("Demo");
  expect(component.intent).toBe(Intent.NONE);
  expect(component.isActive).toBe(false);
  expect(component.isFill).toBe(false);
  expect(component.isInteractive).toBe(false);
  expect(component.isLarge).toBe(false);
  expect(component.isMinimal).toBe(false);
  expect(component.isRemovable).toBe(false);
  expect(component.isRound).toBe(false);
});

test("Tag, all modifiers", () => {
  let calls = 0;
  const { container } = render(
    <Tag
      intent={Intent.DANGER}
      icon={IconNames.HAND_UP}
      active
      fill
      interactive
      large
      minimal
      onRemove={() => {
        calls++;
      }}
      round
    >
      Demo
    </Tag>
  );

  const component = mount(TagQA, container);

  expect(component.text).toBe("Demo");
  expect(component.intent).toBe(Intent.DANGER);
  expect(component.isActive).toBe(true);
  expect(component.isFill).toBe(true);
  expect(component.isInteractive).toBe(true);
  expect(component.isLarge).toBe(true);
  expect(component.isMinimal).toBe(true);
  expect(component.isRemovable).toBe(true);
  expect(component.isRound).toBe(true);
  component.remove();
  expect(calls).toBe(1);
});
