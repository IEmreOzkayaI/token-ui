import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SelectAlignItem from "@/ui/components/select-align-item"
import SelectDemo from "@/ui/components/select-demo"
import SelectDisabled from "@/ui/components/select-disabled"
import SelectGroups from "@/ui/components/select-groups"
import SelectInvalid from "@/ui/components/select-invalid"
import SelectScrollable from "@/ui/components/select-scrollable"

const examples = [
  {
    id: "align-item",
    title: "Align Item",
    component: SelectAlignItem,
    sourcePath: "ui/components/select-align-item.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: SelectDemo,
    sourcePath: "ui/components/select-demo.tsx",
  },
  {
    id: "disabled",
    title: "Disabled",
    component: SelectDisabled,
    sourcePath: "ui/components/select-disabled.tsx",
  },
  {
    id: "groups",
    title: "Groups",
    component: SelectGroups,
    sourcePath: "ui/components/select-groups.tsx",
  },
  {
    id: "invalid",
    title: "Invalid",
    component: SelectInvalid,
    sourcePath: "ui/components/select-invalid.tsx",
  },
  {
    id: "scrollable",
    title: "Scrollable",
    component: SelectScrollable,
    sourcePath: "ui/components/select-scrollable.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "align-item", title: "Align Item" },
    { id: "demo", title: "Demo" },
    { id: "disabled", title: "Disabled" },
    { id: "groups", title: "Groups" },
    { id: "invalid", title: "Invalid" },
    { id: "scrollable", title: "Scrollable" },
]

export default function SelectPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Select"
        description="Select component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the select primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add select" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Select component."
      >
        <CodeBlock
          code={`import { Select } from "@/primitives/select"`}
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
