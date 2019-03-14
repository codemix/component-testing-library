# component-testing-library

## What is it?

This is a library which makes it easy to test complex UIs and design systems by breaking up tests into small, reusable chunks that can be composed together, mirroring the way the UI itself is composed of components. It's built on top of [dom-testing-library](https://testing-library.com), and is completely framework agnostic. The examples in these docs use React, but the patterns work just as well for applications built with Angular, Vue or any other component based framework.

The main idea behind this library is a pattern - every reusable component should have a corresponding QA component which knows how to interact with it. The QA component is responsible for locating the UI component in the DOM, and exposes methods for firing events, reading values, locating children etc. QA components can be composed of other QA components, producing a Domain Specific Language for interacting with your application.

## Why?

Because it's really hard to test big, complicated UIs and we want to make that easier. We love dom-testing-library for its simplicity and focus on testing software the way the user experiences it, but have found it hard to scale to large UIs. dom-testing-library is really great for testing small, leaf components, but can quickly become unwieldy for larger and more complicated components or pages.

The main problem is maintainability - testing a large component typically involves using a lot of selectors to locate individual DOM nodes in order to click them, check their contents or otherwise interact with them in some way. The bigger the component the more selectors. It's common to see tests full of lines like this:

```js
// ...
const searchForm = container.querySelector(".Navbar form.SearchForm");
const searchInput = getByLabelText(searchForm, "Search");
const searchButton = searchForm.querySelector("button");
// ...
```

But relying on selectors like this makes tests brittle - as soon as the component structure changes in some way, the tests start failing. On large codebases with large teams that often means a lot of time fixing broken tests. It's similar to how using Jest's snapshot testing on HTML elements ends up being a bad idea, because the snapshots change all the time and it's creating a dependency on the structure of the DOM, not what the user experiences.

`component-testing-library` solves this problem by moving all the selectors and interaction logic for an individual component into one place, called a QA component. So when the UI component code changes, the developer only needs to update the associated QA component, rather than potentially dozens of tests which use it. By adding methods to the QA component, we can build up a DSL which hides the complexities of the implementation from the tests. This makes tests shorter, easier to read, less repetitive, and much more robust.

## What does it look like?

For the simplest example, let's say we have a React `<Button />` component. It looks like this:

```js
// Button.js

import * as React from "react";

export function Button({ text, ...extra }) {
  return <button {...extra}>{text}</button>;
}
```

Our QA for this button looks like this:

```js
// Button.qa.js

import { QA } from "component-testing-library";

export class ButtonQA extends QA {
  static componentName = "Button";
  static selector = "button";

  get text() {
    return this.textContent;
  }
}
```

We define a `componentName` which is used to produce nice logging and error messages, and a `selector` which is used to select the element in the DOM. We also add a `text` accessor which reads the the corresponding text prop from the rendered React component.

We can now test our button like this:

```js
// Button.test.js

import * as React from "react";
import { render } from "react-testing-library";
import { mount } from "component-testing-library";
import { Button } from "./Button";
import { ButtonQA } from "./Button.qa";

test("Button", () => {
  let clicks = 0;
  const onClick = () => {
    clicks++;
  };
  const { container } = render(<Button onClick={onClick} text="Click Me" />);
  const button = mount(ButtonQA, container);

  expect(button.text).toBe("Click Me");

  button.click();
  button.click();
  button.click();
  expect(clicks).toBe(3);
});
```

So far so good, the code is similar in length to what we'd write if were were using dom-testing-library directly. Now let's create a new component which uses our new `<Button />` component.

Our new component will show a confirmation message and two buttons, "OK" and "Cancel". The React component is defined like this:

```js
// Confirmation.js

import * as React from "react";
import { Button } from "./Button";

export function Confirmation({ message, onConfirm, onCancel }) {
  return (
    <div className="Confirmation">
      <h4>{message}</h4>
      <Button text="OK" onClick={onConfirm} />
      <Button text="Cancel" onClick={onCancel} />
    </div>
  );
}
```

Our QA for the `<Confirmation />` can now use the existing `ButtonQA` to select buttons:

```js
// Confirmation.qa.js

import { QA } from "component-testing-library";
import { ButtonQA } from "./Button.qa";

export class ConfirmationQA extends QA {
  static componentName = "Confirmation";
  static selector = ".Confirmation";

  get message() {
    return this.querySelector("h4").textContent;
  }

  confirm() {
    this.getByText(ButtonQA, "OK").click();
  }

  cancel() {
    this.getByText(ButtonQA, "Cancel").click();
  }
}
```

Notice how we're exposing ways to interact with the component, via `confirm()` and `cancel()` without exposing the buttons themselves. If we need to change this component in future, to use e.g. links rather than buttons, it should not change the existing API and our tests should still pass. We can now test our `<Confirmation />` component like this:

```js
// Confirmation.test.js

import * as React from "react";
import { render } from "react-testing-library";
import { mount } from "component-testing-library";
import { Confirmation } from "./Confirmation";
import { ConfirmationQA } from "./Confirmation.qa";

test("Confirmation", () => {
  let clickedConfirm = false;
  let clickedCancel = false;

  const onConfirm = () => {
    clickedConfirm = true;
  };

  const onCancel = () => {
    clickedCancel = true;
  };

  const { container } = render(
    <Confirmation
      message="Are you sure?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );

  const confirmation = mount(ConfirmationQA, container);

  expect(confirmation.message).toBe("Are you sure?");

  confirmation.confirm();
  expect(clickedConfirm).toBe(true);

  confirmation.cancel();
  expect(clickedCancel).toBe(true);
});
```

This approach scales really well because the higher in the application hierarchy the test, the higher-level the DSL becomes, for example, a test at the very top `<App />` component might look like this:

```js
test("Signup for an account", () => {
  const { container } = render(<App />);
  const app = mount(AppQA, container);

  expect(app.isLoggedIn).toBe(false);
  app.signupWithDetails({
    firstName: "Testy",
    lastName: "McTestFace",
    password: "hunter2"
  });
  expect(app.isLoggedIn).toBe(true);
});
```

All of the complexity of interacting with the app is hidden behind this very high level API, making the tests super short and easy to verify.

## Does it work with Design Systems?

It works _so well_ with design systems. For each component in the design system, distribute a corresponding `QA` component. Now any application which uses the design system also gets a nice API for testing components built with that system.

## Installation

Install via yarn:

```sh
yarn add --dev component-testing-library
```

Or via npm:

```sh
npm install --save-dev component-testing-library
```
