/**
 * Spacing Scale - Token UI Design System
 * Consistent spacing system based on 4px base unit
 */

export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",  // 2px
  1: "0.25rem",     // 4px
  1.5: "0.375rem",  // 6px
  2: "0.5rem",      // 8px
  2.5: "0.625rem",  // 10px
  3: "0.75rem",     // 12px
  3.5: "0.875rem",  // 14px
  4: "1rem",        // 16px
  5: "1.25rem",     // 20px
  6: "1.5rem",      // 24px
  7: "1.75rem",     // 28px
  8: "2rem",        // 32px
  9: "2.25rem",     // 36px
  10: "2.5rem",     // 40px
  11: "2.75rem",    // 44px
  12: "3rem",       // 48px
  14: "3.5rem",     // 56px
  16: "4rem",       // 64px
  20: "5rem",       // 80px
  24: "6rem",       // 96px
  28: "7rem",       // 112px
  32: "8rem",       // 128px
  36: "9rem",       // 144px
  40: "10rem",      // 160px
  44: "11rem",      // 176px
  48: "12rem",      // 192px
  52: "13rem",      // 208px
  56: "14rem",      // 224px
  60: "15rem",      // 240px
  64: "16rem",      // 256px
  72: "18rem",      // 288px
  80: "20rem",      // 320px
  96: "24rem",      // 384px
}

// Common spacing patterns
export const spacingPatterns = {
  // Compact spacing - for dense UI
  compact: {
    gap: spacing[2],        // 8px
    padding: spacing[2],    // 8px
    margin: spacing[2],     // 8px
  },

  // Normal spacing - standard layouts
  normal: {
    gap: spacing[4],        // 16px
    padding: spacing[4],    // 16px
    margin: spacing[4],     // 16px
  },

  // Relaxed spacing - generous breathing room
  relaxed: {
    gap: spacing[6],        // 24px
    padding: spacing[6],    // 24px
    margin: spacing[6],     // 24px
  },

  // Loose spacing - maximum whitespace
  loose: {
    gap: spacing[8],        // 32px
    padding: spacing[8],    // 32px
    margin: spacing[8],     // 32px
  },
}

// Component spacing presets
export const componentSpacing = {
  // Button spacing
  button: {
    paddingX: spacing[4],   // 16px horizontal
    paddingY: spacing[2],   // 8px vertical
    gap: spacing[2],        // 8px gap between icon & text
  },

  // Card spacing
  card: {
    padding: spacing[6],    // 24px
    gap: spacing[4],        // 16px between elements
  },

  // Input/Form spacing
  form: {
    padding: spacing[3],    // 12px
    gap: spacing[3],        // 12px between fields
    labelMarginBottom: spacing[2], // 8px
  },

  // List/Table spacing
  list: {
    gap: spacing[1],        // 4px item gap
    paddingY: spacing[3],   // 12px vertical padding per item
  },

  // Modal spacing
  modal: {
    padding: spacing[6],    // 24px
    headerPaddingBottom: spacing[4], // 16px
    footerPaddingTop: spacing[4],    // 16px
    gap: spacing[4],        // 16px between sections
  },
}
