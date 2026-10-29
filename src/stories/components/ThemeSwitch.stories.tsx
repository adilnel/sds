import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { applyTheme } from "hooks";
import { ThemeSwitch } from "primitives";

// Same key useTheme persists to
const STORAGE_KEY = "sds-theme";

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

export const StoryThemeSwitchCycle: StoryObj<typeof ThemeSwitch> = {
  name: "Click through themes",
  parameters: {
    docs: {
      description: {
        story:
          "Each click moves to the next theme: System → Light → Dark → System. The Interactions panel replays the clicks and checks the theme and the saved choice after each one.",
      },
    },
  },
  // Start from System and leave the page as we found it
  beforeEach: () => {
    localStorage.removeItem(STORAGE_KEY);
    applyTheme("system");
    return () => {
      localStorage.removeItem(STORAGE_KEY);
      applyTheme("system");
    };
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvasElement.ownerDocument.documentElement;
    const button = canvas.getByRole("button");

    await step("Starts on System, following the OS setting", async () => {
      await expect(button).toHaveAccessibleName(
        "Theme: system. Switch to light",
      );
      await expect(root).not.toHaveAttribute("data-theme");
      await expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    await step("Click: System → Light", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAccessibleName("Theme: light. Switch to dark");
      await expect(root).toHaveAttribute("data-theme", "light");
      await expect(localStorage.getItem(STORAGE_KEY)).toBe("light");
    });

    await step("Click: Light → Dark", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAccessibleName(
        "Theme: dark. Switch to system",
      );
      await expect(root).toHaveAttribute("data-theme", "dark");
      await expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    });

    await step("Click: Dark → System, clearing the saved choice", async () => {
      await userEvent.click(button);
      await expect(button).toHaveAccessibleName(
        "Theme: system. Switch to light",
      );
      await expect(root).not.toHaveAttribute("data-theme");
      await expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  },
};
