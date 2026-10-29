import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/theme.css";
import { applyTheme, type Theme } from "../src/ui/hooks/useTheme";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
  },

  globalTypes: {
    theme: {
      description: "Light or dark SDS color scheme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "system", title: "System", icon: "browser" },
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "system",
  },
  decorators: [
    (Story, context) => {
      applyTheme((context.globals.theme ?? "system") as Theme);
      return <Story />;
    },
  ],

  tags: [],
};

export default preview;
