import {
  QA,
  classNamesToSelector,
  matchText,
  firstOrUndefined,
  atLeastOne,
  hasClassNames
} from "component-testing-library";
import { Classes } from "@blueprintjs/core";
import { Matcher } from "react-testing-library";

export class TabsQA extends QA {
  static componentName = "Tabs";

  static get selector() {
    return classNamesToSelector(Classes.TABS);
  }

  get tabList() {
    return this.get(TabListQA);
  }

  get tabs() {
    return this.tabList.tabs;
  }

  get selectedTab() {
    return this.tabList.selectedTab;
  }

  get panels() {
    return this.getAll(TabPanelQA);
  }

  get visiblePanel() {
    return this.panels.find(panel => panel.isVisible);
  }

  get isVertical() {
    return hasClassNames(this.element, Classes.VERTICAL);
  }

  queryTabsById(matcher: Matcher) {
    return this.tabs.filter(item => matchText(item.id, item.element, matcher));
  }

  queryTabById(matcher: Matcher) {
    return firstOrUndefined(this.queryTabsById(matcher));
  }

  getTabsById(matcher: Matcher) {
    return atLeastOne(
      this.queryTabsById(matcher),
      `Could not find any tabs matching id: ${String(matcher)}`
    );
  }

  getTabById(matcher: Matcher) {
    return this.getTabsById(matcher)[0];
  }

  queryTabsByTitle(matcher: Matcher) {
    return this.tabs.filter(item =>
      matchText(item.title, item.element, matcher)
    );
  }

  queryTabByTitle(matcher: Matcher) {
    return firstOrUndefined(this.queryTabsByTitle(matcher));
  }

  getTabsByTitle(matcher: Matcher) {
    return atLeastOne(
      this.queryTabsByTitle(matcher),
      `Could not find any tabs matching title: ${String(matcher)}`
    );
  }

  getTabByTitle(matcher: Matcher) {
    return this.getTabsByTitle(matcher)[0];
  }
}

export class TabListQA extends QA {
  static componentName = "TabList";

  static get selector() {
    return classNamesToSelector(Classes.TAB_LIST);
  }

  get tabs() {
    return this.getAll(TabQA);
  }

  get selectedTab() {
    return this.tabs.find(tab => tab.isSelected);
  }
}

export class TabQA extends QA {
  static componentName = "Tab";

  static get selector() {
    return classNamesToSelector(Classes.TAB);
  }

  get id() {
    return this.element.dataset.tabId || "";
  }

  get title() {
    return this.textContent;
  }

  get isSelected() {
    return this.element.getAttribute("aria-selected") === "true";
  }
}

export class TabPanelQA extends QA {
  static componentName = "TabPanel";

  static get selector() {
    return classNamesToSelector(Classes.TAB_PANEL);
  }

  get isVisible() {
    return this.element.getAttribute("aria-hidden") !== "true";
  }
}
