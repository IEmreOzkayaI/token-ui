import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CheckboxBasic from "@/ui/components/checkbox-basic"
import CheckboxDemo from "@/ui/components/checkbox-demo"
import CheckboxDescription from "@/ui/components/checkbox-description"
import CheckboxDisabled from "@/ui/components/checkbox-disabled"
import CheckboxGroup from "@/ui/components/checkbox-group"
import CheckboxInvalid from "@/ui/components/checkbox-invalid"
import CheckboxInTable from "@/ui/components/checkbox-table"

const examples = [
  {
    id: "basic",
    title: "Basic",
    component: CheckboxBasic,
    sourcePath: "ui/components/checkbox-basic.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: CheckboxDemo,
    sourcePath: "ui/components/checkbox-demo.tsx",
  },
  {
    id: "description",
    title: "Description",
    component: CheckboxDescription,
    sourcePath: "ui/components/checkbox-description.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: CheckboxDisabled,
    sourcePath: "ui/components/checkbox-disabled.tsx",
  },
  {
    id: "group",
    title: "Group",
    component: CheckboxGroup,
    sourcePath: "ui/components/checkbox-group.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: CheckboxInvalid,
    sourcePath: "ui/components/checkbox-invalid.tsx",
  },
  {
    id: "table",
    title: "Table",
    component: CheckboxInTable,
    sourcePath: "ui/components/checkbox-table.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "basic", title: "Basic", depth: 3 },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "description", title: "Description", depth: 3 },
  { id: "disabled", title: "Disabled", depth: 3 },
  { id: "group", title: "Group", depth: 3 },
  { id: "invalid", title: "Invalid", depth: 3 },
  { id: "table", title: "Table", depth: 3 },
]

export default function CheckboxPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Checkbox"
        description="A control that allows the user to toggle between checked and not checked."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add checkbox" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Checkbox } from "@/primitives/checkbox"`}
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
