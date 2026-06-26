export type SemanticColor = {
  token: string
  cssVar: string
  tailwind: string
  light: string
  dark: string
  description: string
}

export const semanticColors: SemanticColor[] = [
  {
    token: "background",
    cssVar: "--background",
    tailwind: "bg-background",
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
    description: "Default page and application canvas.",
  },
  {
    token: "foreground",
    cssVar: "--foreground",
    tailwind: "text-foreground",
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
    description: "Primary text and icon color on background.",
  },
  {
    token: "card",
    cssVar: "--card",
    tailwind: "bg-card",
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
    description: "Elevated surfaces such as cards and panels.",
  },
  {
    token: "card-foreground",
    cssVar: "--card-foreground",
    tailwind: "text-card-foreground",
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
    description: "Text on card surfaces.",
  },
  {
    token: "primary",
    cssVar: "--primary",
    tailwind: "bg-primary",
    light: "oklch(0.488 0.243 264.376)",
    dark: "oklch(0.424 0.199 265.638)",
    description: "Brand actions, primary buttons, and key links.",
  },
  {
    token: "primary-foreground",
    cssVar: "--primary-foreground",
    tailwind: "text-primary-foreground",
    light: "oklch(0.97 0.014 254.604)",
    dark: "oklch(0.97 0.014 254.604)",
    description: "Text and icons on primary surfaces.",
  },
  {
    token: "secondary",
    cssVar: "--secondary",
    tailwind: "bg-secondary",
    light: "oklch(0.967 0.001 286.375)",
    dark: "oklch(0.274 0.006 286.033)",
    description: "Secondary actions and low-emphasis controls.",
  },
  {
    token: "muted",
    cssVar: "--muted",
    tailwind: "bg-muted",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
    description: "Subtle backgrounds for inactive or supporting UI.",
  },
  {
    token: "muted-foreground",
    cssVar: "--muted-foreground",
    tailwind: "text-muted-foreground",
    light: "oklch(0.556 0 0)",
    dark: "oklch(0.708 0 0)",
    description: "Secondary text, captions, and helper copy.",
  },
  {
    token: "accent",
    cssVar: "--accent",
    tailwind: "bg-accent",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
    description: "Hover states, highlights, and selected rows.",
  },
  {
    token: "destructive",
    cssVar: "--destructive",
    tailwind: "bg-destructive",
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.704 0.191 22.216)",
    description: "Errors, destructive actions, and critical alerts.",
  },
  {
    token: "border",
    cssVar: "--border",
    tailwind: "border-border",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 10%)",
    description: "Default borders and dividers.",
  },
  {
    token: "input",
    cssVar: "--input",
    tailwind: "border-input",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 15%)",
    description: "Form control borders and input backgrounds.",
  },
  {
    token: "ring",
    cssVar: "--ring",
    tailwind: "ring-ring",
    light: "oklch(0.708 0 0)",
    dark: "oklch(0.556 0 0)",
    description: "Focus rings for keyboard navigation.",
  },
]

export const chartColors = [
  { token: "chart-1", cssVar: "--chart-1", value: "oklch(0.809 0.105 251.813)" },
  { token: "chart-2", cssVar: "--chart-2", value: "oklch(0.623 0.214 259.815)" },
  { token: "chart-3", cssVar: "--chart-3", value: "oklch(0.546 0.245 262.881)" },
  { token: "chart-4", cssVar: "--chart-4", value: "oklch(0.488 0.243 264.376)" },
  { token: "chart-5", cssVar: "--chart-5", value: "oklch(0.424 0.199 265.638)" },
]

export const radiusTokens = [
  { token: "radius-sm", cssVar: "--radius-sm", formula: "radius × 0.6", value: "6px", className: "rounded-sm" },
  { token: "radius-md", cssVar: "--radius-md", formula: "radius × 0.8", value: "8px", className: "rounded-md" },
  { token: "radius-lg", cssVar: "--radius-lg", formula: "base radius", value: "10px", className: "rounded-lg" },
  { token: "radius-xl", cssVar: "--radius-xl", formula: "radius × 1.4", value: "14px", className: "rounded-xl" },
  { token: "radius-2xl", cssVar: "--radius-2xl", formula: "radius × 1.8", value: "18px", className: "rounded-2xl" },
  { token: "radius-3xl", cssVar: "--radius-3xl", formula: "radius × 2.2", value: "22px", className: "rounded-3xl" },
  { token: "radius-4xl", cssVar: "--radius-4xl", formula: "radius × 2.6", value: "26px", className: "rounded-4xl" },
]

export const spacingScale = [
  { token: "1", className: "p-1", value: "4px", usage: "Tight icon padding, micro gaps" },
  { token: "2", className: "p-2", value: "8px", usage: "Compact controls, badge padding" },
  { token: "3", className: "p-3", value: "12px", usage: "Small component internal spacing" },
  { token: "4", className: "p-4", value: "16px", usage: "Default card padding, form gaps" },
  { token: "6", className: "p-6", value: "24px", usage: "Section padding, modal content" },
  { token: "8", className: "p-8", value: "32px", usage: "Page sections, hero spacing" },
  { token: "10", className: "p-10", value: "40px", usage: "Large preview areas" },
  { token: "12", className: "p-12", value: "48px", usage: "Marketing blocks, empty states" },
]

export const typographyScale = [
  { className: "text-xs", size: "12px", lineHeight: "16px", usage: "Captions, badges, metadata" },
  { className: "text-sm", size: "14px", lineHeight: "20px", usage: "Body small, table cells, labels" },
  { className: "text-base", size: "16px", lineHeight: "24px", usage: "Default body copy" },
  { className: "text-lg", size: "18px", lineHeight: "28px", usage: "Lead paragraphs, subheadings" },
  { className: "text-xl", size: "20px", lineHeight: "28px", usage: "Section titles" },
  { className: "text-2xl", size: "24px", lineHeight: "32px", usage: "Page section headings" },
  { className: "text-3xl", size: "30px", lineHeight: "36px", usage: "Marketing headlines" },
  { className: "text-4xl", size: "36px", lineHeight: "40px", usage: "Page titles" },
]

export const shadowScale = [
  { className: "shadow-xs", usage: "Subtle elevation on inputs and chips" },
  { className: "shadow-sm", usage: "Cards at rest, dropdown triggers" },
  { className: "shadow-md", usage: "Hovered cards, popovers" },
  { className: "shadow-lg", usage: "Dialogs, floating panels" },
  { className: "shadow-xl", usage: "Modals, command palettes" },
  { className: "shadow-2xl", usage: "Maximum elevation, marketing hero cards" },
]

export const fontFamilies = [
  {
    token: "--font-sans",
    name: "Inter",
    tailwind: "font-sans",
    usage: "UI copy, headings, labels, and navigation",
  },
  {
    token: "--font-mono",
    name: "Geist Mono",
    tailwind: "font-mono",
    usage: "Code blocks, technical values, keyboard shortcuts",
  },
]
