import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import TableActions from "@/ui/components/table-actions"
import TableDemo from "@/ui/components/table-demo"
import TableFooterExample from "@/ui/components/table-footer"

const examples = [
  {
    id: "actions",
    title: "Actions",
    component: TableActions,
    sourcePath: "ui/components/table-actions.tsx",
  },
  {
    id: "demo",
    title: "Demo",
    component: TableDemo,
    sourcePath: "ui/components/table-demo.tsx",
  },
  {
    id: "footer",
    title: "Footer",
    component: TableFooterExample,
    sourcePath: "ui/components/table-footer.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "actions", title: "Actions" },
    { id: "demo", title: "Demo" },
    { id: "footer", title: "Footer" },
]

export default function TablePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Table"
        description="Table component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the table primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add table" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Table component."
      >
        <CodeBlock
          code={`import { Table } from "@/primitives/table"`}
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
