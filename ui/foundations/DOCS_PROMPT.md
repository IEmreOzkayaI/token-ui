# Token UI Design System - Docs Generation Prompt

## Context
This prompt guides documentation generation for Token UI design system.

## Foundation References
- **Colors**: `ui/foundations/colors.ts`
  - Color tokens by role (primary, secondary, accent, destructive)
  - Light/dark mode variants
  - Semantic colors for states (success, warning, error, info)
  - Chart color palette (5 colors)

- **Typography**: `ui/foundations/typography.ts`
  - Font sizes: 12px (xs) → 48px (5xl)
  - Font weights: 300-800
  - Line heights: 1.2-2
  - Presets: headings, body, labels, captions, code

- **Spacing**: `ui/foundations/spacing.ts`
  - Base unit: 4px
  - Scale: 0 → 384px
  - Patterns: compact, normal, relaxed, loose
  - Component presets: button, card, form, list, modal

- **Shadows**: `ui/foundations/shadows.ts`
  - Elevation levels: sm, md, lg, xl, 2xl
  - Component shadows: card, button, input, dropdown, modal
  - Focus rings & inner shadows

- **Border Radius**: `ui/foundations/radius.ts`
  - Base: 0.625rem (10px)
  - Scales: sm → 4xl + full
  - Semantic: sharp, subtle, standard, soft, round, pill, circle

- **Icons**: `ui/foundations/icons.ts`
  - Library: Lucide React
  - Categories: navigation, finance, actions, utility, communication, content, technology, ai
  - Sizes: xs (12px) → 3xl (48px)
  - Colors mapped to semantic tokens

## Default Prompt for Documentation Pages

When generating docs pages, include:

### 1. Color Documentation
- Show light/dark mode color swatches
- List all color roles with usage examples
- Include color values (OKLch format)
- Show intent colors and semantic mappings
- File reference: `ui/foundations/colors.ts`

### 2. Typography Documentation
- Type scale (visual pyramid)
- Font weight examples
- Line height & letter spacing examples
- Preset combinations (heading1, body, label, etc.)
- File reference: `ui/foundations/typography.ts`

### 3. Spacing Documentation
- Spacing scale visual (grid)
- Pattern explanations (compact → loose)
- Component-specific presets
- Usage in layouts
- File reference: `ui/foundations/spacing.ts`

### 4. Shadow Documentation
- Elevation levels visualization
- Component shadow applications
- Focus ring examples
- File reference: `ui/foundations/shadows.ts`

### 5. Border Radius Documentation
- Radius scale (visual progression)
- Semantic radius meanings
- Component radius defaults
- Use cases (buttons, cards, inputs, avatars, etc.)
- File reference: `ui/foundations/radius.ts`

### 6. Icon Documentation
- Icon categories with examples
- Size presets with pixel values
- Color mapping to semantic tokens
- Icon pairs for state changes
- Lucide React reference
- File reference: `ui/foundations/icons.ts`

## Implementation Guidelines

### For Docs Generation
1. Import foundation definitions from `ui/foundations/`
2. Extract data from TypeScript objects
3. Generate visual representations (swatches, scales, grids)
4. Provide code snippets showing token usage
5. Include file paths for reference

### For Component Documentation
1. Reference applicable foundation tokens
2. Show how component uses colors, spacing, shadows
3. Document responsive behaviors
4. Include override capabilities

### For Design Guidelines
1. Explain design rationale behind scales
2. Provide usage recommendations
3. Show do's and don'ts
4. Document accessibility considerations

## Code Examples Format

```typescript
// Import from foundations
import { colorTokens, typography, spacing, shadows, borderRadius, iconCategories } from "@/ui/foundations"

// Usage in components
const buttonStyle = {
  padding: spacing[4],           // 16px
  borderRadius: borderRadius.md, // Standard rounding
  boxShadow: shadows.sm,         // Subtle elevation
  color: colorTokens.primary.light,
}

// Docs rendering
<FoundationViewer 
  type="colors"
  source="ui/foundations/colors.ts"
/>
```

## File Paths for Easy Reference

**Foundation Definitions:**
- Colors: `ui/foundations/colors.ts`
- Typography: `ui/foundations/typography.ts`
- Spacing: `ui/foundations/spacing.ts`
- Shadows: `ui/foundations/shadows.ts`
- Radius: `ui/foundations/radius.ts`
- Icons: `ui/foundations/icons.ts`

**Documentation Components:**
- FoundationViewer: `app/docs/_components/foundation-viewer.tsx`
- ColorPalette: `app/docs/_components/color-palette.tsx`
- TypeScale: `app/docs/_components/type-scale.tsx`
- SpacingGrid: `app/docs/_components/spacing-grid.tsx`
- ShadowShowcase: `app/docs/_components/shadow-showcase.tsx`

**Docs Pages:**
- Foundations Overview: `app/docs/foundations/page.tsx`
- Colors: `app/docs/foundations/colors/page.tsx`
- Typography: `app/docs/foundations/typography/page.tsx`
- Spacing: `app/docs/foundations/spacing/page.tsx`
- Shadows: `app/docs/foundations/shadows/page.tsx`
- Radius: `app/docs/foundations/radius/page.tsx`
- Icons: `app/docs/foundations/icons/page.tsx`

## Consistency Rules

1. **Always reference foundation source files**
   - Don't hardcode values in docs
   - Import and display actual foundation data

2. **Keep docs synchronized**
   - Foundation changes auto-update docs
   - No manual value updates needed

3. **Show live examples**
   - Interactive color swatches
   - Clickable icon previews
   - Adjustable spacing/shadow demos

4. **Include code snippets**
   - Show how to import tokens
   - Provide copy-paste examples
   - Link to foundation files

5. **Document dark mode**
   - Show light/dark variants
   - Explain contrast ratios
   - Provide accessibility notes
