import { ColorSwatch } from "@/app/docs/_components/color-swatch"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import {
  DocsTable,
  DocsTableCell,
  DocsTableRow,
} from "@/app/docs/_components/docs-table"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { chartColors, semanticColors } from "@/app/docs/_lib/design-tokens"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "semantic", title: "Semantic Tokens" },
  { id: "charts", title: "Chart Colors" },
  { id: "usage", title: "Usage" },
  { id: "dark-mode", title: "Dark Mode" },
  { id: "guidelines", title: "Guidelines" },
]

export default function ColorsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Colors"
        description="A semantic color system built on OKLCH. Tokens describe intent — primary, muted, destructive — not specific hues, so components stay themeable and accessible."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Colors are defined as CSS custom properties in{" "}
          <code>app/globals.css</code> and mapped to Tailwind utilities via{" "}
          <code>@theme inline</code>. Never reference raw OKLCH values in
          components; always use semantic token names so light and dark modes
          stay in sync.
        </p>
        <DocsCallout title="Why OKLCH?" variant="tip">
          OKLCH is perceptually uniform — equal lightness steps look equally
          bright to the human eye. This makes accessible contrast tuning and
          dark mode generation more predictable than hex or HSL.
        </DocsCallout>
      </DocsSection>

      <DocsSection
        id="semantic"
        title="Semantic Tokens"
        description="Core palette used across every primitive."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {semanticColors.map((color) => (
            <ColorSwatch
              key={color.token}
              token={color.token}
              tailwindClass={color.tailwind}
              description={color.description}
              light={color.light}
              dark={color.dark}
            />
          ))}
        </div>
      </DocsSection>

      <DocsSection
        id="charts"
        title="Chart Colors"
        description="Sequential palette for data visualization components."
      >
        <div className="grid grid-cols-5 gap-3">
          {chartColors.map((color) => (
            <div key={color.token} className="space-y-2 text-center">
              <div
                className="h-16 rounded-lg border"
                style={{ backgroundColor: color.value }}
              />
              <code className="text-xs">{color.token}</code>
            </div>
          ))}
        </div>
        <DocsTable headers={["Token", "CSS Variable", "Value"]} className="mt-4">
          {chartColors.map((color) => (
            <DocsTableRow key={color.token}>
              <DocsTableCell mono>{color.token}</DocsTableCell>
              <DocsTableCell mono>{color.cssVar}</DocsTableCell>
              <DocsTableCell mono className="text-muted-foreground">
                {color.value}
              </DocsTableCell>
            </DocsTableRow>
          ))}
        </DocsTable>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground">
          Prefer Tailwind semantic classes in components. Reach for CSS
          variables only when Tailwind utilities are not available.
        </p>
        <CodeBlock
          code={`// ✅ Tailwind semantic classes
<button className="bg-primary text-primary-foreground hover:bg-primary/80">
  Save changes
</button>

<p className="text-muted-foreground">Helper text</p>

// ✅ CSS variables (custom styles, charts)
<div style={{ color: "var(--primary)" }} />

// ❌ Avoid hard-coded colors
<button className="bg-blue-600">Save</button>`}
        />
      </DocsSection>

      <DocsSection id="dark-mode" title="Dark Mode">
        <p className="text-muted-foreground">
          Dark values live under the <code>.dark</code> selector in{" "}
          <code>globals.css</code>. Components require no changes — the same{" "}
          <code>bg-primary</code> class resolves to the correct value per theme.
        </p>
        <CodeBlock
          code={`.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.424 0.199 265.638);
  /* … */
}

// Enable on <html>
<html className="dark">`}
        />
      </DocsSection>

      <DocsSection id="guidelines" title="Guidelines">
        <div className="space-y-4">
          {[
            {
              title: "Use semantic names in specs",
              body: 'Write "primary button on default background" — not "#4F46E5 on white".',
            },
            {
              title: "Reserve destructive for irreversible actions",
              body: "Delete account, remove payment method — not generic form validation.",
            },
            {
              title: "Muted is for hierarchy, not disability",
              body: "Use muted-foreground for secondary text. Use the disabled attribute for inactive controls.",
            },
            {
              title: "Test contrast in both themes",
              body: "Verify foreground/background pairs meet WCAG AA (4.5:1 for body text) before shipping.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border p-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
