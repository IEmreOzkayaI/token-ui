# Project Structure

Production-ready design system with 55 components, examples, and interactive docs.

## Directory Tree

```
token-ui-demo/
├── 📱 app/                          # Next.js App Router
│   ├── docs/                        # Documentation website
│   │   ├── page.tsx                 # Home page
│   │   ├── layout.tsx               # Docs layout (sidebar + header)
│   │   ├── installation/            # Installation guide
│   │   │   └── page.tsx
│   │   ├── foundations/             # Design foundations (5 pages)
│   │   │   ├── colors/
│   │   │   ├── typography/
│   │   │   ├── spacing/
│   │   │   ├── radius/
│   │   │   └── shadows/
│   │   ├── primitives/              # Primitive component docs (55 pages)
│   │   │   ├── accordion/
│   │   │   ├── alert/
│   │   │   ├── badge/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── ... (50+ more)
│   │   │   └── tooltip/
│   │   └── components/              # Component showcase pages
│   │       └── template/            # Component template
│   ├── page.tsx                     # Home page (/)
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Design tokens + Tailwind
│
├── 📦 components/
│   ├── primitives/              # 55 base components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── ... (51 more)
│   │   └── tooltip.tsx
│   ├── components/              # Component showcase patterns
│   │   ├── accordion-showcase.tsx    # 4 accordion patterns
│   │   ├── alert-demo.tsx           # 4 alert patterns
│   │   ├── button-demo.tsx          # 5 button patterns
│   │   ├── button-showcase.tsx      # Real-world button use
│   │   ├── card-demo.tsx            # 5 card patterns
│   │   ├── dialog-showcase.tsx      # 3 dialog patterns
│   │   ├── form-showcase.tsx        # Forms, settings, checkboxes
│   │   ├── input-showcase.tsx       # Input patterns
│   │   ├── layout-showcase.tsx      # Tabs, grids, cards
│   │   ├── table-showcase.tsx       # Tables, badges
│   │   ├── index.ts                 # Export all examples
│   │   └── ... (more showcases)
│   ├── registry.json            # Component registry
│   └── registry.ts              # Export utilities
│
├── 🔧 lib/
│   └── utils.ts                     # cn() utility
│
├── 🪝 hooks/
│   └── use-mobile.ts                # Mobile detection hook
│
├── 📚 public/
│   └── .gitkeep
│
├── 🛠️ scripts/
│   └── add-all-components.sh        # Install all components
│
├── 📖 Documentation Files
│   ├── README.md                    # Project overview
│   ├── INSTALLATION.md              # Setup guide (3 methods)
│   ├── PRESET.md                    # Color palette (b1ZOMFeJU)
│   ├── STRUCTURE.md                 # This file
│   ├── COMPONENT_DOCS_TEMPLATE.md   # Docs page template
│   ├── AGENTS.md                    # Agent documentation
│   └── CLAUDE.md                    # AI assistant notes
│
├── ⚙️ Config Files
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── components.json              # shadcn config
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── postcss.config.mjs
```

## File Organization Principles

### `components/primitives/` (55 files)
- Official shadcn/ui components from registry
- 1 file per component
- All imports use `@/ui/primitives/`
- No modifications to shadcn source

### `components/components/` (10+ files)
- Real-world usage patterns
- 4-5 variations per component
- Showcase components (button-showcase, form-showcase, etc)
- Merged patterns (dialog, table, layout)
- index.ts exports all

### `app/docs/` (62+ pages)
- Fumadocs-style documentation
- Sidebar navigation with search
- Responsive layout

### `app/docs/primitives/` (55 component pages)
- One directory per component
- page.tsx with tabs (Preview | Code | API)
- Live component examples
- Copy-friendly code blocks
- Props reference table

### `app/docs/components/` (1+ showcase pages)
- Component example showcase pages
- Template page at `/components/template`

### `app/docs/foundations/` (5 pages)
- Colors: OKLCH palette with dark mode
- Typography: Font families, sizes, weights
- Spacing: 4px scale
- Radius: 7-level border radius
- Shadows: Elevation scale

## Naming Conventions

**Primitives:** `button.tsx`, `card.tsx` (kebab-case)

**Examples:** 
- `button-demo.tsx` - Basic patterns
- `button-showcase.tsx` - Advanced + real-world
- `form-showcase.tsx` - Form patterns (combined)
- `dialog-showcase.tsx` - Dialog patterns (combined)

**Docs Routes:** `/docs/primitives/button/page.tsx`

**Imports:**
```tsx
// Primitives
import { Button } from "@/ui/primitives/button"

// Examples
import { ButtonShowcase } from "@/components/components/button-showcase"
```

## File Count Summary

| Type | Count | Notes |
|------|-------|-------|
| Primitives | 55 | shadcn/ui official components |
| Example files | 10+ | Real-world patterns |
| Example exports | 50+ | Functions per file |
| Docs pages | 63 | Home + 5 foundations + 55 components + 2 extra |
| Documentation | 5 | MD files (README, INSTALLATION, etc) |
| **Total files** | **150+** | Production-ready |

## How to Add New Examples

1. Create `components/components/component-showcase.tsx`
2. Export 4-5 showcase functions
3. Update `components/components/index.ts`
4. Use in `/docs/primitives/component/page.tsx`

Example:
```tsx
// components/components/select-showcase.tsx
export function SelectBasic() { }
export function SelectWithIcons() { }
export function SelectDisabled() { }
export function SelectReal() { }

// components/components/index.ts
export { SelectBasic, SelectWithIcons } from "./select-showcase"
```

## How to Update Component Docs

1. Use template: `/docs/components/template/page.tsx`
2. Copy to primitive component page
3. Update:
   - Component name
   - Description
   - Stats (variants, sizes)
   - Live previews (import from `@/components/components/`)
   - Code blocks
   - Props table
4. Test at `/docs/primitives/component`

## Quick Commands

```bash
# Install all components
bash scripts/add-all-components.sh

# Run dev server
pnpm dev

# Access docs
http://localhost:3000/docs
http://localhost:3000/docs/components/template
```

## Tech Stack

- **Framework:** Next.js 16+ with App Router
- **UI:** shadcn/ui (55 components)
- **Styling:** Tailwind CSS v4
- **Colors:** OKLCH (automatic dark mode)
- **Primitives:** Radix UI
- **Icons:** lucide-react
- **Language:** TypeScript

## Customization Points

- **Colors:** `app/globals.css` (CSS variables)
- **Typography:** Tailwind theme
- **Spacing:** 4px base unit (Tailwind scale)
- **Components:** Copy from `components/primitives/`, edit freely
- **Examples:** Add to `components/components/`, export in index

## Zero Config

- No build setup needed
- Copy components, use immediately
- Fully self-contained (no external dependencies beyond Radix/Tailwind)
- Own all code
