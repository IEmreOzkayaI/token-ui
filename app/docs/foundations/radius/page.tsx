"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Scale" },
  { id: "semantic", title: "Semantic" },
  { id: "component", title: "Component" },
  { id: "usage", title: "Usage" },
]

export default function RadiusPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Border Radius"
        description="Base 0.625rem (10px) scale. Semantic values: sharp, subtle, standard, soft, round, pill, circle."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI border radius uses a systematic scale from sharp edges to full circles for consistent corner rounding.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📍 <strong>Source:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/radius.ts</code></p>
          <p>📏 <strong>Base:</strong> 0.625rem (10px)</p>
          <p>🎯 <strong>Scales:</strong> sm → 4xl + full</p>
          <p>🔤 <strong>Semantic:</strong> sharp, subtle, standard, soft, round, pill, circle</p>
        </div>
      </DocsSection>

      <DocsSection id="scale" title="Scale">
        <p className="text-muted-foreground mb-6">
          Proportional border radius scale from minimal to full.
        </p>
        <FoundationViewer type="radius" />
      </DocsSection>

      <DocsSection id="semantic" title="Semantic Values">
        <p className="text-muted-foreground mb-6">
          Semantic radius names for common use cases.
        </p>
        <CodeBlock code={`import { semanticRadius } from "@/ui/foundations"

// Sharp: minimal rounding
semanticRadius.sharp       // 0px

// Subtle: barely noticeable
semanticRadius.subtle      // 4px

// Standard: common default
semanticRadius.standard    // 8px

// Soft: comfortable rounding
semanticRadius.soft        // 12px

// Round: fully rounded
semanticRadius.round       // 16px

// Pill: maximum horizontal
semanticRadius.pill        // 9999px (rounded button)

// Circle: fully circular
semanticRadius.circle      // 9999px (avatar)`} />
      </DocsSection>

      <DocsSection id="component" title="Component Radius">
        <p className="text-muted-foreground mb-6">
          Component-specific border radius defaults.
        </p>
        <CodeBlock code={`import { componentRadius } from "@/ui/foundations"

// Common components
componentRadius.button     // Standard button rounding
componentRadius.card       // Card container rounding
componentRadius.input      // Form input rounding
componentRadius.badge      // Badge pill shape
componentRadius.avatar     // Avatar circle
componentRadius.modal      // Modal dialog corners
componentRadius.dropdown   // Dropdown menu corners
componentRadius.tooltip    // Tooltip corners`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply border radius consistently across components.
        </p>
        <CodeBlock code={`import { borderRadius, semanticRadius, componentRadius } from "@/ui/foundations"

// Direct scale
<div style={{ borderRadius: borderRadius.md }}>Rounded box</div>

// Semantic
<button style={{ borderRadius: semanticRadius.pill }}>Pill button</button>
<img style={{ borderRadius: semanticRadius.circle }} />

// Component presets
<div style={{ borderRadius: componentRadius.card }}>Card</div>
<button style={{ borderRadius: componentRadius.button }}>Button</button>

// Tailwind
<div class="rounded-lg">Rounded</div>
<button class="rounded-full">Pill</button>
<img class="rounded-full" />`} />
      </DocsSection>
    </DocsPage>
  )
}
