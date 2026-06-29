import { BlockPreview } from "@/app/docs/_components/block-preview"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { readSource } from "@/app/docs/_lib/read-source"
import AdminDashboardV3 from "@/ui/blocks/AdminDashboard/v3"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "features", title: "Features" },
  { id: "example", title: "Example" },
]

export default function AdminDashboardV3Page() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Admin Dashboard V3"
        description="Enterprise-grade dashboard with top navigation, financial insights, and AI-powered recommendations."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Admin Dashboard V3 is a premium enterprise dashboard design featuring a persistent top navigation bar,
          personalized greeting, comprehensive financial metrics, dual-axis charts, AI finance insights with donut
          visualization, and searchable transaction history. Ideal for fintech platforms and financial management apps.
        </p>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>• Sticky top navigation bar with menu tabs and user profile</li>
          <li>• Personalized greeting with current date</li>
          <li>• 4-column stat cards with icons and growth indicators</li>
          <li>• Monthly cash flow line chart (dual-axis visualization)</li>
          <li>• Revenue inflow vs expense outflow bar chart</li>
          <li>• AI Finance Insight widget with donut balance chart</li>
          <li>• Searchable and filterable transaction history table</li>
          <li>• Payment card widget with balance display</li>
          <li>• Responsive 3-column grid layout</li>
          <li>• Full design token integration</li>
          <li>• Dark mode support</li>
        </ul>
      </DocsSection>

      <DocsSection id="example" title="Example">
        <BlockPreview source={readSource("ui/blocks/AdminDashboard/v3.tsx")} title="Admin Dashboard V3">
          <AdminDashboardV3 />
        </BlockPreview>
      </DocsSection>

      <DocsSection id="navigation" title="Top Navigation">
        <p className="text-muted-foreground text-sm">
          Sticky navigation bar includes: logo, menu tabs (Dashboard, Transactions, My Wallet, Invoices, Reports),
          notification bell, search, and user profile. Remains visible while scrolling for quick navigation.
        </p>
      </DocsSection>

      <DocsSection id="sections" title="Key Sections">
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Greeting & Export</h4>
            <p className="text-muted-foreground">
              Personalized greeting with current date. Export button for reports (color: primary token).
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Financial Metrics</h4>
            <p className="text-muted-foreground">
              4-stat cards: Total Revenue, Net Profit, Operating Expenses, Cash Projection. Each with trend arrows
              and growth indicators.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Charts</h4>
            <p className="text-muted-foreground">
              Monthly cash flow (line chart) and Revenue vs Expense (bar chart). Dual-axis visualization for
              comprehensive financial analysis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">AI Insights</h4>
            <p className="text-muted-foreground">
              Donut chart showing available balance breakdown. AI-powered recommendations for savings suggestions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Transactions</h4>
            <p className="text-muted-foreground">
              Searchable table with transaction icons, categories, dates, and amounts. Hover effects on rows.
            </p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="tokens" title="Design Tokens Used">
        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
          <li>• <code className="bg-muted px-1">--primary</code> — buttons, stat icons, line chart, progress</li>
          <li>• <code className="bg-muted px-1">--secondary</code> — secondary bar chart, donut segment</li>
          <li>• <code className="bg-muted px-1">--accent</code> — trend up indicators, earnings</li>
          <li>• <code className="bg-muted px-1">--card</code> — widget backgrounds, navigation</li>
          <li>• <code className="bg-muted px-1">--foreground</code> — text headings</li>
          <li>• <code className="bg-muted px-1">--muted-foreground</code> — secondary text</li>
          <li>• <code className="bg-muted px-1">--border</code> — dividers, lines</li>
          <li>• <code className="bg-muted px-1">--muted</code> — icon backgrounds</li>
          <li>• <code className="bg-muted px-1">--shadow-sm</code> — card shadows</li>
        </ul>
      </DocsSection>

      <DocsSection id="responsive" title="Responsive Behavior">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Stats: 4-col (desktop) → 2-col (tablet) → 1-col (mobile)</p>
          <p>Layout: 3-col (lg) → 1-col (mobile)</p>
          <p>Navigation: Full menu (desktop) → Collapsed (mobile)</p>
          <p>Charts: Responsive height with preserved data visualization</p>
        </div>
      </DocsSection>

      <DocsSection id="components" title="Component Composition">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>
            <code className="bg-muted px-1">Card</code> — all widget containers
          </li>
          <li>
            <code className="bg-muted px-1">Button</code> — actions (Export, Filter, reveal toggle)
          </li>
          <li>
            <code className="bg-muted px-1">LineChart</code> (Recharts) — cash flow visualization
          </li>
          <li>
            <code className="bg-muted px-1">BarChart</code> (Recharts) — revenue vs expense
          </li>
          <li>
            <code className="bg-muted px-1">PieChart</code> (Recharts) — balance donut chart
          </li>
          <li>
            <code className="bg-muted px-1">Table</code> (HTML) — transaction history
          </li>
        </ul>
      </DocsSection>
    </DocsPage>
  )
}
