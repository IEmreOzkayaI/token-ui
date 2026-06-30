import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "structure", title: "Structure" },
  { id: "colors", title: "Colors", depth: 2 },
  { id: "typography", title: "Typography", depth: 2 },
  { id: "spacing", title: "Spacing", depth: 2 },
  { id: "shadows", title: "Shadows", depth: 2 },
  { id: "radius", title: "Border Radius", depth: 2 },
  { id: "icons", title: "Icons", depth: 2 },
  { id: "usage", title: "Usage" },
]

export default function FoundationsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Design System Foundations"
        description="Core design tokens that power Token UI. Colors, typography, spacing, shadows, radius, and icons."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI foundations are centralized design tokens defined in TypeScript. They ensure consistency across all components and docs while making global design changes simple.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            📍 <strong>Location:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/</code>
          </p>
          <p>
            ✨ <strong>Features:</strong> Type-safe tokens, dark mode support, semantic naming, component presets
          </p>
          <p>
            🔗 <strong>Reference:</strong> All docs and components import from foundations for consistency
          </p>
        </div>
      </DocsSection>

      <DocsSection id="structure" title="Structure">
        <p className="text-muted-foreground mb-4">
          Foundations are organized into 6 core modules:
        </p>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">1. Colors</h4>
            <p className="text-sm text-muted-foreground mb-2">
              OKLch color space for perceptual uniformity. Semantic roles (primary, secondary, accent, destructive).
            </p>
            <code className="text-xs">ui/foundations/colors.ts</code>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">2. Typography</h4>
            <p className="text-sm text-muted-foreground mb-2">
              10-step type scale (12px-48px). Font weights, line heights, letter spacing. Preset combinations.
            </p>
            <code className="text-xs">ui/foundations/typography.ts</code>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">3. Spacing</h4>
            <p className="text-sm text-muted-foreground mb-2">
              4px base unit scale. Patterns: compact, normal, relaxed, loose. Component-specific presets.
            </p>
            <code className="text-xs">ui/foundations/spacing.ts</code>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">4. Shadows</h4>
            <p className="text-sm text-muted-foreground mb-2">
              7 elevation levels. Component-specific shadows. Focus rings and inner shadows.
            </p>
            <code className="text-xs">ui/foundations/shadows.ts</code>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">5. Border Radius</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Base 0.625rem (10px). Semantic values: sharp, subtle, standard, soft, round, pill, circle.
            </p>
            <code className="text-xs">ui/foundations/radius.ts</code>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">6. Icons</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Lucide React library. 8 categories. Size presets. Color mappings. Icon pairs.
            </p>
            <code className="text-xs">ui/foundations/icons.ts</code>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="colors" title="Colors" depth={2}>
        <p className="text-muted-foreground mb-6">
          OKLch color space for perceptual uniformity. Light and dark mode support.
        </p>
        <FoundationViewer type="colors" />
      </DocsSection>

      <DocsSection id="typography" title="Typography" depth={2}>
        <p className="text-muted-foreground mb-6">
          10-step type scale with semantic presets for headings, body, labels, and code.
        </p>
        <FoundationViewer type="typography" />
      </DocsSection>

      <DocsSection id="spacing" title="Spacing" depth={2}>
        <p className="text-muted-foreground mb-6">
          4px base unit scale. Use for margins, paddings, and gaps consistently.
        </p>
        <FoundationViewer type="spacing" />
      </DocsSection>

      <DocsSection id="shadows" title="Shadows" depth={2}>
        <p className="text-muted-foreground mb-6">
          7 elevation levels for creating depth and hierarchy in UI.
        </p>
        <FoundationViewer type="shadows" />
      </DocsSection>

      <DocsSection id="radius" title="Border Radius" depth={2}>
        <p className="text-muted-foreground mb-6">
          Corner rounding scale from sharp (0) to full circles (9999px).
        </p>
        <FoundationViewer type="radius" />
      </DocsSection>

      <DocsSection id="icons" title="Icons" depth={2}>
        <p className="text-muted-foreground mb-6">
          Lucide React icons organized by category. Consistent sizing and coloring.
        </p>
        <FoundationViewer type="icons" />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Import foundation tokens directly in your components for consistency.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Import from Foundations</h4>
            <CodeBlock
              code={`import {
  colorTokens,
  typography,
  spacing,
  shadows,
  borderRadius,
  iconCategories,
} from "@/ui/foundations"`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Use in Components</h4>
            <CodeBlock
              code={`export function MyComponent() {
  return (
    <button
      style={{
        padding: spacing[4],           // 16px
        borderRadius: borderRadius.md, // Standard
        boxShadow: shadows.sm,         // Subtle elevation
        color: colorTokens.primary.light,
        backgroundColor: colorTokens.primary.light,
      }}
    >
      Click me
    </button>
  )
}`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">CSS Variables in Tailwind</h4>
            <CodeBlock
              code={`<!-- Tokens are also available as CSS variables -->
<div class="bg-primary text-primary-foreground shadow-md rounded-lg p-4">
  Styled with design tokens
</div>`}
            />
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Why Centralized Foundations?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Consistency:</strong> Single source of truth for all design tokens</li>
              <li><strong>Maintainability:</strong> Update theme globally without touching components</li>
              <li><strong>Type Safety:</strong> TypeScript ensures correct token usage</li>
              <li><strong>Documentation:</strong> Auto-generated docs from foundation definitions</li>
              <li><strong>Scalability:</strong> Easy to add new tokens or variants</li>
            </ul>
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
