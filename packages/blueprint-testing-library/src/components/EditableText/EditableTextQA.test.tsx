import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { EditableText, Intent } from "@blueprintjs/core";
import { EditableTextQA } from "./EditableTextQA";

afterEach(cleanup);

test("EditableText with value", () => {
  const { container } = render(<EditableText defaultValue="yo yo yo" />);

  const component = mount(EditableTextQA, container);

  expect(component.value).toBe("yo yo yo");
  expect(component.isEditing).toBe(false);
});

test("EditableText with placeholder", () => {
  const { container } = render(
    <EditableText defaultValue="" placeholder="yeah" />
  );

  const component = mount(EditableTextQA, container);

  expect(component.value).toBe("");
  expect(component.isEditing).toBe(false);
});

test("EditableText editing", () => {
  const { container } = render(
    <EditableText isEditing defaultValue="yo yo yo" />
  );

  const component = mount(EditableTextQA, container);

  expect(component.value).toBe("yo yo yo");
  expect(component.isEditing).toBe(true);
});

test("EditableText interactions", () => {
  const { container } = render(<EditableText defaultValue="yo yo yo" />);

  const component = mount(EditableTextQA, container);

  expect(component.value).toBe("yo yo yo");
  expect(component.isEditing).toBe(false);
  component.value = "hello world";
  expect(component.value).toBe("hello world");
  expect(component.isEditing).toBe(false);
});
