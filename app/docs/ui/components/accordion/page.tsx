import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AccordionBasic from "@/ui/components/accordion-basic"
import AccordionBorders from "@/ui/components/accordion-borders"
import AccordionCard from "@/ui/components/accordion-card"
import AccordionDemo from "@/ui/components/accordion-demo"
import AccordionDisabled from "@/ui/components/accordion-disabled"
import AccordionMultiple from "@/ui/components/accordion-multiple"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: AccordionBasic,
    sourcePath: "ui/components/accordion-basic.tsx",
  },
  {
    id: "borders",
    title: "Borders",
    component: AccordionBorders,
    sourcePath: "ui/components/accordion-borders.tsx",
  },
  {
    id: "card",
    title: "Card",
    component: AccordionCard,
    sourcePath: "ui/components/accordion-card.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: AccordionDemo,
    sourcePath: "ui/components/accordion-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: AccordionDisabled,
    sourcePath: "ui/components/accordion-disabled.tsx",
  },
  {
    id: "multiple",
    title: "Multiple",
    component: AccordionMultiple,
    sourcePath: "ui/components/accordion-multiple.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "borders", title: "Borders", depth: 3 },
  { id: "card", title: "Card", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "multiple", title: "Multiple", depth: 3 },
]

export default function AccordionPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add accordion" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Accordion } from "@/primitives/accordion"`}
        />
      </DocsSection>

      <DocsSection id="examples" title="Examples">
        <div className="space-y-10">
          {examples.map((example) => {
            const Component = example.component

            return (
              <DocsSection
                key={example.id}
                id={example.id}
                title={example.title}
              >
                <ComponentExample
                  source={readSource(example.sourcePath)}
                >
                  <Component />
                </ComponentExample>
              </DocsSection>
            )
          })}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
