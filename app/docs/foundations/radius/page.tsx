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
import { radiusTokens } from "@/app/docs/_lib/design-tokens"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "base", title: "Base Radius" },
  { id: "scale", title: "Scale" },
  { id: "usage", title: "Usage" },
  { id: "guidelines", title: "Guidelines" },
]

export default function RadiusPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Border Radius"
        description="A single base radius generates seven derived tokens. Change --radius once to reskin every button, input, and card in the system."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Border radius tokens live in <code>app/globals.css</code> under{" "}
          <code>@theme inline</code>. Components reference Tailwind classes like{" "}
          <code>rounded-lg</code> and <code>rounded-2xl</code> — not raw pixel
          values.
        </p>
      </DocsSection>

      <DocsSection id="base" title="Base Radius">
        <div className="flex items-center gap-6 rounded-xl border p-6">
          <div
            className="size-24 shrink-0 border-2 border-primary bg-primary/10"
            style={{ borderRadius: "var(--radius)" }}
          />
          <div className="space-y-1">
            <code className="text-sm">--radius: 0.625rem</code>
            <p className="text-sm text-muted-foreground">
              10px base. All other radius tokens are calculated from this value.
            </p>
          </div>
        </div>
        <CodeBlock
          className="mt-4"
          code={`:root {
  --radius: 0.625rem;
}

@theme inline {
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-sm: calc(var(--radius) * 0.6);
  /* … */
}`}
        />
      </DocsSection>

      <DocsSection
        id="scale"
        title="Scale"
        description="Visual reference for each radius level."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {radiusTokens.map((item) => (
            <div
              key={item.token}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <div
                className={`size-16 shrink-0 border-2 border-foreground/20 bg-muted ${item.className}`}
              />
              <div className="min-w-0">
                <code className="text-sm">{item.className}</code>
                <p className="text-xs text-muted-foreground">
                  {item.value} · {item.formula}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DocsTable
          headers={["Token", "CSS Variable", "Formula", "Value", "Class"]}
          className="mt-6"
        >
          {radiusTokens.map((item) => (
            <DocsTableRow key={item.token}>
              <DocsTableCell mono>{item.token}</DocsTableCell>
              <DocsTableCell mono>{item.cssVar}</DocsTableCell>
              <DocsTableCell className="text-muted-foreground">
                {item.formula}
              </DocsTableCell>
              <DocsTableCell mono>{item.value}</DocsTableCell>
              <DocsTableCell mono>{item.className}</DocsTableCell>
            </DocsTableRow>
          ))}
        </DocsTable>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <DocsTable headers={["Component", "Typical radius", "Rationale"]}>
          <DocsTableRow>
            <DocsTableCell>Button, Input, Badge</DocsTableCell>
            <DocsTableCell mono>rounded-2xl</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Pill-like controls, friendly and tappable
            </DocsTableCell>
          </DocsTableRow>
          <DocsTableRow>
            <DocsTableCell>Card, Dialog</DocsTableCell>
            <DocsTableCell mono>rounded-xl</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Elevated surfaces with visible corners
            </DocsTableCell>
          </DocsTableRow>
          <DocsTableRow>
            <DocsTableCell>Avatar, Switch thumb</DocsTableCell>
            <DocsTableCell mono>rounded-full</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Circular elements
            </DocsTableCell>
          </DocsTableRow>
        </DocsTable>
      </DocsSection>

      <DocsSection id="guidelines" title="Guidelines">
        <DocsCallout variant="tip">
          To make the entire system sharper or rounder, change only{" "}
          <code>--radius</code> in <code>globals.css</code>. Derived tokens
          update automatically.
        </DocsCallout>
        <p className="mt-4 text-muted-foreground">
          Avoid mixing unrelated radius sizes on sibling elements (e.g.{" "}
          <code>rounded-sm</code> button inside a <code>rounded-3xl</code> card)
          unless there is a deliberate visual reason.
        </p>
      </DocsSection>
    </DocsPage>
  )
}
