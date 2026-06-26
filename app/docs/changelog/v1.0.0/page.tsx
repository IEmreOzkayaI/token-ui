"use client"

import Link from "next/link"
import { Badge } from "@/primitives/badge"
import { Separator } from "@/primitives/separator"

const features = [
  {
    title: "55 Radix UI Primitives",
    description: "Complete set of accessible, composable UI primitives built on Radix UI. Each primitive is unstyled by default and fully customizable.",
    items: [
      "Accordion, Dialog, Dropdown Menu, Popover, Tabs",
      "Tooltip, Select, Menubar, Context Menu",
      "Checkbox, Radio Group, Switch, Slider, Toggle",
      "And 40+ more primitives",
    ],
  },
  {
    title: "300+ Component Examples",
    description: "Real-world usage examples for every primitive. Copy-paste ready with multiple variants.",
    items: [
      "Multiple variants and compositions per component",
      "Interactive demos with live preview",
      "Source code with syntax highlighting",
      "One-click copy to clipboard",
    ],
  },
  {
    title: "Live Documentation",
    description: "Interactive docs with preview/code tabs, copy buttons, and full-text search.",
    items: [
      "Component preview with code toggle",
      "Full-text search across all docs",
      "Table of contents navigation",
      "Responsive layout with sidebar",
    ],
  },
  {
    title: "Design Foundations",
    description: "OKLCH color system with semantic tokens, typography scale, spacing, radius, and shadows.",
    items: [
      "OKLCH color palette with automatic light/dark",
      "Type scale with responsive sizing",
      "Consistent spacing and radius tokens",
      "Layered shadow system",
    ],
  },
]

export default function V100Page() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <Link
          href="/docs/changelog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Changelog
        </Link>

        <div className="mt-3 flex items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight">v1.0.0</h1>
          <Badge variant="secondary" className="text-[11px]">Latest</Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">June 26, 2025</p>
        <p className="mt-3 text-sm text-muted-foreground">
          The foundation release — 55 primitives, 300+ examples, and a complete design token system.
        </p>
      </div>

      <div className="flex gap-6">
        {[
          { value: "55", label: "Primitives" },
          { value: "300+", label: "Examples" },
          { value: "50+", label: "Tokens" },
          { value: "0", label: "Ext. deps" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-8">
        {features.map((feature) => (
          <div key={feature.title}>
            <h3 className="text-sm font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {feature.description}
            </p>
            <ul className="mt-3 space-y-1">
              {feature.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
