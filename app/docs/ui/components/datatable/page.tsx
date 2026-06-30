import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import DataTableDefault from "@/ui/components/DataTable/Default"
import DataTablePaginated from "@/ui/components/DataTable/Paginated"
import DataTableCollapsible from "@/ui/components/DataTable/Collapsible"
import DataTableProduct from "@/ui/components/DataTable/Product"
import DataTableTerminals from "@/ui/components/DataTable/terminals"

const examples = [
  {
    id: "default",
    title: "Default",
    component: DataTableDefault,
    sourcePath: "ui/components/DataTable/Default.tsx",
  },
  {
    id: "paginated",
    title: "Paginated",
    component: DataTablePaginated,
    sourcePath: "ui/components/DataTable/Paginated.tsx",
  },
  {
    id: "collapsible",
    title: "Collapsible",
    component: DataTableCollapsible,
    sourcePath: "ui/components/DataTable/Collapsible.tsx",
  },
  {
    id: "product",
    title: "Product",
    component: DataTableProduct,
    sourcePath: "ui/components/DataTable/Product.tsx",
  },
  {
    id: "terminals",
    title: "Terminals",
    component: DataTableTerminals,
    sourcePath: "ui/components/DataTable/terminals.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  ...examples.map((ex) => ({ id: ex.id, title: ex.title, depth: 3 })),
]

export default function DataTablePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="DataTable"
        description="Searchable data table with expandable row actions."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest apply --preset b5dMmWj8V" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import DataTableDefault from "@/ui/components/DataTable/Default"\nimport DataTablePaginated from "@/ui/components/DataTable/Paginated"\nimport DataTableCollapsible from "@/ui/components/DataTable/Collapsible"\nimport DataTableProduct from "@/ui/components/DataTable/Product"\nimport DataTableTerminals from "@/ui/components/DataTable/terminals"`}
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
