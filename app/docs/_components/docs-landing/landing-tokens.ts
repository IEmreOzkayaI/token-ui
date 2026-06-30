/** Layout tokens for the landing page */
export const LANDING_LAYOUT = {
  siteMax: 1180,
  gridSize: 190,
  headerHeight: 62,
} as const

const css = (name: string) => `var(--${name})`

/**
 * Landing color roles mapped to Token UI CSS variables (app/globals.css).
 * Surface tiers use color-mix so panels read clearly even when --card === --background.
 */
export const LANDING = {
  canvas: css("background"),
  surface: css("background"),
  panel: `color-mix(in oklch, ${css("foreground")} 2.5%, ${css("background")})`,
  section: `color-mix(in oklch, ${css("foreground")} 5%, ${css("background")})`,
  line: css("border"),
  ink: css("foreground"),
  subdued: css("muted-foreground"),
  soft: css("muted"),
  accent: css("primary"),
  accentFg: css("primary-foreground"),
  /** Neutral editorial chart tones — not the blue chart scale */
  chartDark: css("foreground"),
  chartMid: css("muted-foreground"),
  chartSoft: css("border"),
  chartFill: css("primary"),
  headerBg: `color-mix(in oklch, ${css("background")} 90%, transparent)`,
  ...LANDING_LAYOUT,
} as const

export const LANDING_STRIPE = `repeating-linear-gradient(135deg, transparent 0 4px, color-mix(in oklch, ${css("foreground")} 3.5%, transparent) 4px 6px)`

export const LANDING_NAV_LINKS = [
  { label: "Docs", href: "/docs/installation" },
  { label: "Components", href: "/docs/ui/components/button" },
] as const
