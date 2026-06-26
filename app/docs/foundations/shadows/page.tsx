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
import { shadowScale } from "@/app/docs/_lib/design-tokens"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Elevation Scale" },
  { id: "layers", title: "Z-Index Layers" },
  { id: "guidelines", title: "Guidelines" },
]

export default function ShadowsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Shadows"
        description="Elevation communicates depth and interaction affordance. Use shadows sparingly — overuse reduces their ability to guide attention."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Shadows use Tailwind's default elevation utilities. In dark mode,
          prefer border and background contrast over heavy shadows — dark
          surfaces absorb shadow and lose the depth cue.
        </p>
        <DocsCallout variant="tip">
          Pair <code>shadow-sm</code> with <code>border</code> on cards for
          definition in both light and dark themes.
        </DocsCallout>
      </DocsSection>

      <DocsSection
        id="scale"
        title="Elevation Scale"
        description="Interactive preview of each shadow level."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {shadowScale.map((item) => (
            <div
              key={item.className}
              className={`rounded-xl border bg-card p-6 ${item.className}`}
            >
              <code className="text-sm">{item.className}</code>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.usage}
              </p>
            </div>
          ))}
        </div>

        <DocsTable headers={["Class", "Usage"]} className="mt-6">
          {shadowScale.map((item) => (
            <DocsTableRow key={item.className}>
              <DocsTableCell mono>{item.className}</DocsTableCell>
              <DocsTableCell className="text-muted-foreground">
                {item.usage}
              </DocsTableCell>
            </DocsTableRow>
          ))}
        </DocsTable>
      </DocsSection>

      <DocsSection id="layers" title="Z-Index Layers">
        <p className="text-muted-foreground">
          Floating UI uses consistent stacking. Primitives set{" "}
          <code>z-50</code> on overlays — do not introduce arbitrary z-index
          values without checking for conflicts.
        </p>
        <DocsTable headers={["Layer", "z-index", "Examples"]}>
          <DocsTableRow>
            <DocsTableCell>Base content</DocsTableCell>
            <DocsTableCell mono>z-0</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Page body, cards at rest
            </DocsTableCell>
          </DocsTableRow>
          <DocsTableRow>
            <DocsTableCell>Sticky chrome</DocsTableCell>
            <DocsTableCell mono>z-40 – z-50</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Docs header, mobile sidebar
            </DocsTableCell>
          </DocsTableRow>
          <DocsTableRow>
            <DocsTableCell>Overlays</DocsTableCell>
            <DocsTableCell mono>z-50</DocsTableCell>
            <DocsTableCell className="text-muted-foreground">
              Dialog, popover, dropdown, tooltip
            </DocsTableCell>
          </DocsTableRow>
        </DocsTable>
        <CodeBlock
          className="mt-4"
          code={`// Typical overlay primitive
className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"

// Dropdown content
className="z-50 rounded-xl border bg-popover shadow-lg"`}
        />
      </DocsSection>

      <DocsSection id="guidelines" title="Guidelines">
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Cards at rest: <code>shadow-sm</code> or border only. Escalate to{" "}
            <code>shadow-md</code> on hover if the card is interactive.
          </li>
          <li>
            Modals and dialogs: <code>shadow-xl</code> with backdrop blur.
          </li>
          <li>
            Never shadow text or inline elements — elevation is for surfaces.
          </li>
          <li>
            In dark mode, lean on <code>ring-1 ring-foreground/5</code> (used in
            popovers) instead of deep shadows.
          </li>
        </ul>
      </DocsSection>
    </DocsPage>
  )
}
