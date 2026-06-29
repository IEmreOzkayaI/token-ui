# Token UI Design System Conventions

## Setup & Styling

Components wrapped in `NextThemesProvider` (from `next-themes`) for light/dark mode. Base layer uses **CSS custom properties** (tokens) defined in `app/globals.css`:

```typescript
// Usage in designs
<Button className="bg-primary text-primary-foreground">Click</Button>
```

## Design Tokens

Colors use oklch() in custom properties. Full list in `styles.css`:

- **Surface**: `--sidebar`, `--card`, `--popover`, `--background`
- **Content**: `--foreground`, `--muted`, `--muted-foreground`
- **Interactive**: `--primary`, `--secondary`, `--accent`, `--destructive`
- **Borders**: `--border`, `--input`, `--ring`
- **Radius**: `--radius` (0.625rem base) + scale: `-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-3xl`, `-4xl`
- **Charts**: `--chart-1` through `--chart-5` (oklch palette)

Dark mode automatic via `.dark` class override (no manual setup needed).

## Typography

Tailwind classes (no custom font files). System uses:
- Font stack: sans-serif (system default) + monospace
- Scale: `text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-3xl` (Tailwind scale)
- Weights: regular (400), medium (500), semibold (600)

No custom heading component — use Button, Card, Label with Tailwind text classes.

## Icons

Components accept Lucide React icons via `icon` prop (e.g. Button) or `<Icon />` direct usage. 2000+ icons available (`lucide-react` package). Examples:

```typescript
import { Plus, ChevronDown } from "lucide-react"

<Button icon={<Plus />}>Add Item</Button>
```

## Component Patterns

**All base-ui + Radix UI foundations**. Wrapped in Tailwind styling layer.

- **Form**: Input, Textarea, Select, Checkbox, RadioGroup, Field (layout wrapper)
- **Layout**: Card, Sheet, Drawer, Dialog, Popover, Sidebar, ScrollArea
- **Nav**: Tabs, Breadcrumb, Pagination, NavigationMenu
- **Display**: Table, Chart (recharts-based), Calendar, Carousel, Badge, Avatar
- **Feedback**: Alert, AlertDialog, Empty, Progress, Skeleton, Spinner
- **Controls**: Button, ButtonGroup, Toggle, ToggleGroup, Slider, Combobox, Command

No inline styles — use Tailwind only.

## Defaults

- Border radius: `rounded-lg` (medium, from `--radius`)
- Spacing: Tailwind scale (4px base: `gap-1` = 4px, `gap-4` = 16px)
- Interactive states: `:hover`, `:focus`, `:disabled` built into component styles
- Dark mode: automatic when `.dark` class on root (next-themes handles this)

## Example: Build a Form

```typescript
import { Button } from "@/ui/primitives/button"
import { Input } from "@/ui/primitives/input"
import { Card } from "@/ui/primitives/card"
import { Label } from "@/ui/primitives/label"

export function LoginForm() {
  return (
    <Card className="w-full max-w-md p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button className="w-full">Sign In</Button>
      </div>
    </Card>
  )
}
```

## CSS Closure

Designs receive `styles.css` which `@import`s:
- Component bundle styles (`_ds_bundle.css`)
- Tailwind directives (reset, utilities)
- Token definitions (custom properties)

Everything needed for unstyled-to-styled is in that closure.
