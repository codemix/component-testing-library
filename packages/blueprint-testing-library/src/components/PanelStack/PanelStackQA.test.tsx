import * as React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByTestId
} from "react-testing-library";
import { mount } from "component-testing-library";
import { PanelStack, Button } from "@blueprintjs/core";
import { PanelStackQA } from "./PanelStackQA";
import { ButtonQA } from "../Button";

afterEach(cleanup);

test("PanelStack", async () => {
  const PanelA = ({ openPanel }: any) => (
    <div data-testid="PanelA">
      <Button
        text="Open B"
        onClick={() =>
          openPanel({
            component: PanelB,
            props: {},
            title: "Panel B"
          })
        }
      />
    </div>
  );
  const PanelB = () => <div data-testid="PanelB">This is panel B</div>;

  const { container } = render(
    <PanelStack
      initialPanel={{
        component: PanelA,
        title: "Panel A"
      }}
    />
  );

  const component = mount(PanelStackQA, container);

  expect(component.header.title).toBe("Panel A");
  expect(component.canGoBack).toBe(false);

  component.get(ButtonQA).click();

  await waitForElement(() => getByTestId(container, "PanelB"));

  expect(component.canGoBack).toBe(true);

  component.goBack();
  await waitForElement(() => getByTestId(container, "PanelA"));

  await new Promise(resolve => setTimeout(resolve, 500));

  expect(component.canGoBack).toBe(false);

  expect(component.currentPanel).toBeTruthy();
});
