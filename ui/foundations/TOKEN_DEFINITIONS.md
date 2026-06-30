# Token Definitions - Token UI Design System

## CSS Variables Reference

All design tokens are available as CSS variables in `app/globals.css`. Use these in inline styles or custom CSS.

### Color Tokens

```css
/* Light Mode (Root) */
--primary: oklch(0.205 0 0);           /* Main brand color */
--primary-foreground: oklch(0.985 0 0);
--secondary: oklch(0.97 0 0);
--secondary-foreground: oklch(0.205 0 0);
--accent: oklch(0.97 0 0);             /* Highlights, trends */
--accent-foreground: oklch(0.205 0 0);
--destructive: oklch(0.577 0.245 27.325); /* Errors, danger */
--background: oklch(1 0 0);            /* Page background */
--foreground: oklch(0.145 0 0);        /* Text color */
--card: oklch(1 0 0);                  /* Container backgrounds */
--card-foreground: oklch(0.145 0 0);
--muted: oklch(0.97 0 0);              /* Secondary, disabled */
--muted-foreground: oklch(0.556 0 0);
--border: oklch(0.922 0 0);            /* Lines, dividers */
--input: oklch(0.922 0 0);             /* Form fields */
--ring: oklch(0.708 0 0);              /* Focus states */
--popover: oklch(1 0 0);               /* Floating containers */
--popover-foreground: oklch(0.145 0 0);

/* Chart Colors */
--chart-1: oklch(0.87 0 0);
--chart-2: oklch(0.556 0 0);
--chart-3: oklch(0.439 0 0);
--chart-4: oklch(0.371 0 0);
--chart-5: oklch(0.269 0 0);

/* Sidebar */
--sidebar: oklch(0.985 0 0);
--sidebar-foreground: oklch(0.145 0 0);
--sidebar-primary: oklch(0.205 0 0);
--sidebar-primary-foreground: oklch(0.985 0 0);
--sidebar-accent: oklch(0.97 0 0);
--sidebar-accent-foreground: oklch(0.205 0 0);
--sidebar-border: oklch(0.922 0 0);
--sidebar-ring: oklch(0.708 0 0);

/* Dark Mode (.dark) */
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
--card: oklch(0.205 0 0);
--primary: oklch(0.922 0 0);
/* ... etc for all tokens in dark mode */
```

### Spacing Variables

```css
/* Generated from spacing tokens */
/* Base unit: 4px (0.25rem) */
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
/* ... up to 96 */
```

### Typography Variables

```css
/* Font sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
/* ... up to 5xl */

/* Font weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Shadow Variables

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
```

### Border Radius

```css
--radius: 0.625rem; /* 10px base */
--radius-sm: calc(var(--radius) * 0.6);   /* ~6px */
--radius-md: calc(var(--radius) * 0.8);   /* ~8px */
--radius-lg: var(--radius);                /* 10px */
--radius-xl: calc(var(--radius) * 1.4);   /* ~14px */
--radius-2xl: calc(var(--radius) * 1.8);  /* ~18px */
```

## Tailwind Integration

All tokens are integrated into Tailwind via `@theme`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  /* ... etc */
}
```

### Usage in Tailwind

```html
<!-- Colors -->
<div class="bg-primary text-primary-foreground">Primary button</div>
<div class="bg-destructive text-white">Delete action</div>

<!-- Spacing -->
<div class="p-4 gap-3">Padded with gap</div>
<div class="mb-6 mt-8">Margin</div>

<!-- Shadows -->
<div class="shadow-md rounded-lg">Card</div>
<div class="shadow-lg">Elevated</div>

<!-- Border Radius -->
<div class="rounded-lg">Standard</div>
<div class="rounded-full">Pill/Circle</div>
```

## Scaling to More Tokens

### Adding New Color

1. **Define in colors.ts**:
```typescript
export const colorTokens = {
  // ... existing
  success: {
    light: "oklch(0.650 0.200 142.5)",
    dark: "oklch(0.750 0.180 140)",
  },
}
```

2. **Add CSS variable in globals.css**:
```css
:root {
  --success: oklch(0.650 0.200 142.5);
}
.dark {
  --success: oklch(0.750 0.180 140);
}
```

3. **Update Tailwind theme**:
```css
@theme inline {
  --color-success: var(--success);
}
```

4. **Use in components**:
```typescript
style={{ color: colorTokens.success.light }}
// or
className="text-success"
```

### Adding New Spacing Value

1. **Update spacing.ts**:
```typescript
export const spacing = {
  // ... existing
  18: "4.5rem", // 72px
}
```

2. **Add CSS variable** (generated):
```css
--spacing-18: 4.5rem;
```

3. **Use immediately**:
```typescript
style={{ padding: spacing[18] }}
```

### Adding New Icon Category

1. **Update icons.ts**:
```typescript
export const iconCategories = {
  // ... existing
  product: {
    package: "Package",
    box: "Box",
    truck: "Truck",
  },
}
```

2. **Use in components**:
```typescript
import { iconCategories } from "@/ui/foundations"
const icons = iconCategories.product
```

## Color Space (OKLch)

Token UI uses OKLch for perceptual uniformity:

- **O**: Oklab (perceptually uniform color space)
- **K**: hue, chroma, lightness in OKLch format
- **L**: Lightness (0-1, where 0 is black, 1 is white)
- **C**: Chroma (saturation/intensity)
- **H**: Hue (0-360 degrees)

### Example
- `oklch(0.205 0 0)` = Very dark gray (primary dark)
- `oklch(0.985 0 0)` = Almost white (foreground light)
- `oklch(0.650 0.200 142.5)` = Green (success)

## Usage Patterns

### Pattern: Full State Coverage

```typescript
// ✅ Complete token set for component
const styles = {
  // Colors
  color: colorTokens.foreground.light,
  backgroundColor: colorTokens.card.light,
  borderColor: colorTokens.border.light,
  
  // Spacing
  padding: spacing[4],
  gap: spacing[3],
  
  // Sizing
  borderRadius: borderRadius.md,
  boxShadow: shadows.sm,
  
  // Typography
  fontSize: fontSizes.base,
  fontWeight: fontWeights.medium,
  lineHeight: lineHeights.normal,
}
```

### Pattern: Component Variants

```typescript
const getVariantStyle = (variant: "default" | "outline") => ({
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
})
```

### Pattern: Dark Mode

```typescript
const isDark = document.documentElement.classList.contains("dark")
const textColor = isDark
  ? colorTokens.foreground.dark
  : colorTokens.foreground.light
```

## File Map

| File | Purpose | Keys |
|------|---------|------|
| `colors.ts` | Color tokens + semantic mappings | colorTokens, semanticColors, intentColors |
| `typography.ts` | Type system | fontSizes, fontWeights, lineHeights, typographyPresets |
| `spacing.ts` | Space scale | spacing, spacingPatterns, componentSpacing |
| `shadows.ts` | Elevation | shadows, elevations, componentShadows |
| `radius.ts` | Corner rounding | borderRadius, semanticRadius, componentRadius |
| `icons.ts` | Icon library | iconCategories, iconSizes, iconColors, iconPairs |
| `index.ts` | Central export | All above |

## Consistency Rules

1. **Always import from `@/ui/foundations`** - Never hardcode values
2. **Use semantic token names** - `colorTokens.primary` not colors by value
3. **Apply presets for components** - `componentSpacing.card` for card padding
4. **Support dark mode** - All color tokens have light/dark variants
5. **Maintain hierarchy** - Use shadow elevations meaningfully
6. **Scale proportionally** - Respect spacing scale (4px base unit)

## Next Steps

- [ ] Audit existing components for foundation compliance
- [ ] Refactor inconsistent components
- [ ] Create component library documentation
- [ ] Set up automated token validation
- [ ] Plan design token CI/CD integration
