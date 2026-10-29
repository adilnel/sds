import { type Theme, useTheme } from "hooks";
import { IconMonitor, IconMoon, IconSun } from "icons";
import { IconButton, type IconButtonProps } from "primitives";

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

export type ThemeSwitchProps = Omit<
  IconButtonProps,
  "aria-label" | "onPress" | "children"
>;

/**
 * Cycles the color theme: System → Light → Dark.
 */
export function ThemeSwitch({
  variant = "neutral",
  ...props
}: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  return (
    <IconButton
      {...props}
      variant={variant}
      aria-label={`Theme: ${theme}. Switch to ${nextTheme[theme]}`}
      onPress={() => setTheme(nextTheme[theme])}
    >
      {themeIcon[theme]}
    </IconButton>
  );
}
