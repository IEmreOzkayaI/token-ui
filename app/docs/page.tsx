import Link from "next/link"
import { ArrowRight, Blocks, Code2, Layers, Palette, Shield, Sparkles } from "lucide-react"

import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { Button } from "@/primitives/button"
import { Badge } from "@/primitives/badge"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "philosophy", title: "Philosophy" },
  { id: "audience", title: "Who It's For" },
  { id: "architecture", title: "Architecture" },
  { id: "features", title: "Features" },
  { id: "quick-start", title: "Quick Start" },
  { id: "foundations", title: "Foundations" },
  { id: "next-steps", title: "Next Steps" },
]

const foundations = [
  {
    href: "/docs/foundations/colors",
    title: "Colors",
    description: "Semantic OKLCH tokens with automatic light and dark mode.",
  },
  {
    href: "/docs/foundations/typography",
    title: "Typography",
    description: "Font families, type scale, weights, and usage guidance.",
  },
  {
    href: "/docs/foundations/spacing",
    title: "Spacing",
    description: "4px-based scale for layout rhythm and component density.",
  },
  {
    href: "/docs/foundations/radius",
    title: "Radius",
    description: "Derived border-radius tokens from a single base value.",
  },
  {
    href: "/docs/foundations/shadows",
    title: "Shadows",
    description: "Elevation scale for cards, overlays, and floating UI.",
  },
]

export default function DocsHome() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Introduction"
        description="Token UI is an internal design system for building consistent, accessible product interfaces. It gives developers copy-paste components and gives stakeholders a shared language for color, type, and layout."
      >
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary">55+ Primitives</Badge>
          <Badge variant="secondary">Token-First</Badge>
          <Badge variant="secondary">WCAG-Oriented</Badge>
          <Badge variant="secondary">Dark Mode</Badge>
        </div>
      </DocsPageHeader>

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Token UI combines three layers into one codebase:{" "}
          <strong className="font-medium text-foreground">design foundations</strong>{" "}
          (colors, typography, spacing),{" "}
          <strong className="font-medium text-foreground">primitives</strong>{" "}
          (buttons, inputs, dialogs), and{" "}
          <strong className="font-medium text-foreground">examples</strong>{" "}
          (real-world compositions). Every component is source code in your
          repository — not an opaque npm package — so teams can audit, extend,
          and ship without waiting on upstream releases.
        </p>
        <DocsCallout title="Design system goal" variant="tip">
          Enable any developer or stakeholder to open this documentation,
          understand the visual language, copy a component, and ship a
          production-quality screen in hours — not weeks.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="philosophy" title="Philosophy">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Tokens before components",
              body: "Visual decisions live in CSS variables and Tailwind theme extensions. Components reference semantic tokens — never hard-coded hex values.",
            },
            {
              title: "Own your source",
              body: "Primitives live in ui/primitives/. Copy what you need, delete what you don't, and customize variants without fighting a library API.",
            },
            {
              title: "Accessible by default",
              body: "Built on Radix UI primitives with keyboard navigation, focus management, and ARIA patterns baked into every interactive component.",
            },
            {
              title: "Document the why",
              body: "Each foundation page explains when to use a token, not just its value. Consistency comes from shared intent, not memorizing class names.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border p-5">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="audience" title="Who It's For">
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">Developers</strong> — install
            primitives, compose screens, and extend variants using{" "}
            <code>class-variance-authority</code> patterns already in the
            codebase.
          </p>
          <p>
            <strong className="text-foreground">Designers &amp; stakeholders</strong>{" "}
            — review foundations for brand alignment, reference semantic color
            names in specs, and validate that production UI matches documented
            tokens.
          </p>
          <p>
            <strong className="text-foreground">Platform teams</strong> — use
            this repo as the canonical reference implementation when rolling out
            UI standards across multiple products.
          </p>
        </div>
      </DocsSection>

      <DocsSection id="architecture" title="Architecture">
        <div className="overflow-hidden rounded-xl border font-mono text-sm">
          <pre className="overflow-x-auto bg-muted/40 p-4 leading-relaxed">
{`token-ui/
├── app/globals.css          # Design tokens (CSS variables)
├── lib/utils.ts             # cn() class merge helper
├── ui/
│   ├── primitives/          # Base components (Button, Input, Dialog…)
│   └── components/          # Composed examples (accordion-basic, card-demo…)
└── app/docs/                # This documentation site`}
          </pre>
        </div>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>
            <code>ui/primitives/</code> — atomic, reusable building blocks.
            Import via <code>@/primitives/button</code>.
          </li>
          <li>
            <code>ui/components/</code> — opinionated examples showing how
            primitives compose. Use as copy-paste starting points.
          </li>
          <li>
            <code>app/globals.css</code> — single source of truth for color,
            radius, and theme values.
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Blocks, title: "55+ Primitives", description: "From Accordion to Tooltip, production-ready and documented." },
            { icon: Palette, title: "OKLCH Color System", description: "Perceptually uniform colors with automatic dark mode." },
            { icon: Code2, title: "Copy-Paste Workflow", description: "No runtime dependency on a component library package." },
            { icon: Layers, title: "Composable Examples", description: "Real patterns for cards, forms, navigation, and more." },
            { icon: Shield, title: "Radix Accessibility", description: "Focus traps, escape handling, and screen reader support." },
            { icon: Sparkles, title: "radix-nova Preset", description: "shadcn/ui Nova style — refined radius, spacing, and component defaults." },
          ].map((feature) => (
            <div key={feature.title} className="rounded-xl border bg-card p-5 shadow-sm">
              <feature.icon className="mb-3 size-5" />
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="quick-start" title="Quick Start">
        <p className="text-muted-foreground">
          Three steps to render your first component in a new or existing Next.js
          project.
        </p>
        <ol className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>Follow the <Link href="/docs/installation" className="text-foreground underline underline-offset-4">installation guide</Link> to configure Tailwind and tokens.</li>
          <li>Copy a primitive from <code>ui/primitives/</code> into your project.</li>
          <li>Import and render it in any React component.</li>
        </ol>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/docs/installation" className="gap-2">
              Installation Guide
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/primitives/button">View Components</Link>
          </Button>
        </div>
        <CodeBlock
          code={`import { Button } from "@/primitives/button"

export function Example() {
  return <Button>Get started</Button>
}`}
        />
      </DocsSection>

      <DocsSection id="foundations" title="Foundations">
        <p className="text-muted-foreground">
          Foundations define the visual language every component inherits. Read
          these before customizing primitives or creating new patterns.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {foundations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <h3 className="font-medium group-hover:underline">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="next-steps" title="Next Steps">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/docs/installation" className="rounded-xl border p-4 hover:bg-muted/50">
            <p className="font-medium">Set up your project →</p>
            <p className="mt-1 text-sm text-muted-foreground">Dependencies, tokens, path aliases, and first component.</p>
          </Link>
          <Link href="/docs/foundations/colors" className="rounded-xl border p-4 hover:bg-muted/50">
            <p className="font-medium">Learn the color system →</p>
            <p className="mt-1 text-sm text-muted-foreground">Semantic tokens, OKLCH values, and dark mode behavior.</p>
          </Link>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
