import type { Meta, StoryObj } from "@storybook/react";
import * as icons from "icons";
import type { IconProps, IconSize } from "primitives";
import { useState } from "react";

type IconComponent = (props: IconProps) => JSX.Element;
const allIcons = Object.entries(icons) as [string, IconComponent][];
const iconNames = allIcons.map(([name]) => name);

const sizes: IconSize[] = ["14", "16", "20", "24", "32", "40", "48"];
const colors = [
  "default-default",
  "default-secondary",
  "default-tertiary",
  "brand-default",
  "neutral-default",
  "positive-default",
  "warning-default",
  "danger-default",
  "disabled-default",
];

type GalleryArgs = {
  filter: string;
  size: IconSize;
  color: string;
};

const meta: Meta<GalleryArgs> = {
  title: "SDS Components/Icons",
  parameters: { layout: "padded" },
  argTypes: {
    filter: { control: { type: "text" } },
    size: { control: { type: "select" }, options: sizes },
    color: { control: { type: "select" }, options: colors },
  },
};
export default meta;

const galleryStyles = `
.sds-icon-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--sds-size-space-200);
}
.sds-icon-gallery-item {
  all: unset;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sds-size-space-200);
  min-height: 96px;
  padding: var(--sds-size-space-300) var(--sds-size-space-200);
  border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-default);
  border-radius: var(--sds-size-radius-200);
  background: var(--sds-color-background-default-default);
  cursor: pointer;
}
.sds-icon-gallery-item:hover {
  background: var(--sds-color-background-default-default-hover);
}
.sds-icon-gallery-item:focus-visible {
  outline: 2px solid var(--sds-color-border-brand-default);
  outline-offset: 2px;
}
.sds-icon-gallery-item .icon {
  --icon-color: var(--sds-icon-gallery-color);
}
.sds-icon-gallery-label {
  font-family: var(--sds-typography-code-font-family);
  font-size: var(--sds-typography-code-size-small);
  color: var(--sds-color-text-default-secondary);
  text-align: center;
  overflow-wrap: anywhere;
}
.sds-icon-gallery-meta {
  margin-block-end: var(--sds-size-space-400);
  font-family: var(--sds-typography-body-font-family);
  font-size: var(--sds-typography-body-size-small);
  color: var(--sds-color-text-default-secondary);
}
`;

export const StoryIconGallery: StoryObj<GalleryArgs> = {
  name: "Gallery",
  args: {
    filter: "",
    size: "24",
    color: "default-default",
  },
  render: ({ filter, size, color }) => {
    const [copied, setCopied] = useState<string | null>(null);
    const term = filter.trim().toLowerCase().replace(/\s+/g, "");
    const visible = term
      ? allIcons.filter(([name]) => name.toLowerCase().includes(term))
      : allIcons;

    function copy(name: string) {
      const snippet = `import { ${name} } from "icons";`;
      navigator.clipboard?.writeText(snippet).catch(() => {});
      setCopied(name);
    }

    return (
      <div
        style={
          {
            width: "100%",
            "--sds-icon-gallery-color": `var(--sds-color-icon-${color})`,
          } as React.CSSProperties
        }
      >
        <style>{galleryStyles}</style>
        <p className="sds-icon-gallery-meta">
          {visible.length} of {allIcons.length} icons from the Figma "Icons"
          page. Click an icon to copy its import.
          {copied && ` Copied ${copied}.`}
        </p>
        <div className="sds-icon-gallery">
          {visible.map(([name, Icon]) => (
            <button
              key={name}
              type="button"
              className="sds-icon-gallery-item"
              title={`import { ${name} } from "icons";`}
              onClick={() => copy(name)}
            >
              <Icon size={size} />
              <span className="sds-icon-gallery-label">
                {name.replace(/^Icon/, "")}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  },
};

type SingleArgs = { icon: string; size: IconSize };

export const StoryIcon: StoryObj<SingleArgs> = {
  name: "Icon",
  parameters: { layout: "centered" },
  args: {
    icon: "IconActivity",
    size: "48",
  },
  argTypes: {
    icon: { control: { type: "select" }, options: iconNames },
    size: { control: { type: "select" }, options: sizes },
  },
  render: ({ icon, size }) => {
    const Icon = (icons as Record<string, IconComponent>)[icon];
    return <Icon size={size} />;
  },
};
