import type { Meta, StoryObj } from "@storybook/react";
import { IconActivity, IconArrowLeft } from "icons";
import { Button, ButtonDanger, ButtonGroup } from "primitives";
import type { ComponentProps } from "react";

// Mirrors the "Has Icon Start" / "Has Icon End" properties in Figma
type IconToggleArgs = {
  hasIconStart: boolean;
  hasIconEnd: boolean;
};

const iconToggleArgTypes = {
  hasIconStart: {
    name: "Has Icon Start",
    control: { type: "boolean" },
  },
  hasIconEnd: {
    name: "Has Icon End",
    control: { type: "boolean" },
  },
} as const;

const meta: Meta<typeof Button> = {
  component: Button,
  title: "SDS Primitives/Buttons",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryButton: StoryObj<
  ComponentProps<typeof Button> & IconToggleArgs
> = {
  name: "Button",
  args: {
    children: "Hello world",
    variant: "primary",
    hasIconStart: true,
    hasIconEnd: true,
  },
  argTypes: {
    ...iconToggleArgTypes,
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "neutral", "subtle"],
    },
  },
  render: ({ children, hasIconStart, hasIconEnd, ...props }) => (
    <Button {...props}>
      {hasIconStart && <IconArrowLeft />}
      {children}
      {hasIconEnd && <IconActivity />}
    </Button>
  ),
};

export const StoryButtonDanger: StoryObj<
  ComponentProps<typeof ButtonDanger> & IconToggleArgs
> = {
  name: "Button Danger",
  args: {
    children: "Hello world",
    variant: "danger-primary",
    hasIconStart: true,
    hasIconEnd: true,
  },
  argTypes: {
    ...iconToggleArgTypes,
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["danger-primary", "danger-subtle"],
    },
  },
  render: ({ children, hasIconStart, hasIconEnd, ...props }) => (
    <ButtonDanger {...props}>
      {hasIconStart && <IconArrowLeft />}
      {children}
      {hasIconEnd && <IconActivity />}
    </ButtonDanger>
  ),
};

export const StoryButtonGroup: StoryObj<typeof ButtonGroup> = {
  name: "Button Group",
  args: {
    align: "center",
  },
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["center", "start", "end", "justify", "stack"],
    },
  },
  render: ({ ...props }) => (
    <ButtonGroup {...props} style={{ width: 300 }}>
      <Button variant="neutral">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  ),
};
