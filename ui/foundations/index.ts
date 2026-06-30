/**
 * Token UI Design System Foundations
 * Core design tokens: colors, typography, spacing, shadows, radius, icons
 */

export * from "./colors"
export * from "./typography"
export * from "./spacing"
export * from "./shadows"
export * from "./radius"
export * from "./icons"

// Convenience exports - commonly used together
export { colorTokens, semanticColors, intentColors } from "./colors"
export {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  typographyPresets,
} from "./typography"
export { spacing, spacingPatterns, componentSpacing } from "./spacing"
export { shadows, elevations, componentShadows } from "./shadows"
export { borderRadius, semanticRadius, componentRadius } from "./radius"
export {
  iconCategories,
  iconSizes,
  iconColors,
  iconPairs,
  strokeWidths,
} from "./icons"

/**
 * Design System Overview:
 *
 * COLORS:
 * - OKLch color space for perceptual uniformity
 * - Light/dark mode support
 * - Semantic roles (primary, secondary, accent, destructive)
 * - Chart colors for data visualization
 *
 * TYPOGRAPHY:
 * - 10-step type scale (12px - 48px)
 * - 6 weight levels (light - extrabold)
 * - Line heights & letter spacing
 * - Preset combinations for common use cases
 *
 * SPACING:
 * - 4px base unit
 * - Patterns: compact, normal, relaxed, loose
 * - Component-specific presets
 *
 * SHADOWS:
 * - 7 elevation levels (none - 2xl)
 * - Component-specific shadow presets
 * - Focus ring & inner shadow variants
 *
 * RADIUS:
 * - Base: 0.625rem (10px)
 * - Scales: sm, md, lg, xl, 2xl, 3xl, 4xl, full
 * - Semantic: sharp, subtle, standard, soft, round, pill, circle
 *
 * ICONS:
 * - Lucide React icon library
 * - 8 categories: navigation, finance, actions, utility, etc.
 * - Size presets (xs - 3xl)
 * - Color mappings to semantic tokens
 * - Icon pairs for state changes
 */
