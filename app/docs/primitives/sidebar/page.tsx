import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import AppSidebar from "@/ui/components/sidebar-controlled"

const examples = [
  {
    id: "controlled",
    title: "Controlled",
    component: AppSidebar,
    sourcePath: "ui/components/sidebar-controlled.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
    { id: "controlled", title: "Controlled" },
]

export default function SidebarPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Sidebar"
        description="Sidebar component"
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the sidebar primitive to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add sidebar" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and use the Sidebar component."
      >
        <CodeBlock
          code={`import { Sidebar } from "@/primitives/sidebar"`}
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
