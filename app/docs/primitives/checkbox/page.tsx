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
    { id: "basic", title: "Basic" },
    { id: "demo", title: "Demo" },
    { id: "description", title: "Description" },
    { id: "disabled", title: "Disabled" },
    { id: "group", title: "Group" },
    { id: "invalid", title: "Invalid" },
    { id: "table", title: "Table" },
]

export default function CheckboxPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Checkbox"
        description="Checkbox component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the checkbox primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add checkbox" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Checkbox component."
      >
        <CodeBlock
          code={`import { Checkbox } from "@/primitives/checkbox"`}
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
