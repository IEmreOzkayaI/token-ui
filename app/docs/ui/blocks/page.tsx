import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "what-are-blocks", title: "What are Blocks?" },
  { id: "available", title: "Available Blocks" },
]

export default function BlocksPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Blocks"
        description="Complete screen compositions built with design tokens and reusable primitives."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Blocks are pre-built screen layouts that combine multiple components and design
          tokens into cohesive, production-ready interfaces. Each block demonstrates best
          practices for composition, accessibility, and responsive design.
        </p>
      </DocsSection>

      <DocsSection id="what-are-blocks" title="What are Blocks?">
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            While components are individual, reusable UI elements (Button, Card, Input), blocks
            are complete screens or sections composed of multiple components working together.
          </p>

          <div className="bg-muted/30 border rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-2">Block Characteristics</h4>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>• Built from primitives and components</li>
              <li>• Full integration with design system tokens</li>
              <li>• Complete responsive behavior</li>
              <li>• Production-ready styling and layout</li>
              <li>• Demonstrates composition patterns</li>
              <li>• Include mock data and realistic interactions</li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="available" title="Available Blocks">
        <div className="space-y-6 text-sm">
          <div className="border rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
            <a
              href="/docs/ui/blocks/admin-dashboard"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Admin Dashboard
            </a>
            <p className="text-muted-foreground mt-2">
              Comprehensive dashboard with stats overview, dual line charts for sales/activity
              tracking, and transaction cards with step progress indicators. Ideal for fintech
              and SaaS admin panels.
            </p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="philosophy" title="Design Philosophy">
        <ul className="space-y-2 text-sm text-muted-foreground ml-4">
          <li>
            • <strong>Token-First:</strong> All styling derives from design tokens, enabling
            centralized theme management
          </li>
          <li>
            • <strong>Composable:</strong> Blocks are built from primitives, not monolithic
            components
          </li>
          <li>
            • <strong>Accessible:</strong> Full ARIA support, keyboard navigation, and contrast
            compliance
          </li>
          <li>
            • <strong>Responsive:</strong> Graceful adaptation across mobile, tablet, and desktop
          </li>
          <li>
            • <strong>Reference:</strong> Serve as patterns for building similar screens
          </li>
        </ul>
      </DocsSection>
    </DocsPage>
  )
}
