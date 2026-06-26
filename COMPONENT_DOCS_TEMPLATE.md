# Component Documentation Template

Professional component documentation design with better UX.

## Template Features

### 1. Hero Section
- Breadcrumb navigation
- Component title (H1)
- Description (benefits, use case)
- Quick stats (variants, sizes, props count)

### 2. Tabbed Interface
- **Preview Tab** - Live component examples
- **Code Tab** - Copy-friendly code blocks
- **API Tab** - Props reference

### 3. Preview Section
- Installation instructions
- Basic usage example
- Variants grid (visual showcase)
- Sizes grid
- States showcase

### 4. Code Section
- Variant code examples
- Size examples
- Common patterns (with icon, as link)
- Advanced usage

### 5. API Section
- Props table with descriptions
- Type information
- Default values
- Variant/size enum options

### 6. Footer
- Related components
- Quick links

## Design Improvements

✓ **Better Visual Hierarchy**
  - Clear H1 intro
  - Organized sections with H2
  - Stats cards for quick reference

✓ **Tabbed Organization**
  - Preview | Code | API tabs
  - Clean separation of concerns
  - Easy navigation

✓ **Grid Layouts**
  - Variants in 2x3 grid
  - Sizes in 1x4 grid
  - Related components in 3-column grid

✓ **Dark Code Blocks**
  - Dark background (slate-950)
  - Copy button on hover
  - Better readability

✓ **Professional Card Design**
  - Border colors (primary/border)
  - Hover effects
  - Padding and spacing

✓ **Props Reference**
  - Left-aligned props
  - Right-aligned types/defaults
  - Description below

## How to Use

1. Copy this template to primitive component page
2. Replace component name "Button" with actual component
3. Update description
4. Update stats (variants, sizes, props)
5. Add live previews (import from `@/components/ui/components/`)
6. Update code examples
7. Update API props table
8. Update related components

## Paths

- **Primitive components:** `/app/docs/primitives/[component]/page.tsx`
- **Showcase examples:** `/components/components/[component]-showcase.tsx`
- **Template reference:** `/app/docs/components/template/page.tsx`

## Structure Template

```tsx
"use client"

import { /* icons */ } from "lucide-react"
import { useState } from "react"
import { Card } from "@/ui/primitives/card"
import { Button } from "@/ui/primitives/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/primitives/tabs"
import { ButtonShowcase } from "@/components/components/button-showcase"

// Helper components (CodeBlock, PreviewBox)

export default function PrimitivePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {/* Tabs: Preview | Code | API */}
      {/* Related Components */}
    </div>
  )
}
```

## Component Examples

See `/docs/components/template` for full example.

Apply this design to all `/primitives/[component]/` pages.

## Benefits

- Professional appearance
- Better user experience
- Clear information hierarchy
- Easy to scan and find info
- Consistent across components
- Mobile responsive
