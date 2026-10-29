import { type Theme, useTheme } from "hooks";
import { IconMonitor, IconMoon, IconSun } from "icons";
import { IconButton } from "primitives";

const nextTheme: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const themeIcon = {
  system: <IconMonitor />,
  light: <IconSun />,
  dark: <IconMoon />,
};

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  // Button drops the style prop, so position the wrapper instead
  return (
    <div
      style={{
        position: "fixed",
        insetBlockEnd: "var(--sds-size-space-400)",
        insetInlineEnd: "var(--sds-size-space-400)",
        zIndex: 1,
      }}
    >
      <IconButton
        variant="neutral"
        aria-label={`Theme: ${theme}. Switch to ${nextTheme[theme]}`}
        onPress={() => setTheme(nextTheme[theme])}
      >
        {themeIcon[theme]}
      </IconButton>
    </div>
  );
}
