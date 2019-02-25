import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Breadcrumbs } from "@blueprintjs/core";
import { BreadcrumbsQA } from "./BreadcrumbsQA";

afterEach(cleanup);

test("Breadcrumbs", () => {
  const { container } = render(
    <Breadcrumbs
      minVisibleItems={1}
      items={[
        { icon: "folder-close", text: "All files" },
        { icon: "folder-close", text: "Users" },
        { icon: "folder-close", text: "Janet" },
        { href: "#", icon: "folder-close", text: "Photos" },
        { href: "#", icon: "folder-close", text: "Wednesday" },
        { icon: "document", text: "image.jpg" }
      ]}
    />
  );

  const component = mount(BreadcrumbsQA, container);

  expect(component.isOverflowing).toBe(true);

  expect(component.currentItem && component.currentItem.textContent).toBe(
    "image.jpg"
  );
});
