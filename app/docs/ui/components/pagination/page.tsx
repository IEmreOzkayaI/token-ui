import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import PaginationDemo from "@/ui/components/pagination/demo"
import PaginationIconsOnly from "@/ui/components/pagination/icons-only"
import PaginationSimple from "@/ui/components/pagination/simple"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: PaginationDemo,
    sourcePath: "ui/components/pagination/demo.tsx",
  },
  {
    id: "icons-only",
    title: "Icons Only",
    component: PaginationIconsOnly,
    sourcePath: "ui/components/pagination/icons-only.tsx",
  },
  {
    id: "simple",
    title: "Simple",
    component: PaginationSimple,
    sourcePath: "ui/components/pagination/simple.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "icons-only", title: "Icons Only", depth: 3 },
  { id: "simple", title: "Simple", depth: 3 },
]

export default function PaginationPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Pagination"
        description="Navigation component for moving between pages of content."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add pagination" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Pagination } from "@/primitives/pagination"`}
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
