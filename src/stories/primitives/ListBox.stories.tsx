import type { Meta, StoryObj } from "@storybook/react";
import { placeholder } from "images";
import { Description, Label, ListBox, ListBoxItem } from "primitives";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  title: "SDS Primitives/ListBox",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ListBox>;

export const StoryListBox: Story = {
  name: "List Box",
  args: {
    layout: "stack",
    orientation: "vertical",
    selectionMode: "single",
    defaultSelectedKeys: ["dog"],
    disabledKeys: ["koala"],
  },
  argTypes: {
    layout: { options: ["stack", "grid"], control: { type: "select" } },
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
    selectionMode: {
      options: ["none", "single", "multiple"],
      control: { type: "select" },
    },
  },
  render: (args) => {
    return (
      <ListBox aria-label="Animals" style={{ width: 296 }} {...args}>
        <ListBoxItem id="aardvark">Aardvark</ListBoxItem>
        <ListBoxItem id="cat">Cat</ListBoxItem>
        <ListBoxItem id="dog">Dog</ListBoxItem>
        <ListBoxItem id="kangaroo">Kangaroo</ListBoxItem>
        <ListBoxItem id="koala">Koala</ListBoxItem>
        <ListBoxItem id="turtle" textValue="Turtle">
          <Label>Turtle</Label>
          <Description>Slow and steady</Description>
        </ListBoxItem>
        <ListBoxItem id="admin" textValue="Admin">
          <img slot="image" src={placeholder} alt="" />
          <Label>Admin</Label>
          <Description>Full access</Description>
        </ListBoxItem>
      </ListBox>
    );
  },
};
