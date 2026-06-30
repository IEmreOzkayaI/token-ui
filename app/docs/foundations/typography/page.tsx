"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { FoundationViewer } from "@/app/docs/_components/foundation-viewer"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Scale" },
  { id: "weights", title: "Weights" },
  { id: "presets", title: "Presets" },
  { id: "usage", title: "Usage" },
]

export default function TypographyPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Typography"
        description="10-step type scale. Font weights, line heights, letter spacing. Semantic presets for headings, body, labels."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI typography uses a systematic scale for consistent sizing and hierarchy across all text elements.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📍 <strong>Source:</strong> <code className="bg-muted px-2 py-1 rounded">ui/foundations/typography.ts</code></p>
          <p>📏 <strong>Scale:</strong> 10 steps (12px → 48px)</p>
          <p>⚖️ <strong>Weights:</strong> 6 weights (300 → 800)</p>
          <p>📐 <strong>Presets:</strong> h1-h4, body, label, caption, code</p>
        </div>
      </DocsSection>

      <DocsSection id="scale" title="Scale">
        <p className="text-muted-foreground mb-6">
          10-step font size scale from xs (12px) to 5xl (48px).
        </p>
        <FoundationViewer type="typography" />
      </DocsSection>

      <DocsSection id="weights" title="Weights">
        <p className="text-muted-foreground mb-6">
          6 font weights for different typographic emphasis.
        </p>
        <div className="space-y-4">
          {[
            { name: "Light", weight: 300 },
            { name: "Normal", weight: 400 },
            { name: "Medium", weight: 500 },
            { name: "Semibold", weight: 600 },
            { name: "Bold", weight: 700 },
            { name: "Extrabold", weight: 800 },
          ].map(w => (
            <div key={w.weight} style={{ fontWeight: w.weight }}>
              {w.name} - {w.weight}
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="presets" title="Presets">
        <p className="text-muted-foreground mb-6">
          Semantic preset combinations for common patterns.
        </p>
        <CodeBlock code={`import { typographyPresets } from "@/ui/foundations"

// Headings
typographyPresets.heading1 // 48px, bold
typographyPresets.heading2 // 32px, bold
typographyPresets.heading3 // 24px, semibold
typographyPresets.heading4 // 20px, semibold

// Body
typographyPresets.body      // 16px, normal
typographyPresets.label     // 14px, medium
typographyPresets.caption   // 12px, normal
typographyPresets.code      // 14px, mono`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply typography tokens to text elements.
        </p>
        <CodeBlock code={`import { fontSizes, fontWeights, typographyPresets } from "@/ui/foundations"

// Direct tokens
<h1 style={{
  fontSize: fontSizes["4xl"],
  fontWeight: fontWeights.bold,
}}>Title</h1>

// Presets
<h2 style={typographyPresets.heading2}>Subtitle</h2>
<p style={typographyPresets.body}>Content</p>

// Tailwind
<h1 class="text-4xl font-bold">Title</h1>
<p class="text-sm font-normal">Caption</p>`} />
      </DocsSection>
    </DocsPage>
  )
}
