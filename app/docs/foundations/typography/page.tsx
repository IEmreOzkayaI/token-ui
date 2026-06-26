import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import {
  DocsTable,
  DocsTableCell,
  DocsTableRow,
} from "@/app/docs/_components/docs-table"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { fontFamilies, typographyScale } from "@/app/docs/_lib/design-tokens"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "families", title: "Font Families" },
  { id: "scale", title: "Type Scale" },
  { id: "weights", title: "Font Weights" },
  { id: "headings", title: "Headings" },
  { id: "guidelines", title: "Guidelines" },
]

const weights = [
  { className: "font-normal", value: "400", sample: "Regular body text" },
  { className: "font-medium", value: "500", sample: "Labels, nav items, emphasis" },
  { className: "font-semibold", value: "600", sample: "Section headings, card titles" },
  { className: "font-bold", value: "700", sample: "Page titles, marketing headlines" },
]

export default function TypographyPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Typography"
        description="Inter for UI copy and Geist Mono for code. A restrained type scale keeps interfaces readable without visual noise."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Typography tokens are implemented as Tailwind utilities backed by CSS
          variables. Fonts load through <code>next/font</code> in{" "}
          <code>app/layout.tsx</code> to avoid layout shift and external CDN
          requests.
        </p>
      </DocsSection>

      <DocsSection id="families" title="Font Families">
        <div className="space-y-6">
          {fontFamilies.map((font) => (
            <div key={font.token} className="rounded-xl border p-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <code className="text-sm">{font.token}</code>
                <span className="text-sm text-muted-foreground">→</span>
                <code className="text-sm">{font.tailwind}</code>
              </div>
              <p
                className={`text-2xl ${font.tailwind}`}
              >
                {font.name} — {font.usage}
              </p>
              <p className={`mt-2 text-sm text-muted-foreground ${font.tailwind}`}>
                The quick brown fox jumps over the lazy dog. 0123456789
              </p>
            </div>
          ))}
        </div>
        <CodeBlock
          className="mt-4"
          code={`// app/layout.tsx
import { Inter, Geist_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })`}
        />
      </DocsSection>

      <DocsSection
        id="scale"
        title="Type Scale"
        description="Standard Tailwind text sizes used across the system."
      >
        <DocsTable headers={["Class", "Size", "Line Height", "Usage"]}>
          {typographyScale.map((row) => (
            <DocsTableRow key={row.className}>
              <DocsTableCell mono>{row.className}</DocsTableCell>
              <DocsTableCell mono>{row.size}</DocsTableCell>
              <DocsTableCell mono>{row.lineHeight}</DocsTableCell>
              <DocsTableCell className="text-muted-foreground">
                <span className={row.className}>{row.usage}</span>
              </DocsTableCell>
            </DocsTableRow>
          ))}
        </DocsTable>
      </DocsSection>

      <DocsSection id="weights" title="Font Weights">
        <div className="space-y-4">
          {weights.map((weight) => (
            <div
              key={weight.className}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border px-4 py-3"
            >
              <div className="flex items-baseline gap-3">
                <code className="text-xs">{weight.className}</code>
                <span className="text-xs text-muted-foreground">
                  {weight.value}
                </span>
              </div>
              <p className={weight.className}>{weight.sample}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="headings" title="Headings">
        <p className="text-muted-foreground">
          Documentation and marketing pages use a consistent heading hierarchy.
          Product UI should rarely exceed <code>text-2xl</code> inside screens.
        </p>
        <div className="space-y-4 rounded-xl border p-6">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Page title — text-4xl font-bold
          </h1>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Section heading — text-2xl font-semibold
          </h2>
          <h3 className="scroll-m-20 text-lg font-medium">
            Subsection — text-lg font-medium
          </h3>
          <p className="text-base text-muted-foreground">
            Body copy — text-base with muted-foreground for secondary content.
          </p>
        </div>
      </DocsSection>

      <DocsSection id="guidelines" title="Guidelines">
        <DocsCallout title="Do" variant="tip">
          Use <code>text-sm</code> for dense UI (tables, sidebars). Use{" "}
          <code>text-base</code> for primary reading content. Limit{" "}
          <code>font-bold</code> to one element per viewport to preserve
          hierarchy.
        </DocsCallout>
        <DocsCallout title="Don't" variant="warning">
          Avoid mixing more than two font families on a single screen. Do not
          use monospace for long paragraphs. Do not set font sizes with arbitrary
          pixel values outside the scale.
        </DocsCallout>
      </DocsSection>
    </DocsPage>
  )
}
