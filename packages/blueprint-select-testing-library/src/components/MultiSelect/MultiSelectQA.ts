import { PopoverQA, TagInputQA, MenuQA } from "blueprint-testing-library";
import { Matcher } from "dom-testing-library";

export class MultiSelectQA extends PopoverQA {
  static componentName = "MultiSelect";

  get tagInput() {
    return this.target.get(TagInputQA);
  }

  get values() {
    return this.tagInput.values;
  }

  set values(values: string[]) {
    this.tagInput.values = values;
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
    const { tagInput } = this;
    tagInput.focus();
    tagInput.ghostInput.value = value;
  }

  selectItemsByText(matcher: Matcher) {
    const { menu } = this;
    if (menu == null) {
      throw new Error("Cannot selectItemByText when select is not open.");
    }
    const item = menu.getItemByText(matcher);
    item.click();
  }
}
