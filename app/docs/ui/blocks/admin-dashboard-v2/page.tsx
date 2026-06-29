import { BlockPreview } from "@/app/docs/_components/block-preview"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { readSource } from "@/app/docs/_lib/read-source"
import AdminDashboardV2 from "@/ui/blocks/AdminDashboard/v2"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "features", title: "Features" },
  { id: "example", title: "Example" },
]

export default function AdminDashboardV2Page() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Admin Dashboard V2"
        description="Modern fintech dashboard with transaction history, daily limits, and activity feeds."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Admin Dashboard V2 is an alternative layout featuring a classic fintech dashboard design with a sidebar-based
          navigation pattern. Includes stat cards, earning charts, transaction history table, card widget, daily limit
          tracking, and real-time activity feeds.
        </p>
      </DocsSection>

      <DocsSection id="features" title="Features">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>• Stat cards with trend indicators (up/down arrows)</li>
          <li>• Interactive payment card widget with reveal toggle</li>
          <li>• Bar chart for income/expense visualization</li>
          <li>• Full transaction history table with status badges</li>
          <li>• Daily limit progress tracker</li>
          <li>• Recent activity feed with timestamps</li>
          <li>• Responsive 3-column grid layout</li>
          <li>• Full design token integration</li>
          <li>• Dark mode support</li>
          <li>• Accessible table navigation</li>
        </ul>
      </DocsSection>

      <DocsSection id="example" title="Example">
        <BlockPreview source={readSource("ui/blocks/AdminDashboard/v2.tsx")} title="Admin Dashboard V2">
          <AdminDashboardV2 />
        </BlockPreview>
      </DocsSection>

      <DocsSection id="layout" title="Layout Structure">
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            V2 uses a 3-column grid layout on desktop, collapsing to single column on mobile:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-4">
            <li>• Left/Center: Main charts and transaction table (2 cols)</li>
            <li>• Right: Sidebar with card widget, daily limit, activity feed</li>
            <li>• Mobile: Full-width stacking</li>
          </ul>
        </div>
      </DocsSection>

      <DocsSection id="components" title="Component Composition">
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">Built from primitives:</p>
          <ul className="space-y-2 text-muted-foreground ml-4">
            <li>
              <code className="bg-muted px-2 py-1 rounded">Card</code> — stat containers, chart wrapper, widgets
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">Button</code> — actions (Add Card, reveal toggle)
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">BarChart</code> (Recharts) — income/expense comparison
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">Table</code> (HTML) — transaction history
            </li>
          </ul>
        </div>
      </DocsSection>

      <DocsSection id="tokens" title="Design Tokens Used">
        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
          <li>• <code className="bg-muted px-1">--primary</code> — stat icons, bar chart, progress bar</li>
          <li>• <code className="bg-muted px-1">--secondary</code> — secondary bar in chart</li>
          <li>• <code className="bg-muted px-1">--accent</code> — up trend indicator</li>
          <li>• <code className="bg-muted px-1">--destructive</code> — down trend, failed status</li>
          <li>• <code className="bg-muted px-1">--card</code> — widget backgrounds</li>
          <li>• <code className="bg-muted px-1">--foreground</code> — text headings</li>
          <li>• <code className="bg-muted px-1">--muted-foreground</code> — secondary text</li>
          <li>• <code className="bg-muted px-1">--border</code> — dividers, table lines</li>
        </ul>
      </DocsSection>

      <DocsSection id="widgets" title="Key Widgets">
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Card Widget</h4>
            <p className="text-muted-foreground">
              Interactive payment card with balance, expiry, CVV reveal toggle. Uses gradient background from design tokens.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Daily Limit</h4>
            <p className="text-muted-foreground">
              Progress indicator showing spent amount vs limit. Visual bar with percentage.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Recent Activity</h4>
            <p className="text-muted-foreground">
              User avatars with initials, action descriptions, and timestamps. Real-time feed pattern.
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
