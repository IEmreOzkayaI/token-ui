import { BlockPreview } from "@/app/docs/_components/block-preview"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { readSource } from "@/app/docs/_lib/read-source"
import AdminDashboard from "@/ui/blocks/AdminDashboard/default"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "features", title: "Features" },
  { id: "example", title: "Example" },
]

export default function AdminDashboardPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Admin Dashboard"
        description="Comprehensive dashboard block with metrics, charts, and transaction tracking."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Admin Dashboard is a complete screen block combining stats cards, line charts, and
          stepper-based transaction monitoring. Designed for fintech applications with real-time
          data visualization and state tracking.
        </p>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>• Responsive stats overview cards with trend indicators</li>
          <li>• Multi-line charts for sales and user activity metrics</li>
          <li>• Transaction cards with visual step progress</li>
          <li>• Full design token integration (colors, shadows, spacing)</li>
          <li>• Dark mode support</li>
          <li>• Accessible typography and contrast ratios</li>
          <li>• Recharts integration with custom tooltip styling</li>
          <li>• Grid-based responsive layout</li>
        </ul>
      </DocsSection>

      <DocsSection id="example" title="Example">
        <BlockPreview source={readSource("ui/blocks/AdminDashboard/default.tsx")} title="Admin Dashboard">
          <AdminDashboard />
        </BlockPreview>
      </DocsSection>

      <DocsSection id="architecture" title="Architecture">
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Component Structure</h4>
            <p className="text-muted-foreground">
              Dashboard composes primitive components (Card, CardHeader, CardContent) with Recharts
              for charting and Lucide icons for status indicators. All styling derives from design
              tokens in globals.css.
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Key Subcomponents</h4>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>
                <code className="bg-muted px-2 py-1 rounded">StatCard</code> — metric display with
                trend indicator
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">StepperCard</code> — transaction
                progress with step visualization
              </li>
              <li>
                <code className="bg-muted px-2 py-1 rounded">LineChart (Recharts)</code> — sales
                and activity trends
              </li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="design-tokens" title="Design Tokens Used">
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            This block references the following tokens from{" "}
            <code className="bg-muted px-2 py-1 rounded">globals.css</code>:
          </p>
          <ul className="space-y-1 text-muted-foreground ml-4 mt-3">
            <li>• <code className="bg-muted px-1">--primary</code> — stat icons, primary line</li>
            <li>• <code className="bg-muted px-1">--secondary</code> — secondary chart line</li>
            <li>• <code className="bg-muted px-1">--accent</code> — accent line and step indicator</li>
            <li>• <code className="bg-muted px-1">--foreground</code> — text headings</li>
            <li>• <code className="bg-muted px-1">--muted-foreground</code> — secondary text</li>
            <li>• <code className="bg-muted px-1">--background</code> — page background</li>
            <li>• <code className="bg-muted px-1">--card</code> — chart tooltip background</li>
            <li>• <code className="bg-muted px-1">--border</code> — chart grid lines</li>
          </ul>
        </div>
      </DocsSection>

      <DocsSection id="responsive" title="Responsive Behavior">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Stats grid: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
          </p>
          <p>
            Charts: Stack vertically (mobile/tablet) → 2-col grid (desktop)
          </p>
          <p>
            Transactions: Full width (mobile/tablet) → 3-col grid (desktop)
          </p>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
