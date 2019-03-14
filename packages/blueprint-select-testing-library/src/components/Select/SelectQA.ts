import {
  PopoverQA,
  InputGroupQA,
  MenuQA,
  ButtonQA
} from "blueprint-testing-library";
import { Matcher } from "dom-testing-library";

export class SelectQA extends PopoverQA {
  static componentName = "Select";

  get menu() {
    if (this.isOpen) {
      return this.content.get(MenuQA);
    }
  }

  get items() {
    const { menu } = this;
    return menu == null ? [] : menu.items;
  }

  get selectedItem() {
    return this.items.find(item => item.isActive);
  }

  get selectedItemText() {
    const { selectedItem } = this;
    if (selectedItem != null) {
      return selectedItem.text;
    }
    const { target } = this;
    const button = target.query(ButtonQA);
    if (button != null) {
      return button.text;
    }
    return target.textContent;
  }

  get inputGroup() {
    if (this.isOpen) {
      return this.content.get(InputGroupQA);
    }
  }

  get filterText() {
    const { inputGroup } = this;
    return inputGroup == null ? "" : inputGroup.value;
  }

  set filterText(value: string) {
    const { inputGroup } = this;
    if (inputGroup == null) {
      throw new Error("Cannot set filterText when select is not open.");
    }
    inputGroup.value = value;
  }

  clearFilter() {
    const { inputGroup } = this;
    if (inputGroup == null) {
      throw new Error("Cannot clearFilter when select is not open.");
    }
    const { rightElement } = inputGroup;
    if (rightElement != null) {
      rightElement.get(ButtonQA).click();
    }
  }

  selectItemByText(matcher: Matcher) {
    const { menu } = this;
    if (menu == null) {
      throw new Error("Cannot selectItemByText when select is not open.");
    }
    const item = menu.getItemByText(matcher);
    item.click();
  }
}
