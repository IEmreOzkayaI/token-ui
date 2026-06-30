/** Shared responsive design requirements appended to every Token UI prompt template. */
export const RESPONSIVE_REQUIREMENTS_SECTION = `
---

RESPONSIVE DESIGN (REQUIRED):

Implement and verify at all four breakpoints:
- Mobile: < 640px (default, no prefix)
- Tablet portrait: 640–1024px (sm: through below lg:)
- Tablet landscape: ~1024px (lg:)
- Desktop: ≥ 1280px (xl: and above)

Layout:
- Stack single-column on mobile; expand columns with sm:/lg:/xl: grid utilities
- Two- and three-column sections collapse to one column below xl: unless a narrower breakpoint is specified
- Toolbars and filter rows: flex-col on mobile, flex-wrap on sm+, horizontal alignment on lg+
- Sidebar or secondary nav: collapse to Sheet/Drawer on mobile when present

Touch & overflow:
- Interactive controls: min-h-9 minimum; primary actions min-h-10 on mobile
- Tables: wrap in overflow-x-auto; set min-width on table when columns must not wrap
- Avoid horizontal page scroll — use intentional overflow-x-auto on chart/table regions only
- Long labels: truncate or wrap; use line-clamp where appropriate

Charts & data visualization:
- ChartContainer: w-full, aspect-auto, responsive min-height (min-h-[280px] mobile, min-h-[360px] desktop)
- Wide charts: overflow-x-auto wrapper with computed minWidth when data points exceed viewport
- Horizontal bar charts: adequate YAxis width; truncate long category labels on narrow screens
- Legends and KPI strips: allow wrap on narrow viewports

Common Tailwind patterns:
- KPI strip: grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 (adjust count to KPI total)
- Side-by-side panels: grid gap-6 xl:grid-cols-2
- Dashboard hero (chart + sidebar): grid gap-6 xl:grid-cols-3 with main xl:col-span-2

Self-verify at 375px, 768px, 1024px, and 1280px viewports before returning code.`

/** Screen-specific responsive rules placeholder for build-screen prompt. */
export const RESPONSIVE_BREAKPOINTS_REFERENCE = `Breakpoints:
- mobile (< 640px / sm)
- tablet portrait (640–1024px / sm–lg)
- tablet landscape (~1024px / lg)
- desktop (≥ 1280px / xl)`
