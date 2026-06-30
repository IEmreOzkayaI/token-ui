# Component Audit Checklist

**Purpose:** Ensure all components use Token UI foundations for consistent styling.

**Status:** Initial audit needed

## Audit Criteria

Each component must:
- [ ] Use `colorTokens` for all colors (no hardcoded hex/rgb)
- [ ] Use `spacing` scale for all margins/padding/gaps
- [ ] Use `shadows` for box-shadows (no custom shadows)
- [ ] Use `borderRadius` for border-radius (no hardcoded values)
- [ ] Use `fontSizes`/`fontWeights` for typography (no hardcoded font values)
- [ ] Have light/dark mode support via CSS variables
- [ ] Follow component naming conventions
- [ ] Include TypeScript types for all props
- [ ] Have proper ARIA labels/accessibility

## Components to Audit

### DataTable Components
- [ ] `ui/components/DataTable/Default.tsx`
- [ ] `ui/components/DataTable/Paginated.tsx`
- [ ] `ui/components/DataTable/Collapsible.tsx`
- [ ] `ui/components/DataTable/Product.tsx`
- [ ] `ui/components/DataTable/terminals.tsx` ✓ (just created, uses foundations)

### Admin Dashboard
- [ ] `ui/blocks/AdminDashboard/v3.tsx` ✓ (partial - has some hardcoded styles)
- [ ] `ui/blocks/AdminDashboard/v2.tsx` (if exists)

### Primitives (in node_modules or local)
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Badge
- [ ] Popover
- [ ] Tooltip
- [ ] Dialog
- [ ] Select
- [ ] Checkbox
- [ ] Accordion
- [ ] Table
- [ ] etc.

## Issues Found

### Critical (Must Fix)
1. **Hardcoded colors** - Some components use hex/rgb instead of tokens
2. **Inline style values** - Spacing, shadows, radius hardcoded as px values
3. **No dark mode** - Components don't respect dark theme
4. **Inconsistent patterns** - Different components style same UI differently

### High Priority
1. **Type safety** - Missing TypeScript interfaces
2. **Accessibility** - Missing ARIA labels
3. **Component presets** - Not using componentSpacing, componentShadows

### Medium Priority
1. **Documentation** - Missing usage examples
2. **Variants** - No variant system (default, outline, etc.)
3. **Responsive** - May not scale properly

## Refactoring Plan

### Phase 1: Audit & Catalog
- [ ] List all components
- [ ] Identify foundation usage violations
- [ ] Categorize by severity
- [ ] Create detailed report

### Phase 2: High Priority Refactors
- [ ] Fix hardcoded colors
- [ ] Add dark mode support
- [ ] Replace hardcoded values with tokens
- [ ] Test before/after

### Phase 3: Polish
- [ ] Add TypeScript types
- [ ] Improve accessibility
- [ ] Add component variants
- [ ] Document usage

### Phase 4: Validation
- [ ] Automated token validation (ESLint rule?)
- [ ] CI check for hardcoded values
- [ ] Color contrast validation
- [ ] Test all components

## Template for Audited Component

```typescript
"use client"

import { colorTokens, spacing, shadows, borderRadius, fontSizes, fontWeights } from "@/ui/foundations"
import { ReactNode } from "react"

interface ComponentProps {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function Component({ children, variant = "default", size = "md" }: ComponentProps) {
  const variantStyles = {
    default: {
      backgroundColor: colorTokens.primary.light,
      color: colorTokens.primaryForeground.light,
      boxShadow: shadows.sm,
    },
    outline: {
      backgroundColor: "transparent",
      color: colorTokens.primary.light,
      borderColor: colorTokens.border.light,
    },
    ghost: {
      backgroundColor: "transparent",
      color: colorTokens.foreground.light,
    },
  }

  const sizeStyles = {
    sm: { padding: spacing[2], fontSize: fontSizes.sm },
    md: { padding: spacing[4], fontSize: fontSizes.base },
    lg: { padding: spacing[6], fontSize: fontSizes.lg },
  }

  return (
    <div
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: borderRadius.md,
        fontWeight: fontWeights.medium,
      }}
    >
      {children}
    </div>
  )
}
```

## Validation Rules

### ESLint-style Rules to Implement

```
❌ hardcoded colors like #fff, #1a1a1a, rgb(...)
❌ hardcoded spacing like 16px, 24px, 1rem
❌ hardcoded shadows like 0 4px 6px rgba(...)
❌ hardcoded border-radius like 8px, 10px
❌ hardcoded font sizes/weights without tokens
❌ missing dark mode class handling
❌ missing ARIA labels on interactive elements
```

## Metrics to Track

- **Foundation Compliance**: % of values using tokens
- **Dark Mode Support**: % of components with dark mode
- **Accessibility**: % with proper ARIA labels
- **TypeScript**: % with full type safety
- **Variant System**: % with multiple variants

## Next Steps

1. Run initial component audit
2. Catalog all violations
3. Prioritize by impact
4. Refactor high-priority components
5. Establish automated validation
6. Document patterns
7. Set up CI checks

---

**Owner:** Design System Team  
**Last Updated:** [Date]  
**Status:** Not Started
