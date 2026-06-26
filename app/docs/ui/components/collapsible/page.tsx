import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import CollapsibleDemo from "@/ui/components/collapsible-demo"
import CollapsibleFileTree from "@/ui/components/collapsible-file-tree"
import CollapsibleSettings from "@/ui/components/collapsible-settings"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: CollapsibleDemo,
    sourcePath: "ui/components/collapsible-demo.tsx",
  },
  {
    id: "file-tree",
    title: "File Tree",
    component: CollapsibleFileTree,
    sourcePath: "ui/components/collapsible-file-tree.tsx",
  },
  {
    id: "settings",
    title: "Settings",
    component: CollapsibleSettings,
    sourcePath: "ui/components/collapsible-settings.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "file-tree", title: "File Tree", depth: 3 },
  { id: "settings", title: "Settings", depth: 3 },
]

export default function CollapsiblePage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Collapsible"
        description="An interactive component which expands/collapses a panel."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add collapsible" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Collapsible } from "@/primitives/collapsible"`}
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
