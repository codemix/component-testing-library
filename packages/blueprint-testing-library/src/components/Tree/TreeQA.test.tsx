import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { mount } from "component-testing-library";
import { Tree, ITreeNode, Tooltip, Position, Icon } from "@blueprintjs/core";
import { TreeQA } from "./TreeQA";

afterEach(cleanup);

const INITIAL_STATE: ITreeNode[] = [
  {
    id: 0,
    hasCaret: true,
    icon: "folder-close",
    label: "Folder 0"
  },
  {
    id: 1,
    icon: "folder-close",
    isExpanded: true,
    label: (
      <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
        Folder 1
      </Tooltip>
    ),
    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item 0",
        secondaryLabel: (
          <Tooltip content="An eye!">
            <Icon icon="eye-open" />
          </Tooltip>
        )
      },
      {
        id: 3,
        icon: "tag",
        label:
          "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man."
      },
      {
        id: 4,
        hasCaret: true,
        icon: "folder-close",
        label: (
          <Tooltip content="foo" position={Position.RIGHT}>
            Folder 2
          </Tooltip>
        ),
        childNodes: [
          { id: 5, label: "No-Icon Item" },
          { id: 6, icon: "tag", label: "Item 1" },
          {
            id: 7,
            hasCaret: true,
            icon: "folder-close",
            label: "Folder 3",
            childNodes: [
              { id: 8, icon: "document", label: "Item 0" },
              { id: 9, icon: "tag", label: "Item 1" }
            ]
          }
        ]
      }
    ]
  }
];

test("Tree", () => {
  const { container } = render(<Tree contents={INITIAL_STATE} />);

  const component = mount(TreeQA, container);

  const folder2 = component.getNodeByLabel("Folder 2");
  expect(folder2.isExpanded).toBe(false);
  expect(folder2.isSelected).toBe(false);
  expect(folder2.hasCaret).toBe(true);
});
