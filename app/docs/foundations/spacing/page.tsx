"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Scale" },
  { id: "patterns", title: "Patterns" },
  { id: "component", title: "Component" },
  { id: "usage", title: "Usage" },
]

export default function SpacingPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Spacing"
        description="4px base unit scale. Patterns: compact, normal, relaxed, loose. Component-specific presets."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI spacing uses a 4px base unit scale ensuring predictable, proportional spacing across all components.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📍 <strong>Source:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/spacing.ts</code></p>
          <p>📏 <strong>Base Unit:</strong> 4px (0.25rem)</p>
          <p>📊 <strong>Scale:</strong> 0 → 96 (0 → 384px)</p>
          <p>🎯 <strong>Patterns:</strong> compact, normal, relaxed, loose</p>
        </div>
      </DocsSection>

      <DocsSection id="scale" title="Scale">
        <p className="text-muted-foreground mb-6">
          Proportional spacing scale from 0 to 96 (384px).
        </p>
        <FoundationViewer type="spacing" />
      </DocsSection>

      <DocsSection id="patterns" title="Patterns">
        <p className="text-muted-foreground mb-6">
          Spacing patterns for different layout densities.
        </p>
        <CodeBlock code={`import { spacingPatterns } from "@/ui/foundations"

// Compact: tight spacing (8px gap)
spacingPatterns.compact.gap      // 8px
spacingPatterns.compact.padding  // 8px

// Normal: standard spacing (16px gap)
spacingPatterns.normal.gap       // 16px
spacingPatterns.normal.padding   // 16px

// Relaxed: comfortable spacing (24px gap)
spacingPatterns.relaxed.gap      // 24px
spacingPatterns.relaxed.padding  // 24px

// Loose: spacious spacing (32px gap)
spacingPatterns.loose.gap        // 32px
spacingPatterns.loose.padding    // 32px`} />
      </DocsSection>

      <DocsSection id="component" title="Component Presets">
        <p className="text-muted-foreground mb-6">
          Component-specific spacing presets for consistency.
        </p>
        <CodeBlock code={`import { componentSpacing } from "@/ui/foundations"

// Button padding
componentSpacing.button.padding   // 8px 16px

// Card padding
componentSpacing.card.padding     // 24px

// Form input padding
componentSpacing.form.padding     // 12px

// List item spacing
componentSpacing.list.gap         // 12px
componentSpacing.list.padding     // 16px`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply spacing tokens consistently across layouts.
        </p>
        <CodeBlock code={`import { spacing, spacingPatterns, componentSpacing } from "@/ui/foundations"

// Direct scale
<div style={{
  padding: spacing[4],   // 16px
  gap: spacing[3],       // 12px
  margin: spacing[2],    // 8px
}}>Content</div>

// Patterns
<div style={spacingPatterns.normal}>Normal density layout</div>

// Component presets
<button style={{
  padding: componentSpacing.button.padding
}}>Click</button>

// Tailwind
<div class="p-4 gap-3 mb-2">Spaced content</div>`} />
      </DocsSection>
    </DocsPage>
  )
}
