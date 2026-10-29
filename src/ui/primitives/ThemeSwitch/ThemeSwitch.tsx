import { type Theme, useTheme } from "hooks";
import { IconMonitor, IconMoon, IconSun } from "icons";
import { IconButton, type IconButtonProps } from "primitives";

const nextTheme: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

// Resolved at render time: "icons" imports from "primitives", so a
// module-level reference would hit the circular import before it initializes
function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") return <IconSun />;
  if (theme === "dark") return <IconMoon />;
  return <IconMonitor />;
}

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
      <ThemeIcon theme={theme} />
    </IconButton>
  );
}
