import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import TextareaButton from "@/ui/components/textarea-button"
import TextareaDemo from "@/ui/components/textarea-demo"
import TextareaDisabled from "@/ui/components/textarea-disabled"
import TextareaField from "@/ui/components/textarea-field"
import TextareaInvalid from "@/ui/components/textarea-invalid"

const examples = [
  {
    id: "button",
    title: "Button",
    component: TextareaButton,
    sourcePath: "ui/components/textarea-button.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: TextareaDemo,
    sourcePath: "ui/components/textarea-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: TextareaDisabled,
    sourcePath: "ui/components/textarea-disabled.tsx",
  },
  {
    id: "field",
    title: "Field",
    component: TextareaField,
    sourcePath: "ui/components/textarea-field.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: TextareaInvalid,
    sourcePath: "ui/components/textarea-invalid.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "button", title: "Button" },
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "field", title: "Field" },
    { id: "invalid", title: "Invalid" },
]

export default function TextareaPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Textarea"
        description="Textarea component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the textarea primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add textarea" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Textarea component."
      >
        <CodeBlock
          code={`import { Textarea } from "@/primitives/textarea"`}
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
