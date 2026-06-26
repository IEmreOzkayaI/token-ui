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
    { id: "choice-card", title: "Choice Card" },
    { id: "demo", title: "Demo" },
    { id: "description", title: "Description" },
    { id: "disabled", title: "Disabled" },
    { id: "fieldset", title: "Fieldset" },
    { id: "invalid", title: "Invalid" },
]

export default function RadioGroupPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="RadioGroup"
        description="RadioGroup component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the radio-group primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add radio-group" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the RadioGroup component."
      >
        <CodeBlock
          code={`import { RadioGroup } from "@/primitives/radio-group"`}
        />
      </DocsSection>

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
    </DocsPage>
  )
}
