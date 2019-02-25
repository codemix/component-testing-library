import { QA } from "component-testing-library";
import { Matcher } from "react-testing-library";
import { Classes } from "@blueprintjs/core";
import {
  classNamesToSelector,
  getElementText,
  hasClassNames,
  matchText,
  firstResultOrNull,
  atLeastOne
} from "../../utils";
import { IconQA } from "../Icon";

export class TreeQA extends QA {
  static componentName = "Tree";

  static get selector() {
    return classNamesToSelector(Classes.TREE);
  }

  get visibleNodes() {
    return this.getAll(TreeNodeQA);
  }

  queryNodesByLabel(matcher: Matcher) {
    return this.visibleNodes.filter(item =>
      matchText(item.label, item.element, matcher)
    );
  }

  queryNodeByLabel(matcher: Matcher) {
    return firstResultOrNull(this.queryNodesByLabel(matcher));
  }

  getNodesByLabel(matcher: Matcher) {
    return atLeastOne(
      this.queryNodesByLabel(matcher),
      `Could not find any visible nodes matching label: ${String(matcher)}`
    );
  }

  getNodeByLabel(matcher: Matcher) {
    return this.getNodesByLabel(matcher)[0];
  }
}

export class TreeNodeListQA extends QA {
  static componentName = "TreeNodeList";

  static get selector() {
    return classNamesToSelector(Classes.TREE_NODE_LIST);
  }
}

export class TreeNodeQA extends QA {
  static componentName = "TreeNode";

  static get selector() {
    return classNamesToSelector(Classes.TREE_NODE);
  }

  get label() {
    return getElementText(
      this.element,
      classNamesToSelector(Classes.TREE_NODE_LABEL)
    );
  }

  get secondaryLabel() {
    return getElementText(
      this.element,
      classNamesToSelector(Classes.TREE_NODE_SECONDARY_LABEL)
    );
  }

  get caret() {
    return this.query(IconQA, classNamesToSelector(Classes.TREE_NODE_CARET));
  }

  get icon() {
    return this.query(IconQA, classNamesToSelector(Classes.TREE_NODE_ICON));
  }

  get isExpanded() {
    return hasClassNames(this.element, Classes.TREE_NODE_EXPANDED);
  }

  get isSelected() {
    return hasClassNames(this.element, Classes.TREE_NODE_SELECTED);
  }

  get hasCaret() {
    return this.caret != null;
  }

  expand() {
    const { caret } = this;
    if (caret != null && !this.isExpanded) {
      caret.click();
    }
  }

  collapse() {
    const { caret } = this;
    if (caret != null && this.isExpanded) {
      caret.click();
    }
  }

  toggle() {
    const { caret } = this;
    if (caret != null) {
      caret.click();
    }
  }
}
