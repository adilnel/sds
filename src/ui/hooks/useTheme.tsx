import { useCallback, useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "sds-theme";

/**
 * Sets data-theme on <html> so theme.css can force the light or dark scheme.
 * "system" removes the attribute and falls back to prefers-color-scheme.
 */
export function applyTheme(theme: Theme) {
  const root = globalThis.document?.documentElement;
  if (!root) return;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

function readStoredTheme(): Theme {
  try {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked site data)
  }
  return "system";
}

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      if (next === "system") {
        globalThis.localStorage?.removeItem(STORAGE_KEY);
      } else {
        globalThis.localStorage?.setItem(STORAGE_KEY, next);
      }
    } catch {
      // Ignore storage failures; the theme still applies for this visit
    }
    setThemeState(next);
  }, []);

  return { theme, setTheme };
};
