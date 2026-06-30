/**
 * Shadow Tokens - Token UI Design System
 * Elevation system using shadows for depth
 */

export const shadows = {
  // Small shadow - subtle elevation
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",

  // Medium shadow - card elevation
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",

  // Large shadow - modal/dropdown elevation
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",

  // Extra large shadow - high elevation overlays
  xl: "0 20px 25px rgba(0, 0, 0, 0.1)",

  // 2xl shadow - maximum elevation
  "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",

  // Inner shadow - inset effect
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",

  // None - no shadow
  none: "none",
}

// Elevation levels for component hierarchy
export const elevations = {
  // Ground level - no elevation
  none: shadows.none,

  // Subtle - slightly raised (inputs, subtle cards)
  subtle: shadows.sm,

  // Raised - standard cards, popovers
  raised: shadows.md,

  // Floating - dropdowns, tooltips, popovers
  floating: shadows.lg,

  // Modal - modals, dialogs, priority overlays
  modal: shadows.xl,

  // Maximum - not typically used, reserved for special cases
  maximum: shadows["2xl"],
}

// Component-specific shadow presets
export const componentShadows = {
  // Card shadows
  card: {
    default: shadows.sm,
    hover: shadows.md,
    active: shadows.lg,
  },

  // Button shadows
  button: {
    default: "none",
    hover: shadows.sm,
    active: "none",
  },

  // Input shadows
  input: {
    default: shadows.none,
    focus: shadows.sm,
    error: `0 0 0 3px rgba(220, 38, 38, 0.1)`, // Error ring
  },

  // Dropdown/Popover shadows
  dropdown: shadows.lg,
  popover: shadows.lg,
  tooltip: shadows.md,

  // Modal shadows
  modal: shadows.xl,
  dialog: shadows.xl,

  // Navigation shadows
  navbar: shadows.sm,
  sidebar: "none",

  // Focus ring (not a shadow but related to elevation)
  focusRing: `0 0 0 3px rgba(0, 0, 0, 0.1)`,
}
