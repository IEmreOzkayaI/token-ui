# Installation Guide

Design system with 50+ UI primitives and examples.

## Structure

```
components/
├── ui/
│   ├── primitives/          # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (50+ more)
│   ├── examples/            # Component examples
│   │   ├── alert-demo.tsx
│   │   ├── button-demo.tsx
│   │   └── card-demo.tsx
│   └── registry.json        # Component registry
├── registry.ts              # Export utilities
└── index.ts                 # Package exports
```

## Installation

### Option 1: Copy Individual Primitives

Copy any component from `components/ui/primitives/`:

```bash
cp components/ui/primitives/button.tsx your-project/components/ui/
cp components/ui/primitives/card.tsx your-project/components/ui/
```

### Option 2: Copy Examples

Copy example components from `components/ui/examples/`:

```bash
cp components/ui/examples/button-demo.tsx your-project/components/ui/examples/
```

### Option 3: Use via Import (as Monorepo)

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/ui/primitives/*": ["./components/ui/primitives/*"],
      "@/components/ui/examples/*": ["./components/ui/examples/*"]
    }
  }
}
```

Then import directly:

```tsx
import { Button } from "@/components/ui/primitives/button"
import { ButtonDemo } from "@/components/ui/examples/button-demo"
```

## Usage

### Basic Primitive

```tsx
import { Button } from "@/components/ui/primitives/button"

export default function App() {
  return <Button>Click me</Button>
}
```

### Using Examples

```tsx
import { ButtonVariants } from "@/components/ui/examples/button-demo"

export default function App() {
  return <ButtonVariants />
}
```

## Dependencies

### Required
- React 18+
- Next.js 13+ (with App Router)
- Tailwind CSS v4
- TypeScript (optional)

### Optional UI Dependencies
- `radix-ui` - For complex components (accordion, dialog, tabs, etc)
- `class-variance-authority` - For component variants
- `clsx` + `tailwind-merge` - For className merging

## Customization

All components use Tailwind CSS and accept a `className` prop:

```tsx
<Button className="custom-class">Custom Button</Button>

<Card className="bg-blue-50">
  <CardContent>Custom card</CardContent>
</Card>
```

## Dark Mode

Dark mode is automatic via CSS variables. Components use semantic color tokens:

```tsx
// Automatically adapts to dark mode
<div className="bg-card text-foreground">
  Content
</div>
```

## Registry

View `components/registry.json` for full list of:
- Available primitives
- Component descriptions
- Dependencies
- Examples

## Support

For issues or questions about components, check:
1. Component source in `components/ui/primitives/`
2. Examples in `components/ui/examples/`
3. Live docs at `/docs`
