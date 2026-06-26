import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import RadioGroupChoiceCard from "@/ui/components/radio-group-choice-card"
import RadioGroupDemo from "@/ui/components/radio-group-demo"
import RadioGroupDescription from "@/ui/components/radio-group-description"
import RadioGroupDisabled from "@/ui/components/radio-group-disabled"
import RadioGroupFieldset from "@/ui/components/radio-group-fieldset"
import RadioGroupInvalid from "@/ui/components/radio-group-invalid"

const examples = [
  {
    id: "choice-card",
    title: "Choice Card",
    component: RadioGroupChoiceCard,
    sourcePath: "ui/components/radio-group-choice-card.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: RadioGroupDemo,
    sourcePath: "ui/components/radio-group-demo.tsx",
  },
  {
    id: "description",
    title: "Description",
    component: RadioGroupDescription,
    sourcePath: "ui/components/radio-group-description.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: RadioGroupDisabled,
    sourcePath: "ui/components/radio-group-disabled.tsx",
  },
  {
    id: "fieldset",
    title: "Fieldset",
    component: RadioGroupFieldset,
    sourcePath: "ui/components/radio-group-fieldset.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: RadioGroupInvalid,
    sourcePath: "ui/components/radio-group-invalid.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "choice-card", title: "Choice Card", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "description", title: "Description", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "fieldset", title: "Fieldset", depth: 3 },
  { id: "invalid", title: "Invalid", depth: 3 },
]

export default function RadioGroupPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="RadioGroup"
        description="A set of checkable buttons where only one can be checked at a time."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add radio-group" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { RadioGroup } from "@/primitives/radio-group"`}
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
