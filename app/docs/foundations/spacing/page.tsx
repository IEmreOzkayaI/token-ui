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
import { spacingScale } from "@/app/docs/_lib/design-tokens"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Scale" },
  { id: "patterns", title: "Common Patterns" },
  { id: "guidelines", title: "Guidelines" },
]

export default function SpacingPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Spacing"
        description="A 4px base grid creates predictable rhythm between elements. Spacing tokens map directly to Tailwind's default scale."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          Spacing is not defined as custom CSS variables in this system. Instead,
          we use Tailwind's spacing scale where each unit equals{" "}
          <code>0.25rem (4px)</code>. This keeps layouts aligned to a shared grid
          without maintaining a parallel token file.
        </p>
        <DocsCallout variant="tip">
          When reviewing designs, translate pixel values to the nearest scale
          step: 20px → <code>p-5</code> (20px), 24px → <code>p-6</code> (24px).
        </DocsCallout>
      </DocsSection>

      <DocsSection
        id="scale"
        title="Scale"
        description="Most frequently used spacing values in the component library."
      >
        <div className="space-y-3">
          {spacingScale.map((item) => (
            <div
              key={item.token}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <code className="w-16 shrink-0 text-sm">{item.className}</code>
              <div className="flex flex-1 items-center gap-3">
                <div
                  className="h-8 rounded bg-primary/20"
                  style={{ width: item.value }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.value}
                </span>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {item.usage}
              </span>
            </div>
          ))}
        </div>

        <DocsTable headers={["Token", "Class", "Value", "Usage"]} className="mt-6">
          {spacingScale.map((item) => (
            <DocsTableRow key={item.token}>
              <DocsTableCell mono>{item.token}</DocsTableCell>
              <DocsTableCell mono>{item.className}</DocsTableCell>
              <DocsTableCell mono>{item.value}</DocsTableCell>
              <DocsTableCell className="text-muted-foreground">
                {item.usage}
              </DocsTableCell>
            </DocsTableRow>
          ))}
        </DocsTable>
      </DocsSection>

      <DocsSection id="patterns" title="Common Patterns">
        <CodeBlock
          code={`// Card internal padding
<div className="p-6">...</div>

// Stack sections on a page
<div className="space-y-8">...</div>

// Form field gaps
<div className="space-y-4">
  <Label />
  <Input />
</div>

// Inline button groups
<div className="flex gap-2">...</div>

// Page margins
<main className="px-4 py-6 md:px-6 lg:px-8">...</main>`}
        />
      </DocsSection>

      <DocsSection id="guidelines" title="Guidelines">
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Use <code>space-y-*</code> for vertical stacks and{" "}
            <code>gap-*</code> for flex/grid — never margin on every child.
          </li>
          <li>
            Prefer <code>p-4</code> or <code>p-6</code> for card interiors;
            <code>p-8</code>+ for marketing sections only.
          </li>
          <li>
            Keep horizontal page padding consistent:{" "}
            <code>px-4 md:px-6 lg:px-8</code> matches the docs layout.
          </li>
          <li>
            When two elements feel "almost right", go up one step on the scale
            rather than using arbitrary values like <code>p-[18px]</code>.
          </li>
        </ul>
      </DocsSection>
    </DocsPage>
  )
}
