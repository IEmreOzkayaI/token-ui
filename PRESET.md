# Design System Preset

**Preset:** `b1ZOMFeJU`

## Color Palette

### Light Mode
- **Primary:** `oklch(0.488 0.243 264.376)` - Deep Blue/Purple
- **Secondary:** `oklch(0.967 0.001 286.375)` - Light Lavender
- **Background:** `oklch(1 0 0)` - White
- **Foreground:** `oklch(0.145 0 0)` - Dark Gray
- **Accent:** `oklch(0.97 0 0)` - Light Gray
- **Muted:** `oklch(0.97 0 0)` - Very Light Gray
- **Destructive:** `oklch(0.577 0.245 27.325)` - Red
- **Border:** `oklch(0.922 0 0)` - Light Border
- **Ring:** `oklch(0.708 0 0)` - Focus Ring

### Dark Mode
- **Primary:** `oklch(0.424 0.199 265.638)` - Muted Blue/Purple
- **Background:** `oklch(0.145 0 0)` - Dark Background
- **Foreground:** `oklch(0.985 0 0)` - Light Text
- **Card:** `oklch(0.205 0 0)` - Dark Card
- **Border:** `oklch(1 0 0 / 10%)` - Transparent Border
- **Input:** `oklch(1 0 0 / 15%)` - Subtle Input

### Chart Colors
- Chart 1-5: Gradient from light to darker blue/purple

## Typography

- **Font Sans:** System font stack
- **Font Mono:** System monospace
- **Base Spacing:** 4px unit

## Border Radius

- **sm:** 2.7px (60% of base)
- **md:** 3.6px (80% of base)
- **lg:** 4.5px (base)
- **xl:** 6.3px (140% of base)
- **2xl:** 8.1px (180% of base)
- **3xl:** 9.9px (220% of base)
- **4xl:** 11.7px (260% of base)

## Features

✓ OKLCH color space (perceptually uniform)
✓ Automatic dark mode via CSS variables
✓ Semantic color tokens
✓ Consistent spacing scale
✓ Accessible color contrast
✓ Touch-friendly component sizes

## Usage

All components use semantic tokens:

```tsx
// Light mode (automatic)
<div className="bg-primary text-primary-foreground">
  Content
</div>

// Dark mode (wrap with .dark)
<html className="dark">
  <body>
    {/* Colors switch automatically */}
  </body>
</html>
```

## Customization

Edit `app/globals.css` to customize:

```css
:root {
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  /* ... other colors ... */
}
```

Or use Tailwind arbitrary values:

```tsx
<div className="bg-[oklch(0.5_0.2_260)]">
  Custom color
</div>
```

## Color Space Advantage (OKLCH)

- **Uniform perception:** Equal lightness steps = equal visual steps
- **Better gradients:** Smooth color transitions
- **Accessible:** Easier to maintain contrast requirements
- **Modern:** Native CSS support
- **Flexible:** Can express any sRGB color
