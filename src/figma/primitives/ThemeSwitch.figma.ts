// url=<FIGMA_BUTTONS_THEME_SWITCH>
// source=https://github.com/adilnel/sds/blob/main/src/ui/primitives/ThemeSwitch/ThemeSwitch.tsx
// component=ThemeSwitch

import figma from "figma";

export default {
  id: "ThemeSwitch",
  imports: ['import { ThemeSwitch } from "primitives";'],
  example: figma.code`<ThemeSwitch />`,
  metadata: { nestable: true },
};
