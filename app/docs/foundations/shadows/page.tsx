"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "elevations", title: "Elevations" },
  { id: "component", title: "Component" },
  { id: "usage", title: "Usage" },
]

export default function ShadowsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Shadows"
        description="7 elevation levels for creating depth and hierarchy. Component-specific shadows and focus rings."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI shadows create visual depth and hierarchy through elevation levels. Use shadows meaningfully to guide user attention.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📍 <strong>Source:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/shadows.ts</code></p>
          <p>📊 <strong>Levels:</strong> 7 elevations (sm → 2xl)</p>
          <p>🎯 <strong>Component Shadows:</strong> card, button, input, dropdown, modal, navbar</p>
          <p>⭐ <strong>Focus Rings:</strong> Accessibility focus states</p>
        </div>
      </DocsSection>

      <DocsSection id="elevations" title="Elevations">
        <p className="text-muted-foreground mb-6">
          7 shadow elevation levels for different component states.
        </p>
        <FoundationViewer type="shadows" />
      </DocsSection>

      <DocsSection id="component" title="Component Shadows">
        <p className="text-muted-foreground mb-6">
          Preset shadows for common component types.
        </p>
        <CodeBlock code={`import { componentShadows } from "@/ui/foundations"

// Card shadows
componentShadows.card.default    // Subtle elevation
componentShadows.card.hover      // Elevated on hover

// Button shadows
componentShadows.button.default  // Minimal shadow
componentShadows.button.pressed  // Pressed state

// Input shadows
componentShadows.input.default   // Form field
componentShadows.input.focus     // Focus ring

// Dropdown shadows
componentShadows.dropdown.default // Floating menu

// Modal shadows
componentShadows.modal.default   // Overlay modal`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply shadows for depth and interactive feedback.
        </p>
        <CodeBlock code={`import { shadows, componentShadows } from "@/ui/foundations"

// Elevation levels
<div style={{ boxShadow: shadows.sm }}>Subtle</div>
<div style={{ boxShadow: shadows.md }}>Standard</div>
<div style={{ boxShadow: shadows.lg }}>Elevated</div>

// Interactive states
const [isHovered, setIsHovered] = useState(false)
<div style={{
  boxShadow: isHovered ? shadows.lg : shadows.sm,
  transition: 'box-shadow 200ms'
}}>Hover shadow</div>

// Component presets
<div style={{ boxShadow: componentShadows.card.default }}>Card</div>

// Tailwind
<div class="shadow-sm">Subtle</div>
<div class="shadow-lg">Elevated</div>
<div class="focus-ring">Focus state</div>`} />
      </DocsSection>
    </DocsPage>
  )
}
