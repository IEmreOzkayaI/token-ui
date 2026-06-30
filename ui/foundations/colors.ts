/**
 * Color Tokens - Token UI Design System
 * Based on OKLch color space for perceptual uniformity
 * Light mode (default) and dark mode variants
 */

export const colorTokens = {
  // Primary - Main brand color
  primary: {
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.922 0 0)",
  },
  primaryForeground: {
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.205 0 0)",
  },

  // Secondary - Supporting color
  secondary: {
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  secondaryForeground: {
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.985 0 0)",
  },

  // Accent - Highlights, trends
  accent: {
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  accentForeground: {
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.985 0 0)",
  },

  // Destructive - Error, delete, danger
  destructive: {
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.704 0.191 22.216)",
  },

  // Background & Foreground
  background: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
  },
  foreground: {
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
  },

  // Card - Container backgrounds
  card: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
  },
  cardForeground: {
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
  },

  // Muted - Secondary text, disabled states
  muted: {
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  mutedForeground: {
    light: "oklch(0.556 0 0)",
    dark: "oklch(0.708 0 0)",
  },

  // Border - Lines, dividers
  border: {
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 10%)",
  },

  // Input - Form fields
  input: {
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 15%)",
  },

  // Ring - Focus states
  ring: {
    light: "oklch(0.708 0 0)",
    dark: "oklch(0.556 0 0)",
  },

  // Popover - Floating containers
  popover: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
  },
  popoverForeground: {
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
  },

  // Chart colors - Data visualization
  chart: {
    1: "oklch(0.87 0 0)",
    2: "oklch(0.556 0 0)",
    3: "oklch(0.439 0 0)",
    4: "oklch(0.371 0 0)",
    5: "oklch(0.269 0 0)",
  },

  // Sidebar - Navigation containers
  sidebar: {
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.205 0 0)",
  },
  sidebarForeground: {
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
  },
  sidebarPrimary: {
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.488 0.243 264.376)",
  },
  sidebarPrimaryForeground: {
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.985 0 0)",
  },
  sidebarAccent: {
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  sidebarAccentForeground: {
    light: "oklch(0.205 0 0)",
    dark: "oklch(0.985 0 0)",
  },
  sidebarBorder: {
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 10%)",
  },
  sidebarRing: {
    light: "oklch(0.708 0 0)",
    dark: "oklch(0.556 0 0)",
  },
}

// Semantic color roles for different states
export const semanticColors = {
  success: "oklch(0.650 0.200 142.5)", // Green
  warning: "oklch(0.840 0.160 61.8)",  // Amber
  error: "oklch(0.577 0.245 27.325)",  // Red (matches destructive)
  info: "oklch(0.500 0.200 250)",      // Blue
}

// Intent-based color mappings
export const intentColors = {
  active: "var(--primary)",
  inactive: "var(--muted-foreground)",
  success: "oklch(0.650 0.200 142.5)",
  pending: "oklch(0.840 0.160 61.8)",
  error: "var(--destructive)",
  info: "var(--primary)",
}
