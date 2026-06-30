# Component Development Guide - Using Foundations

## Overview
When building components for Token UI, import and use design tokens from `ui/foundations/` to ensure consistency across the design system.

## File References

### Foundation Files
- **Colors**: `ui/foundations/colors.ts`
- **Typography**: `ui/foundations/typography.ts`
- **Spacing**: `ui/foundations/spacing.ts`
- **Shadows**: `ui/foundations/shadows.ts`
- **Radius**: `ui/foundations/radius.ts`
- **Icons**: `ui/foundations/icons.ts`

### Main Export
```typescript
import * as foundations from "@/ui/foundations"
// Or import specific tokens
import { colorTokens, spacing, shadows } from "@/ui/foundations"
```

## Component Template

```typescript
"use client"

import { spacing, shadows, borderRadius, colorTokens, iconSizes } from "@/ui/foundations"
import { ReactNode } from "react"

interface MyComponentProps {
  children: ReactNode
  variant?: "default" | "outline"
}

export function MyComponent({ children, variant = "default" }: MyComponentProps) {
  const styles = {
    container: {
      padding: spacing[4],        // 16px
      borderRadius: borderRadius.md,
      boxShadow: shadows.sm,
      backgroundColor: variant === "default" 
        ? colorTokens.card.light 
        : "transparent",
    },
    text: {
      color: colorTokens.foreground.light,
      fontSize: "1rem",  // Use typography presets
    },
  }

  return (
    <div style={styles.container}>
      <p style={styles.text}>{children}</p>
    </div>
  )
}
```

## Best Practices

### 1. Always Use Spacing Tokens
```typescript
// ✅ Good
const styles = {
  padding: spacing[4],   // 16px
  gap: spacing[3],       // 12px
  margin: spacing[2],    // 8px
}

// ❌ Avoid
const styles = {
  padding: "16px",
  gap: "12px",
  margin: "8px",
}
```

### 2. Use Color Tokens
```typescript
// ✅ Good
style={{
  color: colorTokens.foreground.light,
  backgroundColor: colorTokens.card.light,
}}

// ❌ Avoid
style={{
  color: "#1a1a1a",
  backgroundColor: "#ffffff",
}}
```

### 3. Apply Shadow Elevations
```typescript
// ✅ Good
<div style={{ boxShadow: shadows.md }}>Card</div>

// For component state
const shadow = isHovered ? shadows.lg : shadows.md

// ❌ Avoid
<div style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
```

### 4. Use Border Radius Scale
```typescript
// ✅ Good
style={{
  borderRadius: borderRadius.md,
  // or semantic
  borderRadius: semanticRadius.standard,
}}

// ❌ Avoid
style={{ borderRadius: "8px" }}
```

### 5. Typography Presets
```typescript
// ✅ Good
const heading = typographyPresets.heading2
<h2 style={{ ...heading }}>Title</h2>

const body = typographyPresets.body
<p style={{ ...body }}>Content</p>

// ❌ Avoid
<h2 style={{ fontSize: "1.875rem", fontWeight: 700 }}>Title</h2>
```

### 6. Icon Usage with Foundations
```typescript
import { ChevronDown } from "lucide-react"
import { iconSizes, iconColors } from "@/ui/foundations"

// ✅ Good
<ChevronDown className={`${iconSizes.md} ${iconColors.primary}`} />

// With custom color
<ChevronDown style={{ color: colorTokens.primary.light }} className={iconSizes.lg} />
```

## Component-Specific Patterns

### Button Component
```typescript
const buttonStyle = {
  padding: `${spacing[2]} ${spacing[4]}`,  // Vertical, Horizontal
  borderRadius: borderRadius.base,
  boxShadow: isHovered ? shadows.md : shadows.none,
  color: colorTokens.primaryForeground.light,
  backgroundColor: colorTokens.primary.light,
  fontSize: typography.fontSizes.sm,
  fontWeight: typography.fontWeights.medium,
  transition: "all 200ms ease-in-out",
}
```

### Card Component
```typescript
const cardStyle = {
  padding: componentSpacing.card.padding,     // 24px
  borderRadius: componentRadius.card,
  backgroundColor: colorTokens.card.light,
  boxShadow: componentShadows.card.default,
  border: `1px solid ${colorTokens.border.light}`,
}
```

### Form Input Component
```typescript
const inputStyle = {
  padding: componentSpacing.form.padding,     // 12px
  borderRadius: componentRadius.input,
  backgroundColor: colorTokens.input.light,
  color: colorTokens.foreground.light,
  border: `1px solid ${colorTokens.border.light}`,
  fontSize: typography.fontSizes.sm,
  
  // Focus state
  "&:focus": {
    boxShadow: componentShadows.input.focus,
    borderColor: colorTokens.ring.light,
  },
}
```

### Layout/Spacing
```typescript
// Use spacing patterns for consistent layouts
const compactLayout = {
  gap: spacingPatterns.compact.gap,      // 8px
  padding: spacingPatterns.compact.padding,
}

const normalLayout = {
  gap: spacingPatterns.normal.gap,       // 16px
  padding: spacingPatterns.normal.padding,
}
```

## Dark Mode Support

All color tokens include light/dark variants:

```typescript
// ✅ Good - Use CSS variables (auto dark mode)
<div style={{ color: "var(--foreground)" }}>
  Automatically adjusts in dark mode
</div>

// ✅ Also Good - Explicit tokens
<div style={{
  color: isDarkMode 
    ? colorTokens.foreground.dark 
    : colorTokens.foreground.light,
}}>
  Explicit dark mode handling
</div>
```

## Responsive Design with Foundations

Use spacing patterns for responsive layouts:

```typescript
const responsiveStyle = {
  padding: [spacing[2], spacing[4], spacing[6]], // Mobile, Tablet, Desktop
  gap: spacingPatterns.normal.gap,
  display: "grid",
  gridTemplateColumns: "auto",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "1fr 1fr",
  },
}
```

## Updating Components to Use Foundations

If updating existing components:

1. **Identify hardcoded values** (colors, spacing, shadows)
2. **Find corresponding tokens** in foundations
3. **Import tokens** from `@/ui/foundations`
4. **Replace values** with token references
5. **Test dark mode** to ensure variants work
6. **Update documentation** with new token usage

## Example: Before & After

### Before (Hardcoded)
```typescript
<div style={{
  padding: "16px",
  gap: "12px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  backgroundColor: "#ffffff",
  color: "#1a1a1a",
}}>
  Content
</div>
```

### After (Using Foundations)
```typescript
import { spacing, borderRadius, shadows, colorTokens } from "@/ui/foundations"

<div style={{
  padding: spacing[4],
  gap: spacing[3],
  borderRadius: borderRadius.md,
  boxShadow: shadows.md,
  backgroundColor: colorTokens.card.light,
  color: colorTokens.foreground.light,
}}>
  Content
</div>
```

## Troubleshooting

### Colors not applying in dark mode?
- Use CSS variables: `backgroundColor: "var(--card)"`
- Or use explicit dark variants from colorTokens

### Spacing feels off?
- Check spacing scale: base is 4px
- Use componentSpacing presets for consistency
- Compare with adjacent components

### Shadow not visible?
- Check elevation context (buttons should use subtle shadows)
- Use componentShadows for component-specific presets
- Consider background color contrast

## Questions?

Refer to foundation files:
- 📍 `ui/foundations/` - All token definitions
- 📍 `app/docs/foundations/` - Visual guides
- 📍 `ui/foundations/DOCS_PROMPT.md` - Documentation generation
