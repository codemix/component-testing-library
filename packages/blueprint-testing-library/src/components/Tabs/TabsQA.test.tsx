import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Tabs, Tab } from "@blueprintjs/core";
import { TabsQA } from "./TabsQA";

afterEach(cleanup);

test("Tabs", () => {
  const Panel = ({ name }: any) => <div>Panel {name}</div>;
  const { container } = render(
    <Tabs id="TabsQATest" defaultSelectedTabId="BBB">
      <Tab id="AAA" title="A-A-A" panel={<Panel name="AAA" />} />
      <Tab id="BBB" title="B-B-B" panel={<Panel name="BBB" />} />
      <Tab id="CCC" title="C-C-C" panel={<Panel name="CCC" />} />
    </Tabs>
  );

  const component = mount(TabsQA, container);

  const { tabs, panels, selectedTab, visiblePanel } = component;

  expect(tabs).toHaveLength(3);
  expect(panels).toHaveLength(3);
  expect(selectedTab && selectedTab.id).toBe("BBB");

  const tabA = component.getTabById("AAA");
  const tabB = component.getTabById("BBB");
  const tabC = component.getTabByTitle("C-C-C");

  expect(tabA.title).toBe("A-A-A");
  expect(tabB.title).toBe("B-B-B");
  expect(tabC.title).toBe("C-C-C");

  expect(visiblePanel).toBeTruthy();

  tabA.click();

  expect(component.selectedTab && component.selectedTab.id).toBe("AAA");
});
