import { CollapsibleCodeBlock } from "@/app/docs/_components/code-block"
import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { readSource } from "@/app/docs/_lib/read-source"
import RetailStorePerformanceCardDefault from "@/ui/domain/retail/store-performance-card/default"
import RetailStorePerformanceCardCompact from "@/ui/domain/retail/store-performance-card/compact"
import RetailStorePerformanceCardDetailed from "@/ui/domain/retail/store-performance-card/detailed"
import RetailStorePerformanceCardAlert from "@/ui/domain/retail/store-performance-card/alert"
import RetailStorePerformanceCardSize from "@/ui/domain/retail/store-performance-card/size"
import RetailStorePerformanceCardUsage from "@/ui/domain/retail/store-performance-card/usage"
const examples = [
  {
    id: "usage",
    title: "Usage",
    description: "Real-world detailed card with callbacks wired to visible action feedback.",
    component: RetailStorePerformanceCardUsage,
    sourcePath: "ui/domain/retail/store-performance-card/usage.tsx",
  },
  {
    id: "default",
    title: "Default",
    description: "Standard card showing header, KPI strip, and action footer.",
    component: RetailStorePerformanceCardDefault,
    sourcePath: "ui/domain/retail/store-performance-card/default.tsx",
  },
  {
    id: "compact",
    title: "Compact",
    description: "Compact variant for dense dashboard grids — shows only sales and target completion.",
    component: RetailStorePerformanceCardCompact,
    sourcePath: "ui/domain/retail/store-performance-card/compact.tsx",
  },
  {
    id: "detailed",
    title: "Detailed",
    description: "Full variant including sales trend chart and category insights panel.",
    component: RetailStorePerformanceCardDetailed,
    sourcePath: "ui/domain/retail/store-performance-card/detailed.tsx",
  },
  {
    id: "alert",
    title: "Alert",
    description: "Alert variant for at-risk stores. Renders a prominent warning banner and exposes all action buttons.",
    component: RetailStorePerformanceCardAlert,
    sourcePath: "ui/domain/retail/store-performance-card/alert.tsx",
  },
  {
    id: "size",
    title: "Sizes",
    description: "sm / md / lg spacing variants for different layout densities.",
    component: RetailStorePerformanceCardSize,
    sourcePath: "ui/domain/retail/store-performance-card/size.tsx",
  },
] as const

const toc = [
  { id: "overview", title: "Overview" },
  { id: "examples", title: "Examples" },
  { id: "usage", title: "Usage", depth: 3 as const },
  { id: "default", title: "Default", depth: 3 as const },
  { id: "compact", title: "Compact", depth: 3 as const },
  { id: "detailed", title: "Detailed", depth: 3 as const },
  { id: "alert", title: "Alert", depth: 3 as const },
  { id: "size", title: "Sizes", depth: 3 as const },
  { id: "props", title: "Props" },
  { id: "data-shape", title: "Data Shape" },
  { id: "component-source", title: "Component Source" },
  { id: "accessibility", title: "Accessibility" },
  { id: "best-practices", title: "Best Practices" },
]

export default function RetailStorePerformanceCardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Retail Store Performance Card"
        description="A responsive retail dashboard component for monitoring store-level sales, targets, traffic, conversion, and stock risk."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">RetailStorePerformanceCard</code>{" "}
          is a controlled, presentational component for retail operations dashboards. It accepts store
          data, KPI metrics, category insights, and a sales trend series via props, then delegates
          all business logic to the consumer.
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Use it inside responsive store overview grids or drill-down sidebars. Four variants cover
          the common placement contexts: <code className="text-foreground">compact</code> for dense
          grids, <code className="text-foreground">default</code> for balanced cards,{" "}
          <code className="text-foreground">detailed</code> for store drill-down views with trend
          charts, and <code className="text-foreground">alert</code> for stores requiring immediate
          operational attention. All operational states (open, closed, maintenance, at-risk) use
          distinct visual treatments — color is never the only indicator.
        </p>
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        {examples.map((ex) => (
          <DocsSection key={ex.id} id={ex.id} title={ex.title} nested>
            <ComponentExample
              description={ex.description}
              source={readSource(ex.sourcePath)}
            >
              <ex.component />
            </ComponentExample>
          </DocsSection>
        ))}
      </DocsSection>

      <DocsSection id="props" title="Props">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Prop</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Required</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["store", "RetailStore", "Yes", "Store identity — name, code, region, city, status, and optional manager info."],
                ["metrics", "RetailStoreMetrics", "Yes", "KPI values: daily sales, target %, conversion rate, foot traffic, avg basket, stock risk count."],
                ["insights", "RetailStoreInsight", "No", "Category performance data. Required for detailed variant."],
                ["salesTrend", "RetailSalesTrendPoint[]", "No", "Daily or hourly trend points. Renders sparkline chart when ≥ 2 points provided."],
                ["variant", "default | compact | detailed | alert", "No", "Card layout variant. Default is 'default'."],
                ["size", "sm | md | lg", "No", "Internal spacing scale. Default is 'md'."],
                ["loading", "boolean", "No", "Shows loading skeleton in place of content."],
                ["empty", "boolean", "No", "Shows empty state when no data is available."],
                ["className", "string", "No", "Additional CSS classes applied to the card root."],
                ["onViewDetails", "() => void", "No", "Callback for the View Details action button."],
                ["onExportReport", "() => void", "No", "Callback for Export Report. Visible in detailed and alert variants."],
                ["onContactManager", "() => void", "No", "Callback for Contact Manager. Visible in detailed and alert variants."],
                ["onOpenStockIssues", "() => void", "No", "Callback for Stock Issues button. Highlighted when stockRiskCount > 0."],
              ].map(([prop, type, required, desc]) => (
                <tr key={prop} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-[180px]">{type}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{required}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection id="data-shape" title="Data Shape">
        <p className="mb-4 text-sm text-muted-foreground">
          Key types used in component props.
        </p>
        <div className="space-y-4">
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">RetailStoreStatus</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`"open" | "closed" | "maintenance" | "at-risk"`}</pre>
          </div>
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">RetailStore</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  id: string
  name: string
  code: string               // e.g. "GA-001"
  region: string
  city: string
  status: RetailStoreStatus
  managerName?: string
  managerEmail?: string
}`}</pre>
          </div>
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">RetailStoreMetrics</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  dailySales: number           // currency value
  dailySalesTarget: number     // currency value
  targetCompletionPct: number  // 0–100+ (can exceed 100 when over target)
  conversionRate: number       // 0–100
  footTraffic: number          // integer count
  avgBasketValue: number       // currency value
  stockRiskCount: number       // integer count of at-risk SKUs
}`}</pre>
          </div>
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">RetailStoreInsight</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  topCategory: string
  topCategoryRevenue: number
  worstCategory: string
  worstCategoryRevenue: number
  lowStockWarning: boolean
  refundRate: number           // 0–100 percentage
}`}</pre>
          </div>
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">RetailSalesTrendPoint</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  label: string    // x-axis label, e.g. "Mon", "10:00"
  value: number    // actual sales value
  target?: number  // optional target line value
}`}</pre>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="component-source" title="Component Source">
        <p className="mb-2 text-sm text-muted-foreground">
          File structure for the component folder.
        </p>
        <pre className="mb-6 overflow-x-auto rounded-xl border bg-muted/30 p-4 text-xs leading-6 text-muted-foreground">{`ui/domain/retail/store-performance-card/
├── index.tsx       ← main component + all sub-components
├── types.ts        ← TypeScript types
├── utils.ts        ← formatting + classification helpers
├── _fixtures.ts    ← sample data for demos
├── default.tsx
├── compact.tsx
├── detailed.tsx
├── alert.tsx
├── size.tsx
├── usage.tsx
└── demo.tsx`}</pre>

        <p className="mb-2 text-sm font-medium text-foreground">index.tsx</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Main component with CVA, status config map, sub-components (header, KPI grid, sparkline, insights, actions), loading skeleton, and empty state.
        </p>
        <div className="overflow-hidden rounded-xl border bg-background">
          <CollapsibleCodeBlock code={readSource("ui/domain/retail/store-performance-card/index.tsx")} />
        </div>

        <p className="mb-2 mt-6 text-sm font-medium text-foreground">types.ts</p>
        <p className="mb-3 text-xs text-muted-foreground">
          All exported TypeScript types for the component and its props.
        </p>
        <div className="overflow-hidden rounded-xl border bg-background">
          <CollapsibleCodeBlock code={readSource("ui/domain/retail/store-performance-card/types.ts")} />
        </div>

        <p className="mb-2 mt-6 text-sm font-medium text-foreground">utils.ts</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Formatting helpers (currency, percent, number) and classification functions for target performance thresholds and progress bar styling.
        </p>
        <div className="overflow-hidden rounded-xl border bg-background">
          <CollapsibleCodeBlock code={readSource("ui/domain/retail/store-performance-card/utils.ts")} />
        </div>

        <p className="mb-2 mt-6 text-sm font-medium text-foreground">Demo files</p>
        {(
          [
            ["default.tsx", "Basic default variant with action callbacks."],
            ["compact.tsx", "Three compact cards in a responsive grid."],
            ["detailed.tsx", "Full detailed variant with trend and insights."],
            ["alert.tsx", "Alert variant for an at-risk store."],
            ["size.tsx", "All three size options stacked vertically."],
            ["usage.tsx", "Interactive example with visible action feedback."],
            ["demo.tsx", "Full grid of all variants including loading state."],
          ] as const
        ).map(([file, desc]) => (
          <div key={file} className="mt-4">
            <p className="mb-1 text-xs font-medium text-foreground">{file}</p>
            <p className="mb-2 text-xs text-muted-foreground">{desc}</p>
            <div className="overflow-hidden rounded-xl border bg-background">
              <CollapsibleCodeBlock code={readSource(`ui/domain/retail/store-performance-card/${file}`)} />
            </div>
          </div>
        ))}
      </DocsSection>

      <DocsSection id="accessibility" title="Accessibility">
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>
            Status badges include visible text labels alongside the color dot.{" "}
            <code className="text-foreground">aria-label</code> on the badge element provides
            full context for screen readers: <em>"Store status: At Risk"</em>.
          </li>
          <li>
            All action buttons are native{" "}
            <code className="text-foreground">&lt;button&gt;</code> elements with descriptive{" "}
            <code className="text-foreground">aria-label</code> attributes (e.g.{" "}
            <em>"Open 3 stock issues"</em>).
          </li>
          <li>
            KPI values are paired with visible text labels so that screen reader users hear
            both the label and the value without relying on visual position.
          </li>
          <li>
            The sparkline chart is decorated with{" "}
            <code className="text-foreground">aria-hidden=&quot;true&quot;</code> on the SVG.
            A visually hidden <code className="text-foreground">&lt;p className=&quot;sr-only&quot;&gt;</code>{" "}
            provides a textual summary of the trend range and latest value.
          </li>
          <li>
            The alert banner uses <code className="text-foreground">role=&quot;alert&quot;</code>{" "}
            so assistive technologies announce it immediately when it appears.
          </li>
          <li>
            Loading and empty states carry{" "}
            <code className="text-foreground">role=&quot;status&quot;</code> and{" "}
            <code className="text-foreground">aria-label</code> to communicate data absence
            without relying on visual layout alone.
          </li>
          <li>
            Low stock warning badge uses <code className="text-foreground">role=&quot;status&quot;</code>{" "}
            with a descriptive <code className="text-foreground">aria-label</code>.
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="best-practices" title="Best Practices">
        <div className="space-y-3">
          <DocsCallout variant="tip" title="Use compact in dense dashboard grids">
            Switch to <code>variant=&quot;compact&quot;</code> when rendering 3 or more cards
            per row. The compact layout retains the essential daily sales and target completion
            metrics while suppressing secondary KPIs and location metadata.
          </DocsCallout>
          <DocsCallout variant="tip" title="Use detailed for store drill-down views">
            Reserve <code>variant=&quot;detailed&quot;</code> for drill-down sidebars or
            dedicated store pages. The detailed variant renders the full KPI set, sales trend
            sparkline, and category insights panel — too much information density for a summary
            grid.
          </DocsCallout>
          <DocsCallout variant="warning" title="Use alert only for stores needing attention">
            <code>variant=&quot;alert&quot;</code> is designed for stores that are actively
            at-risk. Do not apply it to stores that are simply underperforming — reserve it
            for situations that require an immediate operational response.
          </DocsCallout>
          <DocsCallout variant="info" title="Do not overload the card with unrelated metrics">
            This component is intentionally scoped to store-level operational performance.
            For historical analytics, regional comparisons, or staff scheduling, use a
            dedicated analytics screen rather than extending this card.
          </DocsCallout>
          <DocsCallout variant="info" title="Handle localization outside the component">
            The default <code>formatCurrency</code> helper uses <code>en-US</code> locale and
            USD. For multi-locale deployments, pre-format values before passing them as strings,
            or replace the utility functions in <code>utils.ts</code> with your own formatter.
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
