import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import { QA, mount } from "./QA";
import { createQAContext } from "./QAContext";
import { makeUnion } from "./makeUnion";

describe("QA", () => {
  const Button = ({ children, ...extra }: any) => (
    <button data-testid="Button" {...extra}>
      {children}
    </button>
  );

  const ButtonGroup = ({ children, ...extra }: any) => (
    <div data-testid="ButtonGroup" {...extra}>
      {children}
    </div>
  );

  const Toolbar = ({ children, ...extra }: any) => (
    <div data-testid="Toolbar" {...extra}>
      {children}
    </div>
  );

  const Divider = ({ children, ...extra }: any) => (
    <div data-testid="Divider" {...extra}>
      {children}
    </div>
  );

  const TestToolbar = ({ onButtonClick }: any) => (
    <Toolbar data-testid="TestToolbar">
      <ButtonGroup>
        <Button onClick={() => onButtonClick("A")}>A</Button>
        <Button onClick={() => onButtonClick("B")}>B</Button>
        <Button onClick={() => onButtonClick("C")}>C</Button>
      </ButtonGroup>
      <Divider />
      <ButtonGroup>
        <Button onClick={() => onButtonClick("X")}>X</Button>
        <Button onClick={() => onButtonClick("Y")}>Y</Button>
        <Button onClick={() => onButtonClick("Z")}>Z</Button>
      </ButtonGroup>
    </Toolbar>
  );

  class ButtonQA extends QA {
    static componentName = "Button";

    toString() {
      return `Button[${this.textContent}]`;
    }
  }

  class DividerQA extends QA {
    static componentName = "Divider";
  }

  class ButtonGroupQA extends QA {
    static componentName = "ButtonGroup";

    get buttons() {
      return this.getAll(ButtonQA);
    }
  }

  const DividerOrButtonGroupQA = makeUnion(ButtonGroupQA, DividerQA);

  class ToolbarQA extends QA {
    static componentName = "Toolbar";

    get buttonGroups() {
      return this.getAll(ButtonGroupQA);
    }

    get children() {
      return this.getAll(DividerOrButtonGroupQA);
    }
  }

  class TestToolbarQA extends ToolbarQA {
    static componentName = "TestToolbar";
    get buttonA(): ButtonQA {
      return this.getByText(ButtonQA, "A");
    }
    get buttonB(): ButtonQA {
      return this.getByText(ButtonQA, "B");
    }
    get buttonC(): ButtonQA {
      return this.getByText(ButtonQA, "C");
    }
  }

  test("it should mount a component", () => {
    const clicks: { [name: string]: number } = {};
    const { container } = render(
      <TestToolbar
        onButtonClick={(buttonName: string) => {
          clicks[buttonName] = clicks[buttonName] || 0;
          clicks[buttonName]++;
        }}
      />
    );
    const context = createQAContext();
    const component = mount(TestToolbarQA, container, undefined, context);
    console.log(component);
    component.buttonA.click();
    component.interaction("Click B and C", () => {
      component.buttonB.click();
      component.buttonC.click();
    });
    component.buttonA.click();

    console.log(clicks);
    console.log(JSON.stringify(context.eventRecorder, null, 2));
    console.log(context.eventRecorder.toString());

    console.log(component.children);
    // component.buttonGroups[0].buttons[0].click();
  });
});
