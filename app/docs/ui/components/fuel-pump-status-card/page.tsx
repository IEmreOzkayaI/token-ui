import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { readSource } from "@/app/docs/_lib/read-source"
import FuelPumpStatusCardDefault from "@/ui/components/fuel-pump-status-card/default"
import FuelPumpStatusCardDemo from "@/ui/components/fuel-pump-status-card/demo"
import FuelPumpStatusCardError from "@/ui/components/fuel-pump-status-card/error"
import FuelPumpStatusCardFueling from "@/ui/components/fuel-pump-status-card/fueling"
import FuelPumpStatusCardMaintenance from "@/ui/components/fuel-pump-status-card/maintenance"
import FuelPumpStatusCardOffline from "@/ui/components/fuel-pump-status-card/offline"
import FuelPumpStatusCardOnline from "@/ui/components/fuel-pump-status-card/online"
import FuelPumpStatusCardSize from "@/ui/components/fuel-pump-status-card/size"
import FuelPumpStatusCardUsage from "@/ui/components/fuel-pump-status-card/usage"

const examples = [
  {
    id: "usage",
    title: "Usage",
    description: "Real-world example with callbacks and alert state management.",
    component: FuelPumpStatusCardUsage,
    sourcePath: "ui/components/fuel-pump-status-card/usage.tsx",
  },
  {
    id: "default",
    title: "Default",
    description: "Idle pump with daily totals and fuel breakdown.",
    component: FuelPumpStatusCardDefault,
    sourcePath: "ui/components/fuel-pump-status-card/default.tsx",
  },
  {
    id: "online",
    title: "Online",
    description: "Pump is online and ready, no active transaction.",
    component: FuelPumpStatusCardOnline,
    sourcePath: "ui/components/fuel-pump-status-card/online.tsx",
  },
  {
    id: "fueling",
    title: "Fueling",
    description: "Active transaction in progress with live amount and liters.",
    component: FuelPumpStatusCardFueling,
    sourcePath: "ui/components/fuel-pump-status-card/fueling.tsx",
  },
  {
    id: "offline",
    title: "Offline",
    description: "Pump is unreachable. Disconnected connection quality.",
    component: FuelPumpStatusCardOffline,
    sourcePath: "ui/components/fuel-pump-status-card/offline.tsx",
  },
  {
    id: "error",
    title: "Error",
    description: "Pump in error state with critical and warning alerts.",
    component: FuelPumpStatusCardError,
    sourcePath: "ui/components/fuel-pump-status-card/error.tsx",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Pump taken offline for scheduled maintenance.",
    component: FuelPumpStatusCardMaintenance,
    sourcePath: "ui/components/fuel-pump-status-card/maintenance.tsx",
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm / md / lg size variants for different layout densities.",
    component: FuelPumpStatusCardSize,
    sourcePath: "ui/components/fuel-pump-status-card/size.tsx",
  },
  {
    id: "demo",
    title: "Grid Demo",
    description: "Responsive grid of all pump states. Alerts are dismissable.",
    component: FuelPumpStatusCardDemo,
    sourcePath: "ui/components/fuel-pump-status-card/demo.tsx",
  },
] as const

const toc = [
  { id: "overview", title: "Overview" },
  { id: "examples", title: "Examples" },
  { id: "usage", title: "Usage", depth: 3 as const },
  { id: "default", title: "Default", depth: 3 as const },
  { id: "online", title: "Online", depth: 3 as const },
  { id: "fueling", title: "Fueling", depth: 3 as const },
  { id: "offline", title: "Offline", depth: 3 as const },
  { id: "error", title: "Error", depth: 3 as const },
  { id: "maintenance", title: "Maintenance", depth: 3 as const },
  { id: "sizes", title: "Sizes", depth: 3 as const },
  { id: "demo", title: "Grid Demo", depth: 3 as const },
  { id: "props", title: "Props" },
  { id: "data-shape", title: "Data Shape" },
  { id: "component-source", title: "Component Source" },
  { id: "accessibility", title: "Accessibility" },
  { id: "best-practices", title: "Best Practices" },
]

export default function FuelPumpStatusCardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Fuel Pump Status Card"
        description="Compact operational card showing real-time status and daily sales performance of a fuel station pump. Designed for dense operator dashboards."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">FuelPumpStatusCard</code> is a
          controlled, presentational component. It accepts pump data via props and delegates all
          business logic to the consumer. Formatting and aggregate helpers live in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">utils.ts</code> and are exported
          for reuse.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Use it inside responsive station overview grids. The card adapts from single-column mobile
          layouts to dense 4-column desktop grids. All status states (online, idle, fueling, offline,
          maintenance, error) have distinct visual treatments without relying on color alone.
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
                ["pumpId", "string", "Yes", "Unique identifier for the pump."],
                ["pumpName", "string", "Yes", "Human-readable pump name or location label."],
                ["pumpNumber", "number", "Yes", "Display number shown in the card header."],
                ["status", "online | offline | idle | fueling | maintenance | error", "Yes", "Current operational status. Controls the status badge, color strip, and layout."],
                ["connectionQuality", "good | unstable | disconnected", "Yes", "Connection indicator shown in the header."],
                ["activeNozzle", "number", "No", "Nozzle number currently active. Shown during fueling."],
                ["currentTransaction", "CurrentTransaction", "No", "Active transaction details. Rendered only when status is fueling."],
                ["dailyTotals", "DailyTotals", "Yes", "Aggregated daily revenue, liters, and transaction count."],
                ["fuelBreakdown", "FuelBreakdownItem[]", "Yes", "Per-fuel-type breakdown with liters, revenue, and percentage."],
                ["alerts", "PumpAlert[]", "No", "Array of active alerts shown in the alert section."],
                ["lastTransactionAt", "string (ISO 8601)", "No", "Timestamp of the last completed transaction."],
                ["lastSyncAt", "string (ISO 8601)", "Yes", "Timestamp of the last data sync."],
                ["compact", "boolean", "No", "Forces compact layout (hides breakdown, meta, descriptions)."],
                ["variant", "default | compact | elevated", "No", "Card variant. compact hides non-critical sections. elevated adds shadow."],
                ["size", "sm | md | lg", "No", "Controls internal spacing. Default is md."],
                ["className", "string", "No", "Additional CSS classes for the card root."],
                ["onClick", "() => void", "No", "Makes the card keyboard-focusable and clickable."],
                ["onViewDetails", "() => void", "No", "Shows a Details action button in the card footer."],
                ["onOpenTransactions", "() => void", "No", "Shows a Transactions action button in the card footer."],
                ["onResolveAlert", "(alertId: string) => void", "No", "Callback to dismiss an individual alert. Shows dismiss button per alert."],
              ].map(([prop, type, required, desc]) => (
                <tr key={prop} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-[200px]">{type}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{required}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection id="data-shape" title="Data Shape">
        <p className="text-sm text-muted-foreground mb-4">
          Key nested types used in props.
        </p>
        <div className="space-y-4">
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">CurrentTransaction</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  amount: number          // transaction amount in TRY
  liters: number          // liters dispensed so far
  fuelType: FuelType      // gasoline | diesel | lpg | premiumDiesel
  startedAt: string       // ISO 8601 timestamp
}`}</pre>
          </div>
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">FuelBreakdownItem</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  fuelType: FuelType
  label: string           // display label (e.g. "Premium Diesel")
  liters: number
  revenue: number
  percentage: number      // 0–100, pre-calculated
}`}</pre>
          </div>
          <div className="rounded-xl border p-4 text-sm space-y-1">
            <p className="font-semibold">PumpAlert</p>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{`{
  id: string
  type: paymentMismatch | nozzleError | communicationTimeout
       | tankStockWarning | calibrationRequired
  title: string
  description?: string
  severity: info | warning | critical
}`}</pre>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="component-source" title="Component Source">
        <p className="text-sm text-muted-foreground mb-4">
          Full implementation of <code className="text-foreground">index.tsx</code>. Includes the main component and all internal sub-components.
        </p>
        <div className="overflow-hidden rounded-xl border bg-background">
          <pre className="overflow-x-auto p-4 text-xs leading-6 font-mono text-muted-foreground" style={{ maxHeight: "800px", overflowY: "auto" }}>
            {readSource("ui/components/fuel-pump-status-card/index.tsx")}
          </pre>
        </div>
      </DocsSection>

      <DocsSection id="accessibility" title="Accessibility">
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>When <code className="text-foreground">onClick</code> is provided, the card receives <code className="text-foreground">role=&quot;button&quot;</code> and <code className="text-foreground">tabIndex=0</code>. Enter and Space activate it.</li>
          <li>Status and connection indicators include <code className="text-foreground">aria-label</code>. Status is never conveyed by color alone — text label is always visible.</li>
          <li>Alert list uses <code className="text-foreground">role=&quot;list&quot;</code> and each alert has <code className="text-foreground">role=&quot;listitem&quot;</code>.</li>
          <li>Dismiss buttons use <code className="text-foreground">aria-label</code> with the alert title.</li>
          <li>Progress bars for fuel breakdown include <code className="text-foreground">aria-label</code> with percentage.</li>
          <li>Action buttons in the footer are native <code className="text-foreground">&lt;button&gt;</code> elements with <code className="text-foreground">type=&quot;button&quot;</code>.</li>
        </ul>
      </DocsSection>

      <DocsSection id="best-practices" title="Best Practices">
        <div className="space-y-3">
          <DocsCallout variant="tip" title="Keep data fetching outside">
            This component is fully controlled and presentational. Fetch pump data in a parent
            container (SWR, React Query, or server component) and pass it via props.
          </DocsCallout>
          <DocsCallout variant="tip" title="Pre-calculate fuel percentages">
            Pass already-normalized percentages in <code>fuelBreakdown[].percentage</code>. If
            needed, use <code>normalizeFuelBreakdownPercentages()</code> from{" "}
            <code>utils.ts</code> to derive them from raw liter values.
          </DocsCallout>
          <DocsCallout variant="info" title="Use compact for dense grids">
            Switch to <code>variant=&quot;compact&quot;</code> or <code>compact=true</code> when
            rendering 4+ cards per row. This hides the fuel breakdown section and meta timestamps
            to keep the card scannable at small widths.
          </DocsCallout>
          <DocsCallout variant="warning" title="Error and maintenance states are intentional">
            Do not render error or maintenance cards as &quot;normal&quot; cards with color changes.
            These states must be communicated clearly to operators. Use the provided status
            configuration; avoid overriding status badge colors via className.
          </DocsCallout>
          <DocsCallout variant="info" title="Not a full analytics dashboard">
            This component shows operational status and daily totals. For full analytics,
            charts, and historical trends, use a dedicated dashboard block (ui/blocks/), not
            this card.
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
