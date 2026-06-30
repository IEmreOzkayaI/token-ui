"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "palette", title: "Palette" },
  { id: "semantic", title: "Semantic" },
  { id: "intent", title: "Intent" },
  { id: "usage", title: "Usage" },
]

export default function ColorsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Colors"
        description="OKLch perceptually uniform color tokens. Light/dark mode support, semantic roles, intent mappings."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI colors use OKLch color space for perceptual uniformity. All colors have light and dark variants for automatic dark mode support.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📍 <strong>Source:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/colors.ts</code></p>
          <p>🎨 <strong>Format:</strong> OKLch (Lightness, Chroma, Hue)</p>
          <p>🌓 <strong>Variants:</strong> Light + Dark modes auto-synced</p>
          <p>🔗 <strong>Integration:</strong> CSS variables, Tailwind, TypeScript</p>
        </div>
      </DocsSection>

      <DocsSection id="palette" title="Palette">
        <p className="text-muted-foreground mb-6">
          Core semantic color roles used across all components.
        </p>
        <FoundationViewer type="colors" />
      </DocsSection>

      <DocsSection id="semantic" title="Semantic">
        <p className="text-muted-foreground mb-6">
          Purpose-specific colors for states and contexts.
        </p>
        <CodeBlock code={`import { semanticColors } from "@/ui/foundations"

// Success, warning, error, info
const color = semanticColors.success // oklch(0.650 0.200 142.5)`} />
      </DocsSection>

      <DocsSection id="intent" title="Intent">
        <p className="text-muted-foreground mb-6">
          Color intent mappings to semantic roles.
        </p>
        <CodeBlock code={`// Positive intent → success color
// Negative intent → destructive color
// Neutral intent → muted color
// Info intent → ring color`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Import and use color tokens in components.
        </p>
        <CodeBlock code={`import { colorTokens } from "@/ui/foundations"

// TypeScript
style={{
  color: colorTokens.foreground.light,
  backgroundColor: colorTokens.card.light,
  borderColor: colorTokens.border.light,
}}

// CSS Variables (auto dark mode)
style={{
  color: "var(--foreground)",
  backgroundColor: "var(--card)",
}}

// Tailwind
<div class="bg-primary text-primary-foreground">Primary</div>`} />
      </DocsSection>
    </DocsPage>
  )
}
