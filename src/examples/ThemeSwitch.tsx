import { ThemeSwitch as ThemeSwitchButton } from "primitives";

export function ThemeSwitch() {
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
      <ThemeSwitchButton />
    </div>
  );
}
