import { ComponentExample } from "@/app/docs/_components/component-example"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { readSource } from "@/app/docs/_lib/read-source"
import SeparatorDemo from "@/ui/components/separator/demo"
import SeparatorList from "@/ui/components/separator/list"
import SeparatorMenu from "@/ui/components/separator/menu"
import SeparatorVertical from "@/ui/components/separator/vertical"

const examples = [
  {
    id: "demo",
    title: "Demo",
    component: SeparatorDemo,
    sourcePath: "ui/components/separator/demo.tsx",
  },
  {
    id: "list",
    title: "List",
    component: SeparatorList,
    sourcePath: "ui/components/separator/list.tsx",
  },
  {
    id: "menu",
    title: "Menu",
    component: SeparatorMenu,
    sourcePath: "ui/components/separator/menu.tsx",
  },
  {
    id: "vertical",
    title: "Vertical",
    component: SeparatorVertical,
    sourcePath: "ui/components/separator/vertical.tsx",
  },
] as const

const toc = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "demo", title: "Demo", depth: 3 },
  { id: "list", title: "List", depth: 3 },
  { id: "menu", title: "Menu", depth: 3 },
  { id: "vertical", title: "Vertical", depth: 3 },
]

export default function SeparatorPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Separator"
        description="Visually or semantically separates content."
      />

      <DocsSection
        id="installation"
        title="Installation"
        description="Add the component to your project."
      >
        <CodeBlock code="pnpm dlx shadcn@latest add separator" />
      </DocsSection>

      <DocsSection
        id="usage"
        title="Usage"
        description="Import and compose the component."
      >
        <CodeBlock
          code={`import { Separator } from "@/primitives/separator"`}
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
