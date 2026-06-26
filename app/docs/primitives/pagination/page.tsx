import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import PaginationDemo from "@/ui/components/pagination-demo"
import PaginationIconsOnly from "@/ui/components/pagination-icons-only"
import PaginationSimple from "@/ui/components/pagination-simple"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: PaginationDemo,
    sourcePath: "ui/components/pagination-demo.tsx",
  },
  {
    id: "icons-only",
    title: "Icons Only",
    component: PaginationIconsOnly,
    sourcePath: "ui/components/pagination-icons-only.tsx",
  },
  {
    id: "simple",
    title: "Simple",
    component: PaginationSimple,
    sourcePath: "ui/components/pagination-simple.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "demo", title: "Demo" },
    { id: "icons-only", title: "Icons Only" },
    { id: "simple", title: "Simple" },
]

export default function PaginationPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Pagination"
        description="Pagination component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the pagination primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add pagination" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Pagination component."
      >
        <CodeBlock
          code={`import { Pagination } from "@/primitives/pagination"`}
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
