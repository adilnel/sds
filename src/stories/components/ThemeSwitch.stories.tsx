import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitch } from "primitives";

const meta: Meta<typeof ThemeSwitch> = {
  component: ThemeSwitch,
  title: "SDS Components/Theme Switch",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryThemeSwitch: StoryObj<typeof ThemeSwitch> = {
  name: "Theme Switch",
  args: {
    variant: "neutral",
    size: "medium",
    isDisabled: false,
  },
  argTypes: {
    href: { table: { disable: true } },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "neutral", "subtle"],
    },
  },
};
