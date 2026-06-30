/**
 * Border Radius Tokens - Token UI Design System
 * Corner rounding scale based on base radius (0.625rem)
 */

export const borderRadius = {
  none: "0",
  sm: "calc(0.625rem * 0.6)",   // ~0.375rem
  base: "0.625rem",              // ~10px (base)
  md: "calc(0.625rem * 0.8)",   // ~0.5rem
  lg: "0.625rem",                // 10px (same as base)
  xl: "calc(0.625rem * 1.4)",   // ~0.875rem
  "2xl": "calc(0.625rem * 1.8)", // ~1.125rem
  "3xl": "calc(0.625rem * 2.2)", // ~1.375rem
  "4xl": "calc(0.625rem * 2.6)", // ~1.625rem
  full: "9999px",                // Pill/circle shapes
}

// Semantic radius values
export const semanticRadius = {
  // No corners - sharp
  sharp: borderRadius.none,

  // Subtle - slight rounding
  subtle: borderRadius.sm,

  // Standard - default rounding
  standard: borderRadius.base,

  // Soft - more rounded
  soft: borderRadius.lg,

  // Round - very rounded
  round: borderRadius["2xl"],

  // Pill - maximally rounded (for buttons, badges)
  pill: borderRadius.full,

  // Circle - full rounding
  circle: borderRadius.full,
}

// Component-specific radius presets
export const componentRadius = {
  // Button radius
  button: {
    default: borderRadius.base,
    pill: borderRadius.full,
  },

  // Card radius
  card: borderRadius.lg,

  // Input radius
  input: borderRadius.base,

  // Modal radius
  modal: borderRadius.xl,
  dialog: borderRadius.xl,

  // Dropdown/Popover radius
  dropdown: borderRadius.lg,
  popover: borderRadius.lg,

  // Badge radius
  badge: {
    default: borderRadius["2xl"],
    pill: borderRadius.full,
  },

  // Alert radius
  alert: borderRadius.lg,

  // Tooltip radius
  tooltip: borderRadius.md,

  // Avatar radius
  avatar: {
    sm: borderRadius.sm,
    md: borderRadius.base,
    lg: borderRadius.lg,
    circle: borderRadius.full,
  },

  // Image radius
  image: borderRadius.lg,

  // Table radius (outer corners only, typically)
  table: borderRadius.lg,

  // Navigation
  navbar: borderRadius.none,
  sidebar: borderRadius.none,
}
