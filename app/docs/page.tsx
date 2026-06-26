import Link from "next/link"
import { ArrowRight, Blocks, Code2, Palette, Sparkles } from "lucide-react"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { Button } from "@/primitives/button"
import { Badge } from "@/primitives/badge"

export default function DocsHome() {
  return (
    <DocsPage
      toc={[
        { id: "introduction", title: "Introduction" },
        { id: "features", title: "Features" },
        { id: "quick-start", title: "Quick Start" },
        { id: "foundations", title: "Foundations" },
      ]}
    >
      <DocsPageHeader
        title="Introduction"
        description="Beautifully designed components built with Radix UI and Tailwind CSS. Copy, paste, and customize."
      >
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary">55+ Components</Badge>
          <Badge variant="secondary">Open Source</Badge>
          <Badge variant="secondary">Copy & Paste</Badge>
        </div>
      </DocsPageHeader>

      <DocsSection id="introduction" title="What is UI Tokens?">
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
          UI Tokens is a collection of reusable components built on top of
          Radix UI primitives and styled with Tailwind CSS. The same
          copy-paste approach as shadcn/ui — you own the code, no package
          lock-in.
        </p>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Blocks,
              title: "55+ Components",
              description:
                "Production-ready primitives from Accordion to Tooltip.",
            },
            {
              icon: Code2,
              title: "Copy-Paste Ready",
              description:
                "Drop components into your project and customize freely.",
            },
            {
              icon: Palette,
              title: "Design Tokens",
              description:
                "OKLCH colors, spacing scale, typography, and radius.",
            },
            {
              icon: Sparkles,
              title: "Accessible",
              description:
                "Built on Radix UI with keyboard and screen reader support.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <feature.icon className="mb-3 size-5 text-foreground" />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="quick-start" title="Quick Start">
        <p className="text-muted-foreground">
          Get started by installing dependencies and copying a component into
          your project.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/docs/installation" className="gap-2">
              Installation
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/primitives/accordion">Browse Components</Link>
          </Button>
        </div>
        <CodeBlock
          code={`import { Button } from "@/primitives/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`}
        />
      </DocsSection>

      <DocsSection id="foundations" title="Foundations">
        <p className="text-muted-foreground">
          Design tokens that power every component in the system.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: "/docs/foundations/colors",
              title: "Colors",
              description: "OKLCH color space with light and dark modes.",
            },
            {
              href: "/docs/foundations/typography",
              title: "Typography",
              description: "Type scale, weights, and font families.",
            },
            {
              href: "/docs/foundations/spacing",
              title: "Spacing",
              description: "4px base unit with proportional scale.",
            },
            {
              href: "/docs/foundations/radius",
              title: "Radius",
              description: "Consistent border radius levels.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border p-4 transition-colors hover:bg-muted/50"
            >
              <h3 className="font-medium group-hover:underline">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
