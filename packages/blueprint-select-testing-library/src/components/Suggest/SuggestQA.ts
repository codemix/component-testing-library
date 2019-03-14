import { PopoverQA, InputGroupQA, MenuQA } from "blueprint-testing-library";
import { Matcher } from "dom-testing-library";

export class SuggestQA extends PopoverQA {
  static componentName = "Suggest";

  get inputGroup() {
    return this.target.get(InputGroupQA);
  }

  get value() {
    return this.inputGroup.value;
  }

  set value(value: string) {
    this.inputGroup.value = value;
  }

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

  suggest(value: string) {
    const { inputGroup } = this;
    inputGroup.focus();
    inputGroup.value = value;
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
