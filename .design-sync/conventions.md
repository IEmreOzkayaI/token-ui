# Token UI Design System

**Radix UI + Tailwind CSS + oklch color tokens**. 55 components for building modern UIs.

## Color Palette

### Light Mode (default)
- **Background**: oklch(1 0 0) — pure white
- **Foreground**: oklch(0.145 0 0) — dark charcoal
- **Card/Surfaces**: oklch(1 0 0) white, oklch(0.97 0 0) light gray
- **Primary**: oklch(0.205 0 0) dark navy
- **Secondary**: oklch(0.97 0 0) light gray
- **Accent**: oklch(0.97 0 0) light gray
- **Destructive**: oklch(0.577 0.245 27.325) — red tone
- **Muted**: oklch(0.97 0 0) with oklch(0.556 0 0) text
- **Border/Input**: oklch(0.922 0 0) very light gray
- **Ring/Focus**: oklch(0.708 0 0) medium gray

### Dark Mode
- **Background**: oklch(0.145 0 0) — dark charcoal
- **Foreground**: oklch(0.985 0 0) — near white
- **Card**: oklch(0.205 0 0) dark gray
- **Primary**: oklch(0.488 0.243 264.376) — purple/blue
- **Accent**: oklch(0.269 0 0) very dark gray
- **Input**: oklch(1 0 0 / 15%) — white 15% opacity on dark

### Radius Scale
- `rounded-sm` (radius × 0.6 = ~0.375rem)
- `rounded-md` (radius × 0.8 = ~0.5rem)
- `rounded-lg` (radius × 1 = 0.625rem) — **default**
- `rounded-xl` (radius × 1.4 = ~0.875rem)
- `rounded-2xl` (radius × 1.8 = ~1.125rem)
- `rounded-3xl` (radius × 2.2 = ~1.375rem)
- `rounded-4xl` (radius × 2.6 = ~1.625rem)

### Charts (5-step palette)
- `--chart-1`: oklch(0.87 0 0) light
- `--chart-2`: oklch(0.556 0 0) medium
- `--chart-3`: oklch(0.439 0 0) darker
- `--chart-4`: oklch(0.371 0 0) darker
- `--chart-5`: oklch(0.269 0 0) darkest

## Typography

**No custom fonts** — system sans-serif + monospace via Tailwind:

```css
@theme inline {
  --font-sans: /* system font stack */
  --font-mono: /* monospace stack */
}
```

### Scale (Tailwind)
- `text-xs` 12px (tiny labels)
- `text-sm` 14px (secondary text)
- `text-base` 16px (body)
- `text-lg` 18px (emphasis)
- `text-xl` 20px (subheading)
- `text-2xl` 24px (heading 3)
- `text-3xl` 30px (heading 2)
- `text-4xl` 36px (heading 1)

### Weights
- Regular 400 (body text)
- Medium 500 (labels, buttons)
- Semibold 600 (headings)

## Icons

**Lucide React** (2000+ icons). Import and use directly:

```typescript
import { Plus, ChevronDown, AlertCircle, Search } from "lucide-react"

<Button icon={<Plus size={20} />}>Add</Button>
<IconButton><Search /></IconButton>
```

Common in system: `Plus`, `Minus`, `ChevronDown`, `ChevronUp`, `X`, `Check`, `AlertCircle`, `Info`, `Trash2`, `Edit`, `Search`, `Menu`, `Settings`.

## Components by Category

### Form (7)
- **Input** — text field, `type` controls (email, password, number)
- **Textarea** — multiline text
- **Select** — dropdown (Native or controlled)
- **Checkbox** — binary toggle
- **RadioGroup** — single choice from set
- **Field** — label + input wrapper (combines Label + control)
- **Label** — form labels

### Layout & Containers (8)
- **Card** — bordered box, `className="p-4"` for padding
- **Sheet** — side slide-out panel (drawer alternative)
- **Drawer** — animated slide panel (mobile-friendly)
- **Dialog** — modal overlay, blocks interaction
- **Popover** — floating panel anchored to trigger
- **Sidebar** — fixed/collapsible left nav
- **ScrollArea** — styled scroll container
- **Empty** — empty state placeholder

### Navigation (4)
- **Tabs** — horizontal section switcher
- **Breadcrumb** — path indicator (Home / Category / Item)
- **Pagination** — page navigation
- **NavigationMenu** — multi-level dropdown nav

### Display (6)
- **Table** — sortable/filterable data grid
- **Chart** — recharts-based (Bar, Line, Pie, Area)
- **Calendar** — date picker + display
- **Carousel** — slide show (Embla carousel-based)
- **Badge** — inline label/tag
- **Avatar** — user image + fallback initials

### Feedback & Status (4)
- **Alert** — message box (info/warning/error)
- **AlertDialog** — destructive action confirmation
- **Progress** — progress bar
- **Skeleton** — loading placeholder
- **Spinner** — animated loading indicator
- **Empty** — no data message

### Interactive (6)
- **Button** — action button
- **ButtonGroup** — mutually exclusive buttons
- **Toggle** — on/off switch (icon-based)
- **ToggleGroup** — multi-option toggle set
- **Slider** — range input
- **Combobox** — searchable select dropdown
- **Command** — command palette (keyboard navigable)

### Utilities
- **Direction** — RTL/LTR support
- **Sonner** — toast notifications
- **Item** — list item wrapper
- **Kbd** — keyboard key display (Cmd, Shift, etc.)
- **Resizable** — draggable resize panels
- **Menubar** — macOS-style menu bar
- **NativeSelect** — browser select element
- **Separator** — visual divider line
- **HoverCard** — tooltip-like hover panel

## Layout Patterns

### Form with validation
```typescript
<Form>
  <Field>
    <Label>Email</Label>
    <Input type="email" />
    <span className="text-xs text-destructive">Required</span>
  </Field>
  <Button>Submit</Button>
</Form>
```

### Modal dialog
```typescript
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader><DialogTitle>Confirm</DialogTitle></DialogHeader>
    <p>Are you sure?</p>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Data table
```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell><Badge>{row.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Card with action
```typescript
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Update your preferences</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <Field>
        <Label>Theme</Label>
        <Select>
          <SelectTrigger><SelectValue placeholder="Light" /></SelectTrigger>
        </Select>
      </Field>
    </div>
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

## Styling

**Tailwind utilities only** — no CSS files added per component:

```typescript
// Good
<Button className="bg-primary text-primary-foreground hover:opacity-90">
  Click me
</Button>

// Also good (use Tailwind variants)
<Button className="disabled:opacity-50 disabled:cursor-not-allowed">
  Disabled
</Button>

// Don't use inline styles
<Button style={{ backgroundColor: "red" }}>❌</Button>
```

### Common utilities
- **Colors**: `text-primary`, `bg-card`, `border-border`, `fill-destructive`
- **Spacing**: `p-4` (padding), `gap-2` (grid/flex gap), `space-y-4` (vertical stack)
- **Sizing**: `w-full`, `max-w-md`, `h-10`
- **Layout**: `flex`, `grid`, `justify-center`, `items-center`, `space-y-2`
- **Rounded**: `rounded-md`, `rounded-lg`, `rounded-full`
- **Borders**: `border`, `border-2`, `border-b`
- **Shadows**: `shadow-sm`, `shadow-md`, `shadow-lg`
- **Effects**: `opacity-50`, `blur-sm`, `grayscale`

## Dark Mode

Automatic via `next-themes`. Root element gets `.dark` class; token values override:

```typescript
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  )
}
```

## Accessibility

- All form inputs have associated `<Label>`
- Buttons use semantic `<button>` elements
- Dialogs are ARIA-compliant
- Keyboard navigation built in (Tabs, Menus, Popovers)
- Focus indicators via `--ring` token

## CSS Closure

Designs import `styles.css` which includes:
- Tailwind reset + utilities
- Component bundle styles (`_ds_bundle.css`)
- All token definitions (custom properties)

No external dependencies needed at runtime besides React + Radix UI.
