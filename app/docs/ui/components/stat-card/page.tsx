import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import type { TocItem } from "@/app/docs/_lib/toc"
import StatCardDefault from "@/ui/components/stat-card/default"
import StatCardDemo from "@/ui/components/stat-card/demo"
import StatCardDescriptionExample from "@/ui/components/stat-card/description"
import StatCardLoading from "@/ui/components/stat-card/loading"
import StatCardMuted from "@/ui/components/stat-card/muted"
import StatCardOutline from "@/ui/components/stat-card/outline"
import StatCardSize from "@/ui/components/stat-card/size"

const examples = [
  {
    id: "default",
    title: "Default",
    description: "Revenue metric with an upward trend indicator.",
    component: StatCardDefault,
    sourcePath: "ui/components/stat-card/default.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    description: "Common dashboard stat combinations including loading state.",
    component: StatCardDemo,
    sourcePath: "ui/components/stat-card/demo.tsx",
  },
  {
    id: "description",
    title: "Description",
    description: "User count with supporting description text.",
    component: StatCardDescriptionExample,
    sourcePath: "ui/components/stat-card/description.tsx",
  },
  {
    id: "loading",
    title: "Loading",
    description: "Skeleton placeholder while data is fetched.",
    component: StatCardLoading,
    sourcePath: "ui/components/stat-card/loading.tsx",
  },
  {
    id: "size",
    title: "Size",
    description: "Default and compact card sizes.",
    component: StatCardSize,
    sourcePath: "ui/components/stat-card/size.tsx",
  },
  {
    id: "outline",
    title: "Outline",
    description: "Outlined surface variant for secondary metrics.",
    component: StatCardOutline,
    sourcePath: "ui/components/stat-card/outline.tsx",
  },
  {
    id: "muted",
    title: "Muted",
    description: "Muted background variant for low-emphasis stats.",
    component: StatCardMuted,
    sourcePath: "ui/components/stat-card/muted.tsx",
  },
] as const

const toc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 as const })),
  { id: "props", title: "Props" },
  { id: "best-practices", title: "Best Practices" },
]

export default function StatCardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Stat Card"
        description="Displays a labeled numeric statistic with optional trend badge and description."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Stat Card composes Card, Label, and Badge primitives into a focused metric
          display. All state is controlled externally through props — pass{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">loading</code> for
          skeleton placeholders, or use sub-components for custom layouts.
        </p>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock
          code={`import { StatCard } from "@/ui/components/stat-card/stat-card"

<StatCard
  label="Revenue"
  value="$48,250"
  trend={{ value: "12%", direction: "up" }}
  description="Compared to last month"
/>`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection key={example.id} id={example.id} title={example.title}>
                <p className="mb-4 text-sm text-muted-foreground">{example.description}</p>
                <ComponentExample source={readSource(example.sourcePath)}>
                  <Component />
                </ComponentExample>
              </DocsSection>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection id="props" title="Props">
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="mb-2 font-semibold">StatCard</h4>
            <ul className="ml-4 space-y-2 text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-2 py-1">label</code>
                <span className="ml-2">string — metric title</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">value</code>
                <span className="ml-2">string — formatted stat value</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">trend</code>
                <span className="ml-2">
                  {"{ value: string; direction?: \"up\" | \"down\" | \"neutral\"; label?: string }"}
                </span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">description</code>
                <span className="ml-2">string — supporting context below the value</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">loading</code>
                <span className="ml-2">boolean (default: false) — renders skeleton state</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">variant</code>
                <span className="ml-2">
                  &quot;default&quot; | &quot;outline&quot; | &quot;muted&quot; (default:
                  &quot;default&quot;)
                </span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">size</code>
                <span className="ml-2">
                  &quot;default&quot; | &quot;sm&quot; (default: &quot;default&quot;)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Sub-components</h4>
            <ul className="ml-4 space-y-2 text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-2 py-1">StatCardHeader</code>
                <span className="ml-2">Top row for label and trend</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">StatCardLabel</code>
                <span className="ml-2">Metric title (wraps Label primitive)</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">StatCardValue</code>
                <span className="ml-2">Primary numeric display</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">StatCardTrend</code>
                <span className="ml-2">Trend badge with directional icon</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">StatCardDescription</code>
                <span className="ml-2">Secondary supporting text</span>
              </li>
              <li>
                <code className="rounded bg-muted px-2 py-1">StatCardSkeleton</code>
                <span className="ml-2">Standalone loading placeholder</span>
              </li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="best-practices" title="Best Practices">
        <DocsCallout title="Keep values pre-formatted" variant="info">
          Pass display-ready strings for <code>value</code> and trend percentages (e.g.{" "}
          <code>&quot;$48,250&quot;</code>, <code>&quot;12%&quot;</code>). Formatting logic
          stays in your data layer.
        </DocsCallout>
        <DocsCallout title="Use loading for async data" variant="info">
          Set <code>loading</code> while fetching metrics to preserve layout and avoid layout
          shift. Skeleton dimensions match the loaded card.
        </DocsCallout>
        <DocsCallout title="Trend accessibility" variant="info">
          Trend badges include an <code>aria-label</code> derived from direction and value.
          Provide a custom <code>trend.label</code> when additional context is needed.
        </DocsCallout>
      </DocsSection>
    </DocsPage>
  )
}
