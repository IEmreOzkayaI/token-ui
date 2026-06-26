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

const accordionExamples = [
  {
    id: "basic",
    title: "Basic",
    description:
      "A simple accordion that only shows one item at a time. The first item is open by default.",
    component: AccordionBasic,
    sourcePath: "ui/components/accordion-basic.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    description:
      "A single collapsible accordion with shipping, returns, and support FAQ items.",
    component: AccordionDemo,
    sourcePath: "ui/components/accordion-demo.tsx",
  },
  {
    id: "card",
    title: "Card",
    description:
      "An accordion nested inside a card for subscription and billing questions.",
    component: AccordionCard,
    sourcePath: "ui/components/accordion-card.tsx",
  },
  {
    id: "borders",
    title: "Borders",
    description:
      "An accordion wrapped in a rounded border with padded items.",
    component: AccordionBorders,
    sourcePath: "ui/components/accordion-borders.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    description: (
      <>
        Use the <code>disabled</code> prop on <code>AccordionItem</code> to
        disable individual items.
      </>
    ),
    component: AccordionDisabled,
    sourcePath: "ui/components/accordion-disabled.tsx",
  },
  {
    id: "multiple",
    title: "Multiple",
    description:
      "Set type to multiple to allow more than one item to be open at the same time.",
    component: AccordionMultiple,
    sourcePath: "ui/components/accordion-multiple.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  ...accordionExamples.map((example) => ({
    id: example.id,
    title: example.title,
  })),
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
        description="Add the accordion primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add accordion" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import the accordion parts and compose them together."
      >
        <CodeBlock
          code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/primitives/accordion"`}
        />
      </DocsSection>

      <div className="space-y-10">
        {accordionExamples.map((example) => {
          const Component = example.component

          return (
            <DocsSection
              key={example.id}
              id={example.id}
              title={example.title}
            >
              <ComponentExample
                description={example.description}
                source={readSource(example.sourcePath)}
              >
                <Component />
              </ComponentExample>
            </DocsSection>
          )
        })}
      </div>
    </DocsPage>
  )
}
